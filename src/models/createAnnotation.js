/*
 * Author: OBKoro1
 * Date: 2020-02-05 14:27:10
 * @LastEditors  : OBKoro1
 * @LastEditTime : 2020-02-13 11:40:19
 * FilePath: /koro1FileHeader/src/models/createHeader.js
 * Description: 在对应的文件添加头部/函数注释
 * https://github.com/OBKoro1
 */

const vscode = require('vscode');
const logic = require('../logic/logic');
const util = require('../utile/util');
const handleError = require('../logic/handleError');
const languageOutput = require('../languageOutPut/languageOutput');
const handleTpl = require('./handleTpl');

// 在对应文件头部添加头部注释
function headerAnnotation(editor, option = {}) {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
  editor.edit(editBuilder => {
    try {
      // 文件后缀
      let fileEnd = editor._documentData._languageId; // 语言
      fileEnd = util.fileEndMatch(fileEnd); // 提取文件后缀 或者语言类型
      if (option.create && fileEnd === '匹配不到_默认注释') return; // 创建文件匹配不到_默认注释 不自动添加头部注释
      // 返回生成模板的数据对象
      let data = logic.userSet(config);
      // 生成
      let tpl = languageOutput.headNotes(data, fileEnd, config);
      // 处理生成的模板
      const { lineNum, newTpl } = handleTpl.handleTplFn(
        tpl,
        editor._documentData._uri.fsPath,
        config
      );
      tpl = newTpl;
      editBuilder.insert(new vscode.Position(lineNum, 0), tpl); // 插入
      setTimeout(() => {
        editor.document.save();
        logic.moveCursor(tpl);
      }, 200);
    } catch (err) {
      handleError.showErrorMessage(err);
    }
  });
}

// 在对应文件添加函数注释
const functionAnnotation = () => {
  try {
    const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
    const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
    let fileEnd = editor._documentData._languageId; // 语言
    fileEnd = util.fileEndMatch(fileEnd);
    const [lineSpace, frontStr, line, nextLine] = logic.lineSpaceFn(editor);
    editor.edit(editBuilder => {
      let data = logic.cursorOptionHandleFn(config);
      let fontTpl = new languageOutput.functionTplStr(
        data,
        fileEnd,
        lineSpace,
        nextLine,
        frontStr
      ).generate(); // 函数注释的模板字符串
      editBuilder.insert(new vscode.Position(line, lineSpace), fontTpl); // 插入
      setTimeout(() => {
        logic.moveCursorDesFn(fileEnd, config, fontTpl, line);
      }, 100);
    });
  } catch (err) {
    handleError.showErrorMessage(err);
  }
};

module.exports = {
  functionAnnotation,
  headerAnnotation
};
