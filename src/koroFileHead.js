const vscode = require('vscode');
const util = require('./util');
const logic = require('./logic');
const fs = require('fs');

// 扩展激活 默认运行
function activate(context) {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
  const fileheader = vscode.commands.registerCommand(
    'extension.fileheader',
    () => {
      const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
      editor.edit(function(editBuilder) {
        try {
          // 获取当前激活文件的路径
          const filepath =
            vscode.window.activeTextEditor._documentData._document.fileName;
          // 获取文件创建时间
          const time = new Date(fs.statSync(filepath).birthtime).format(
            'yyyy-MM-dd hh:mm:ss'
          );
          // 返回生成模板的数据对象
          const data = logic.userSet(config.customMade, time);
          // 文件后缀
          const fileEnd = editor._documentData._languageId;
          const fontTpl = logic.fontTplStr(data, fileEnd);
          // 生成模板
          const tpl = new util.fontTemplate(fontTpl).render(data); // 生成模板
          editBuilder.insert(new vscode.Position(0, 0), tpl); // 插入
        } catch (err) {
          console.log('head:', err);
        }
      });
    }
  );
  context.subscriptions.push(fileheader);

  const cursorTip = vscode.commands.registerCommand(
    'extension.cursorTip',
    () => {
      try {
        const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
        let fileEnd = editor._documentData._languageId; // 文件后缀
        const [lineSpace, frontStr, line, nextLine] = logic.lineSpaceFn(editor);
        editor.edit(function(editBuilder) {
          let [data, fontTpl, strContent] = [{}, '', ''];
          let userSet = Object.keys(config.cursorMode);
          if (userSet.length === 0) {
            data = {
              msg: '',
              param: '',
              return: ''
            };
          } else {
            // 如果用户设置了模板，那将默认根据用户设置模板
            data = Object.assign({}, config.cursorMode); // 复制对象，否则对象不能更改值
          }
          fontTpl = logic.FnTplStr(
            data,
            fileEnd,
            lineSpace,
            nextLine,
            frontStr
          ); // 函数注释的模板字符串
          let tpl = new util.fontTemplate(fontTpl).render(data); // 生成模板
          editBuilder.insert(new vscode.Position(line, lineSpace), tpl); // 插入
        });
      } catch (err) {
        console.log('函数注释错误信息：', err);
      }
    }
  );

  // 当插件关闭时被清理的可清理列表
  context.subscriptions.push(cursorTip);

  let intervalVal = null; // 保存上次触发时间，用于节流
  let fileName = ''; // 保存操作的文件
  // 文件保存时 触发
  vscode.workspace.onDidSaveTextDocument(function(file) {
    if (file.fileName === fileName) {
      // 同一个文件操作 节流
      intervalVal = util.throttle(documentSÏÏaveFn, 6666, intervalVal)();
    } else {
      console.log(fileName, 'fileName');
      fileName = file.fileName; // 保存上次编辑的文件
      documentSÏÏaveFn();
    }
    function documentSÏÏaveFn() {
      try {
        let editor = vscode.editor || vscode.window.activeTextEditor;
        const fileEnd = editor._documentData._languageId; // 文件后缀
        const document = editor.document;
        const [
          authorRange,
          authorText,
          lastTimeRange,
          lastTimeText
        ] = logic.saveReplaceTime(document, config.customMade, fileEnd);
        if (authorRange !== undefined && lastTimeRange !== undefined) {
          setTimeout(function() {
            editor.edit(function(edit) {
              edit.replace(authorRange, authorText);
              edit.replace(lastTimeRange, lastTimeText);
            });
            document.save(); // 保存
          }, 200);
        }
      } catch (err) {
        console.log('保存文件:', err);
      }
    }
  });
}

exports.activate = activate;

// 扩展被禁用 调用
function deactivate() {}
exports.deactivate = deactivate;
