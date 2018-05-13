// TODO: icon /中英文 readme  更改命令名字。 git仓库，插件改名字。 更改配置默认参数:比如哈哈哈
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
    let o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
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
    let config = vscode.workspace.getConfiguration('sayHello');  // 配置项默认值
    let methodConfig = vscode.workspace.getConfiguration('methodNotes');  // 配置项默认值
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        vscode.window.showInformationMessage('Hello World2!');
        let editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
        let line = editor.selection.active.line;
        editor.edit(function (editBuilder) {
            let time = new Date().format("yyyy-MM-dd hh:mm:ss");
            let data = {
                author: config.Author,
                lastModifiedBy: config.LastModifiedBy,
                email: config.Email,
                createTime: time,
                updateTime: time,
                Description: config.Description
            }
            let configTpl = config.tpl;
            if (config.closeChoose) {
                let closeChooseArr = config.closeChoose.split(',');
                let strArr = config.tpl.split('\r\n');
                let newArr = [];
                for (let [index, item] of strArr.entries()) {
                    let status = true;
                    for (let [key, data] of closeChooseArr.entries()) {
                        if (item.indexOf(data) > -1) {
                            // 找到时，退出循环，并且不push
                            status = false;
                            break;
                        }
                    }
                    if (status) {
                        newArr.push(item);
                    }
                }
                configTpl = newArr.join('\r\n');
            }
            let tpl = new fontTemplate(configTpl).render(data); // 默认配置
            editBuilder.insert(new vscode.Position(0, 0), tpl); // 插入
        });
    });
    let methodNotes = vscode.commands.registerCommand('extension.methodNotes', function () {
        vscode.window.showInformationMessage('Hello World4!');
        let editor = vscode.editor || vscode.window.activeTextEditor;
        let line = editor.selection.active.line;
        let data = {
            method: '',
            param: '',
            return: '',
        }
        editor.edit(function (editBuilder) {
            let tpl = new fontTemplate(methodConfig.tpl).render(data);
            editBuilder.insert(new vscode.Position(line, 0), tpl);

        });
    });

    // 文件保存时 触发
    vscode.workspace.onDidSaveTextDocument(function (file) {
        setTimeout(function () {
            vscode.window.showInformationMessage('Hello World3!');
            let editor = vscode.editor || vscode.window.activeTextEditor;
            let document = editor.document;
            let comment = false;
            let authorRange, authorText, lastTimeRange, lastTimeText, diff;

            for (let i = 0; i < 20; i++) {
                // 前20行没有文件头部注释内容即退出
                let linetAt = document.lineAt(i); // 获取每行内容
                let line = linetAt.text.trim();
                if (line.startsWith('/*') && !line.endsWith('*/')) {
                    comment = true; // 进入注释
                } else if (comment) {
                    if (line.endsWith("*/")) {
                        comment = false; // 结束注释
                    }
                    let range = linetAt.range;
                    if (line.indexOf('@Last\ Modified\ by') > -1) {//表示是修改人
                        authorRange = range;
                        authorText = ' * @Last Modified by: ' + config.LastModifiedBy;
                    } else if (line.indexOf('@Last\ Modified\ time') > -1) {//最后修改时间
                        let time = line.replace('@Last\ Modified\ time:', '').replace('*', '');
                        let oldTime = new Date(time);
                        let curTime = new Date();
                        diff = (curTime - oldTime) / 1000;
                        lastTimeRange = range;
                        // lastTimeText = ' * @Last Modified time: ' + '啦啦啦';
                        lastTimeText = ' * @Last Modified time: ' + curTime.format("yyyy-MM-dd hh:mm:ss");
                    }
                    if (!comment) {
                        break; // 结束
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
    context.subscriptions.push(methodNotes);

}

exports.activate = activate;

// 扩展被禁用 调用
function deactivate() {
}
exports.deactivate = deactivate;