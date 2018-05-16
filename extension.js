const vscode = require('vscode');

// 模板
function fontTemplate(tpl) {
    let
        fn,
        match,
        code = ['let r=[];\nlet _html = function (str) { return str.replace(/&/g, \'&amp;\').replace(/"/g, \'&quot;\').replace(/\'/g, \'&#39;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\'); };'],
        re = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/m,
        addLine = function (text) {
            code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
        };
    while (match = re.exec(tpl)) {
        if (match.index > 0) {
            addLine(tpl.slice(0, match.index));
        }
        if (match[2]) {
            code.push('r.push(String(this.' + match[1] + '));');
        }
        else {
            code.push('r.push(_html(String(this.' + match[1] + ')));');
        }
        tpl = tpl.substring(match.index + match[0].length);
    }
    addLine(tpl);
    code.push('return r.join(\'\');');
    fn = new Function(code.join('\n'));
    this.render = function (model) {
        // 采用配置数据
        return fn.apply(model);
    };
}

Date.prototype.format = function (format) {
    // 处理时间格式
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

// 扩展激活 默认运行
function activate(context) {
    let config = vscode.workspace.getConfiguration('fileheader');  // 配置项默认值
    let disposable = vscode.commands.registerCommand('extension.fileheader', function () {
        let editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
        let line = editor.selection.active.line;
        editor.edit(function (editBuilder) {
            let time = new Date().format("yyyy-MM-dd hh:mm:ss");
            let data = {}, fontTpl = '', strContent = '';
            Object.keys(config.customMade).forEach((key) => {
                strContent += `* @${key}: {${key}}\r\n `;
                data[key] = config.customMade[key];
            });
            [data.Date, data.LastEditTime] = [time, time];
            fontTpl = `/*\r\n ${strContent}*/\r\n`;
            let tpl = new fontTemplate(fontTpl).render(data); // 默认配置
            editBuilder.insert(new vscode.Position(0, 0), tpl); // 插入
        });
    });
    // 文件保存时 触发
    vscode.workspace.onDidSaveTextDocument(function (file) {
        setTimeout(function () {
            let editor = vscode.editor || vscode.window.activeTextEditor;
            let document = editor.document;
            let comment = false;
            let authorRange, authorText, lastTimeRange, lastTimeText, diff;
            for (let i = 0; i < 40; i++) {
                // 前40行没有文件头部注释内容即退出
                let linetAt = document.lineAt(i); // 获取每行内容
                let line = linetAt.text.trim();
                if (line.startsWith('/*') && !line.endsWith('*/')) {
                    comment = true; // 进入注释
                } else if (comment) {
                    if (line.endsWith("*/")) {
                        comment = false; // 结束注释
                    }
                    let range = linetAt.range;
                    if (line.indexOf('@LastEditors') > -1) {//表示是修改人
                        authorRange = range;
                        authorText = ' * @LastEditors: ' + config.customMade.LastEditors;
                    } else if (line.indexOf('@LastEditTime') > -1) {//最后修改时间
                        let time = line.replace('@LastEditTime:', '').replace('*', '');
                        let oldTime = new Date(time);
                        let curTime = new Date();
                        diff = (curTime - oldTime) / 1000;
                        lastTimeRange = range;
                        lastTimeText = ' * @LastEditTime: ' + curTime.format("yyyy-MM-dd hh:mm:ss");
                    }
                    if (!comment) {
                        break; // 结束 退出循环
                    }
                }
            }
            if ((authorRange != null) && (lastTimeRange != null) && (diff > 20)) {
                setTimeout(function () {
                    editor.edit(function (edit) {
                        edit.replace(authorRange, authorText);
                        edit.replace(lastTimeRange, lastTimeText);
                    });
                    document.save(); // 保存
                }, 200);
            }
        }, 300);
    });
    // 当插件关闭时被清理的可清理列表
    context.subscriptions.push(disposable);
}

exports.activate = activate;

// 扩展被禁用 调用
function deactivate() {
}
exports.deactivate = deactivate;