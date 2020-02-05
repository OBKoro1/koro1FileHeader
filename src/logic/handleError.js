/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-09-04 20:36:56
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-12-09 10:51:21
 * Description: 报错拦截
 */

const vscode = require('vscode');

const showErrorMessage = (e)=>{
    const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
    if(!config.configObj.filePathColon) return // 关闭报错
    if(typeof e !== 'string'){
        e = e.message
    }
    vscode.window.showErrorMessage('错误信息:', e)
}

process.on('uncaughtException', function (e) {
    const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
    if(!config.configObj.filePathColon) return // 关闭报错
    vscode.window.showErrorMessage('错误信息:', JSON.stringify(e))
});

module.exports = {
    showErrorMessage
}