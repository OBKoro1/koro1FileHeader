/*
 * @Description: 入口
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-02-05 15:09:18
 */
const vscode = require('vscode')
const global = require('./utile/CONST')
const createAnnotation = require('./models/createAnnotation')
const activeHandle = require('./models/activeHandle')
const design = require('./design')

// 扩展激活 默认运行
function activate(context) {
  global.context = context
  const fileheaderFn = () => {
    const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
    createAnnotation.headerAnnotation(editor)
  }
  const fileheader = vscode.commands.registerCommand(
    'extension.fileheader',
    fileheaderFn
  )
  const cursorTip = vscode.commands.registerCommand(
    'extension.cursorTip',
    createAnnotation.functionAnnotation
  )
  new design()
  new activeHandle()
  // 当插件关闭时被清理的可清理列表
  context.subscriptions.push(fileheader)
  context.subscriptions.push(cursorTip)
}

exports.activate = activate

// 扩展被禁用 调用
function deactivate() {}
exports.deactivate = deactivate
