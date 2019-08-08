/*
 * @Description: 入口
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-06-18 14:28:05
 */
const vscode = require('vscode');
const util = require('./util');
const logic = require('./logic');
const fs = require('fs');
const languageOutput = require('./languageOutput');

// 扩展激活 默认运行
function activate(context) {
  const fileheaderFn = () => {
    const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
    const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
    editor.edit(editBuilder => {
      try {
        let time = new Date().format(config);
        // 文件创建时间
        if (config.configObj.createFileTime) {
          // 获取当前激活文件的路径
          const filepath =
            vscode.window.activeTextEditor._documentData._document.fileName;
          time = new Date(fs.statSync(filepath).birthtime).format(config);
        }
        // 返回生成模板的数据对象
        let data = logic.userSet(config, time);
        data = logic.changePrototypeNameFn(data, config)
        const [lineNum, beforeAnnotation, afterAnnotation] = logic.editLineFn(
          editor._documentData._uri.fsPath,
          config
        );
        // 文件后缀
        let fileEnd = editor._documentData._languageId; // 语言
        fileEnd = util.fileEndMatch(fileEnd); // 提取文件后缀 或者语言类型
        // 生成
        let tpl = languageOutput.headNotes(data, fileEnd, config);
        // 预处理的参数
        let beforehand = {
          tpl,
          beforeAnnotation,
          afterAnnotation,
        }
        tpl = logic.handleTplFn(beforehand, config)
        editBuilder.insert(new vscode.Position(lineNum, 0), tpl); // 插入
        setTimeout(() => {
          editor.document.save()
          logic.moveCursor(tpl)
        }, 200)
      } catch (err) {
        console.log('头部注释错误:', err);
      }
    });
  };
  // 函数注释
  const cursorTipFn = () => {
    try {
      const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
      const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
      let fileEnd = editor._documentData._languageId; // 语言
      fileEnd = util.fileEndMatch(fileEnd);
      const [lineSpace, frontStr, line, nextLine] = logic.lineSpaceFn(editor);
      editor.edit(editBuilder => {
        let [data, fontTpl] = [{}, ''];
        let userSet = Object.keys(config.cursorMode);
        if (userSet.length === 0) {
          data = {
            description: '',
            param: '',
            return: ''
          };
        } else {
          // 如果用户设置了模板，那将默认根据用户设置模板
          data = Object.assign({}, config.cursorMode); // 复制对象，否则对象不能更改值
        }
        // 函数注释生成时间
        if (data.Date !== undefined) {
          delete data.Date;
          let DateName = config.configObj.specialOptions.Date;
          DateName = DateName ? DateName : `Date`;
          data[DateName] = new Date().format();
        }
        fontTpl = new languageOutput.functionTplStr(
          data,
          fileEnd,
          lineSpace,
          nextLine,
          frontStr
        ).generate(); // 函数注释的模板字符串
        // let tpl = new util.fontTemplate(fontTpl).render(data); // 生成模板
        editBuilder.insert(new vscode.Position(line, lineSpace), fontTpl); // 插入
      });
    } catch (err) {
      console.log('函数注释错误信息：', err);
    }
  };

  const fileheader = vscode.commands.registerCommand(
    'extension.fileheader',
    fileheaderFn
  );
  const cursorTip = vscode.commands.registerCommand(
    'extension.cursorTip',
    cursorTipFn
  );
  // 当插件关闭时被清理的可清理列表
  context.subscriptions.push(fileheader);
  context.subscriptions.push(cursorTip);

  let intervalVal = null; // 保存上次触发时间，用于节流
  let fileName = ''; // 保存操作的文件
  // 文件保存时 触发
  vscode.workspace.onDidSaveTextDocument(file => {
    try {
      if (file.fileName === fileName) {
        // 同一个文件操作 节流
        intervalVal = util.throttle(documentSaveFn, 6666, intervalVal)();
      } else {
        fileName = file.fileName; // 保存上次编辑的文件
        documentSaveFn();
      }
    } catch (err) {
      console.log('保存文件:', err);
    }

    function documentSaveFn() {
      const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
      let editor = vscode.editor || vscode.window.activeTextEditor;
      let fileEnd = editor._documentData._languageId; // 文件后缀
      fileEnd = util.fileEndMatch(fileEnd);
      const document = editor.document;
      const [
        authorRange,
        authorText,
        lastTimeRange,
        lastTimeText,
        hasAnnotation
      ] = logic.saveReplaceTime(document, config, fileEnd);
      // 检测文件注释,自动添加注释
      if (!logic.isMatchProhibit(editor._documentData._uri.fsPath, config)) {
        // 文件没被添加进黑名单
        if (!hasAnnotation && config.configObj.autoAdd) {
          // 只自动添加支持的语言
          if (config.configObj.autoAlready) {
            fileEnd !== 'default_str' && fileheaderFn(); // 支持语言
          } else {
            fileheaderFn(); // 任何文件自动添加头部注释
          }
        }
      }

      if (authorRange !== undefined && lastTimeRange !== undefined) {
        // 变更最后编辑人和最后编辑时间
        util.saveEditor(editor, (edit) => {
          edit.replace(authorRange, authorText);
          edit.replace(lastTimeRange, lastTimeText);
        })
      } else if (lastTimeRange !== undefined) {
        // 只变更最后编辑时间

        util.saveEditor(editor, (edit) => {
          edit.replace(lastTimeRange, lastTimeText);
        })
      } else if (authorRange !== undefined) {
        // 只变更最后编辑人
        util.saveEditor(editor, (edit) => {
          edit.replace(authorRange, authorText);
        })
      }
    }
  });
}

exports.activate = activate;

// 扩展被禁用 调用
function deactivate() { }
exports.deactivate = deactivate;
