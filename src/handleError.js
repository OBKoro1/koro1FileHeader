/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-09-04 20:36:56
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-11-02 18:58:48
 * Description: 报错拦截
 */

const vscode = require('vscode');

const showErrorMessage = (e)=>{
    if(typeof e !== 'string'){
        e = JSON.stringify(e)
    }
    vscode.window.showErrorMessage('错误信息:', e)
}

process.on('uncaughtException', function (e) {
    /*处理异常*/
    console.log('报错信息：', e.message)
    vscode.window.showErrorMessage('错误信息:', JSON.stringify(e))
});

module.exports = {
    showErrorMessage
}