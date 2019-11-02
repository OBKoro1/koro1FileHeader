/*
 * @Description: 入口
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-11-02 18:59:50
 */
const vscode = require('vscode');
const util = require('./util');
const logic = require('./logic');
const languageOutput = require('./languageOutput');
// const PreCommit = require('./commit/precommit')
const global = require('./CONST')
const handleError = require('./handleError')

// 扩展激活 默认运行
function activate(context) {
  global.context = context
  // new PreCommit()
  const fileheaderFn = () => {
    const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
    const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
    editor.edit(editBuilder => {
      try {
        // 文件后缀
        let fileEnd = editor._documentData._languageId; // 语言
        fileEnd = util.fileEndMatch(fileEnd); // 提取文件后缀 或者语言类型
        // 返回生成模板的数据对象
        let data = logic.userSet(config);
        const [lineNum, beforeAnnotation, afterAnnotation] = logic.editLineFn(
          editor._documentData._uri.fsPath,
          config
        );
        // 生成
        let tpl = languageOutput.headNotes(data, fileEnd, config);
        // 预处理的参数
        let beforehand = {
          tpl,
          beforeAnnotation,
          afterAnnotation,
        }
        tpl = logic.handleTplFn(beforehand, fileEnd, config)
        editBuilder.insert(new vscode.Position(lineNum, 0), tpl); // 插入
        setTimeout(() => {
          editor.document.save()
          logic.moveCursor(tpl)
        }, 200)
      } catch (err) {
        handleError.showErrorMessage(err)
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
        let data = logic.cursorOptionHandleFn(config)
        let fontTpl = new languageOutput.functionTplStr(
          data,
          fileEnd,
          lineSpace,
          nextLine,
          frontStr
        ).generate(); // 函数注释的模板字符串
        editBuilder.insert(new vscode.Position(line, lineSpace), fontTpl); // 插入
        setTimeout(()=>{
          logic.moveCursorDesFn(fileEnd, config, fontTpl, line)
        }, 100)
      });
    } catch (err) {
      handleError.showErrorMessage(err)
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
  vscode.workspace.onWillSaveTextDocument(file => {
    if (!file.document.isDirty) return // 文件没有修改 不操作
    try {
      if (file.fileName === fileName) {
        // 同一个文件操作 节流
        intervalVal = util.throttle(documentSaveFn, 6666, intervalVal)();
      } else {
        fileName = file.fileName; // 保存上次编辑的文件
        documentSaveFn();
      }
    } catch (err) {
      handleError.showErrorMessage(err)
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
      // 检测文件注释,自动添加注释
      setTimeout(() => {
        let params = {
          fsPath: editor._documentData._uri.fsPath,
          lineCount: editor.document.lineCount,
          fileEnd,
          hasAnnotation,
          config
        }
        let isAutoAdd = logic.isAutoAddFn(params)
        if(isAutoAdd){
          global.autoAddFiles.push(params.fsPath)
          fileheaderFn();
        }
      }, 500)

    }
  });
}

exports.activate = activate;

// 扩展被禁用 调用
function deactivate() { }
exports.deactivate = deactivate;
