/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-09-04 20:36:56
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-03-03 11:36:46
 * Description: 报错拦截
 */

const vscode = require('vscode')
const fs = require('fs')
const global = require('../utile/CONST')
const path = require('path')

const showErrorMessage = (tag, e) => {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
  if (!config.configObj.showErrorMessage) return // 关闭报错
  if (typeof e !== 'string') {
    e = `message: ${e.message}\nstack: ${e.stack}`
  }
  writeLog(tag, e)
  vscode.window.showErrorMessage(tag, e)
}

process.on('uncaughtException', function (e) {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
  if (!config.configObj.showErrorMessage) return // 关闭报错
  const msg = JSON.stringify(e)
  vscode.window.showErrorMessage('fileHeader: uncaughtException崩溃', msg)
  writeLog('fileHeader: uncaughtException崩溃', msg)
})

// 每次重启插件都清空日志 防止日志过多
let content = ''

function writeLog (tag, msg = '') {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
  if (!config.configObj.writeLog) return
  const errPath = global.context.globalState.get(global.globalStateData.errPath)
  if (global.errPath === global.initErrPath) {
    if (errPath) {
      global.errPath = errPath
    } else {
      vscode.window.showErrorMessage('请设置错误日志地址！', '按快捷键ctrl+p,输入>空格errPathSet')
      return
    }
  }
  const isDirectory = fs.statSync(global.errPath).isDirectory()
  if (!isDirectory) {
    vscode.window.showErrorMessage('错误日志地址不存在', '请按快捷键ctrl+p,重新输入:>空格errPathSet')
    return
  }
  const fileUrl = `${global.errPath}${path.sep}koroFileHeaderLog.txt`
  content = `${content}\n${tag}: ${msg}`
  fs.writeFileSync(fileUrl, content, 'utf8')
}

module.exports = {
  showErrorMessage,
  writeLog
}
