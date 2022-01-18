/*
 * Author: OBKoro1
 * Date: 2020-02-05 14:49:37
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-19 00:17:29
 * FilePath     : /koro1FileHeader/src/models/activeHandle.js
 * Description: 扩展激活的一些监听等事情
 * https://github.com/OBKoro1
 */

const vscode = require('vscode')
const createAnnotation = require('./createAnnotation')
const fileSave = require('./fileSave')
const util = require('../utile/util')
const global = require('../utile/CONST')
const handleError = require('../logic/handleError')

class ActiveHandle {
  watch () {
    fileSave() // 监听文件保存
    this.createFile()
    this.errPath()
    this.watchTable()
  }

  watchTable () {
    const table = vscode.commands.registerCommand(
      'koroFileheader.table',
      () => {
        const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
        const activeLine = editor.selection.active.line // 激活行 行号
        const position = editor.selection.active
        const newPosition = position.with(activeLine + 1, 10000)
        editor.selection = new vscode.Selection(newPosition, newPosition)
      })
    global.context.subscriptions.push(table)
  }

  // 监听用户输入的错误日志地址
  errPath () {
    const errPath = vscode.commands.registerCommand(
      'fileheader.errPathSet',
      () => {
        vscode.window
          .showOpenDialog({
            canSelectFiles: false, // 允许选择文件
            canSelectFolders: true, // 是否可以选择文件夹
            canSelectMany: false // 是否可以选择多个文件
          })
          .then((urlArr) => {
            try {
              if (!urlArr) return // 用户取消选择
              vscode.window.showInformationMessage(
                'fileHeader: 设置错误日志地址成功'
              )
              global.errPath = urlArr[0].path
              // 储存到空间
              global.context.globalState.update(global.globalStateData.errPath, global.errPath)
            } catch (err) {
              handleError.showErrorMessage('fileHeader: 设置错误日志地址', err)
            }
          })
      }
    )
    global.context.subscriptions.push(errPath)
  }

  // 创建文件 自动添加注释
  createFile () {
    vscode.workspace.onDidCreateFiles((file) => {
      const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
      if (!config.configObj.createHeader) return // 关闭
      const filePath = file.files[0].fsPath
      const openPath = vscode.Uri.file(filePath)
      vscode.workspace.openTextDocument(openPath).then((doc) => {
        vscode.window.showTextDocument(doc).then(() => {
          try {
            const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
            const fsPath = editor.document.uri.fsPath
            const hasAddProhibit = util.authList(fsPath)
            if (!hasAddProhibit) return false // 被添加进黑名单 或者没有添加进白名单
            createAnnotation.headerAnnotation(editor, {
              create: true
            })
          } catch (err) {
            handleError.showErrorMessage('fileHeader: 自动添加注释', err)
          }
        })
      })
    })
  }
}
module.exports = ActiveHandle
