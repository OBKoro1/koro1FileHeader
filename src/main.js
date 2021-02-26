/*
 * @Description: 入口
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * @LastEditors  : OBKoro1
 * @LastEditTime : 2021-02-26 16:42:03
 */
const vscode = require('vscode')
const global = require('./utile/CONST')
const createAnnotation = require('./models/createAnnotation')
const ActiveHandle = require('./models/activeHandle')
const Design = require('./design')
const handleError = require('./logic/handleError')

// 注册命令
function registerCommand (context) {
  // 注册命令
  const fileHeader = vscode.commands.registerCommand(
    'extension.fileheader',
    () => {
      const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
      createAnnotation.headerAnnotation(editor)
    }
  )
  const cursorTip = vscode.commands.registerCommand(
    'extension.cursorTip',
    createAnnotation.functionAnnotation
  )
  const codeDesign = vscode.commands.registerCommand(
    'extension.codeDesign',
    () => {
      new Design().headDesignCreate()
    }
  )
  context.subscriptions.push(fileHeader)
  context.subscriptions.push(cursorTip)
  context.subscriptions.push(codeDesign)
}

// 扩展激活 默认运行
function activate (context) {
  // 当插件关闭时被清理的可清理列表
  try {
    global.context = context
    registerCommand(context) // 注册命令
    new Design().registerCommand() // 监听注释图案
    new ActiveHandle().watch() // 监听事件
  } catch (err) {
    handleError.showErrorMessage('fileHeader: activate context', err)
  }
}

exports.activate = activate

// 扩展被禁用 调用
function deactivate () {}
exports.deactivate = deactivate
