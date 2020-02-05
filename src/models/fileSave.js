/*
 * Author: OBKoro1
 * Date: 2020-02-05 14:40:32
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-02-05 15:25:06
 * FilePath: /koro1FileHeader/src/models/fileSave.js
 * Description: 文件保存时触发
 * https://github.com/OBKoro1
 */

const vscode = require('vscode');
const util = require('../utile/util');
const handleError = require('../logic/handleError');
const logic = require('../logic/logic');
const repealChange = require('./repealChange');
const createAnnotation = require('./createAnnotation');

function watchSaveFn() {
  let intervalVal = null; // 保存上次触发时间，用于节流
  let fileName = ''; // 保存操作的文件
  // 文件保存时 触发
  vscode.workspace.onWillSaveTextDocument(file => {
    if (!file.document.isDirty) return; // 文件没有修改 不操作
    let editor = vscode.editor || vscode.window.activeTextEditor;
    const config = vscode.workspace.getConfiguration('fileheader');
    // 先保存本次编辑 再查看文件的修改
    file.document.save().then(() => {
      const RepealChange = new repealChange(config.configObj.CheckFileChange);
      if (RepealChange.resetFile) return;
      try {
        if (file.fileName === fileName) {
          // 同一个文件操作 节流
          intervalVal = util.throttle(documentSaveFn, 6666, intervalVal)();
        } else {
          fileName = file.fileName; // 保存上次编辑的文件
          documentSaveFn();
        }
      } catch (err) {
        handleError.showErrorMessage(err);
      }
    });
    function documentSaveFn() {
      // 配置项默认值
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
        util.saveEditor(editor, edit => {
          edit.replace(authorRange, authorText);
          edit.replace(lastTimeRange, lastTimeText);
        });
      } else if (lastTimeRange !== undefined) {
        // 只变更最后编辑时间
        util.saveEditor(editor, edit => {
          edit.replace(lastTimeRange, lastTimeText);
        });
      } else if (authorRange !== undefined) {
        // 只变更最后编辑人
        util.saveEditor(editor, edit => {
          edit.replace(authorRange, authorText);
        });
      }
      // 检测文件注释,自动添加注释
      setTimeout(() => {
        let params = {
          fsPath: editor._documentData._uri.fsPath,
          lineCount: editor.document.lineCount,
          fileEnd,
          hasAnnotation,
          config
        };
        let isAutoAdd = logic.isAutoAddFn(params);
        if (isAutoAdd) {
          global.autoAddFiles.push(params.fsPath);
          const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
          createAnnotation.headerAnnotation(editor);
        }
      }, 500);
    }
  });
}

module.exports = watchSaveFn
