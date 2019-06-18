/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-06-17 16:24:20
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-06-18 14:21:06
 * @Description: vscode api 测试 
 */
const vscode = require('vscode');

let test = () => {
    // 读取粘贴板
    vscode.env.clipboard.readText().then(res => {
        console.log('re', res, vscode.env.clipboard.readText())
    })
    let Position = new vscode.Position(1, 2)
    const range = new vscode.Range(5, 7);
    console.log('环境变量', Position, range)
}

const webviewFn = () => {
    // 创建webview
    const panel = vscode.window.createWebviewPanel(
        'testWebview', // viewType
        "WebView演示", // 视图标题
        vscode.ViewColumn.One, // 显示在编辑器的哪个部位
        {
            enableScripts: true, // 启用JS，默认禁用
            retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        }
    );
    panel.webview.html = `<html><body>你好，我是Webview</body></html>`
}

// 移动光标到这个位置
vscode.commands.executeCommand('cursorMove', {
    to: "up",
    by: "wrappedLine",
    value: descriptionLineNum + 1, // 行数比文档数组多1
    select: false
});
// 光标移到末尾
vscode.commands.executeCommand('cursorMove', {
    to: "wrappedLineEnd",
});