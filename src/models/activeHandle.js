/*
 * Author: OBKoro1
 * Date: 2020-02-05 14:49:37
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-02-05 15:57:36
 * FilePath: /koro1FileHeader/src/models/activeHandle.js
 * Description: 扩展激活的一些监听等事情
 * https://github.com/OBKoro1
 */

const vscode = require('vscode');
const createAnnotation = require('./createAnnotation');
const fileSave = require('./fileSave');

class activeHandle {
  constructor() {
    this.watch();
    console.log('activeHandle');
  }
  watch() {
    fileSave(); // 监听文件保存
    this.createFile();
    this.reNameFile();
  }
  createFile() {
    vscode.workspace.onDidCreateFiles(file => {
      const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
      if (!config.configObj.createHeader) return; // 关闭
      const filePath = file.files[0].fsPath;
      const openPath = vscode.Uri.file(filePath);
      vscode.workspace.openTextDocument(openPath).then(doc => {
        vscode.window.showTextDocument(doc).then(() => {
          const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
          createAnnotation.headerAnnotation(editor);
        });
      });
    });
  }
  reNameFile() {
    vscode.workspace.onDidRenameFiles(file => {
      console.log('重命名文件');
      const filePath = file.files[0].newUri.fsPath;
      const openPath = vscode.Uri.file(filePath);
      vscode.workspace.openTextDocument(openPath).then(doc => {
        vscode.window.showTextDocument(doc).then(() => {
          const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
          createAnnotation.headerAnnotation(editor);
        });
      });
    });
  }
}
module.exports = activeHandle;
