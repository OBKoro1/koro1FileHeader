const vscode = require('vscode');

// 模板
function fontTemplate(tpl) {
  let fn,
    match,
    code = [
      "let r=[];\nlet _html = function (str) { return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };"
    ],
    // 取出由&包裹的属性名 替换为值
    re = /\&\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\&/m,
    addLine = function(text) {
      code.push(
        "r.push('" +
          text
            .replace(/\'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r') +
          "');"
      );
    };
  while ((match = re.exec(tpl))) {
    if (match.index > 0) {
      addLine(tpl.slice(0, match.index));
    }
    if (match[2]) {
      code.push('r.push(String(this.' + match[1] + '));');
    } else {
      code.push('r.push(_html(String(this.' + match[1] + ')));');
    }
    tpl = tpl.substring(match.index + match[0].length);
  }
  addLine(tpl);
  code.push("return r.join('');");
  fn = new Function(code.join('\n'));
  this.render = function(model) {
    // 采用配置数据
    return fn.apply(model);
  };
}

Date.prototype.format = function(format) {
  // 处理时间格式
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return format;
};

// 扩展激活 默认运行
function activate(context) {
  let config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
  const fileheader = vscode.commands.registerCommand(
    'extension.fileheader',
    () => {
      const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
      editor.edit(function(editBuilder) {
        let [data, fontTpl, strContent] = [{}, '', ''];
        let time = new Date().format('yyyy-MM-dd hh:mm:ss');
        let userSet = Object.keys(config.customMade);
        if (userSet.length === 0) {
          // 默认模板
          data = {
            Description: 'In User Settings Edit',
            Author: 'your name',
            Date: '',
            LastEditTime: '',
            LastEditors: 'your name'
          };
        } else {
          // 如果用户设置了模板，那将默认根据用户设置模板
          data = Object.assign({}, config.customMade); // 复制对象，否则对象不能更改值
        }
        if (data.Date !== undefined) {
          data.Date = time; //  用户设置了时间选项
        }
        if (data.LastEditTime !== undefined) {
          data.LastEditTime = time; // 用户设置了最后编辑时间选项
        }

        // 生成模板
        Object.keys(data).forEach(key => {
          strContent += `* @${key}: &${key}&\r\n `;
        });

        fontTpl = `/*\r\n ${strContent}*/\r\n`;
        let tpl = new fontTemplate(fontTpl).render(data); // 生成模板
        editBuilder.insert(new vscode.Position(0, 0), tpl); // 插入
      });
    }
  );

  const cursorTip = vscode.commands.registerCommand(
    'extension.cursorTip',
    () => {
      const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
      const line = editor.selection.active.line; // 当前行
      const lineProperty = editor.document.lineAt(line); // 当前行的属性
      let lineFirst = lineProperty.firstNonWhitespaceCharacterIndex; // 激活行 前面是否有值
      let lineSpace,
        nextLine,
        frontStr = ''; // 前面空几行
      // 判断当前行有没有内容 决定选择当前行还是下一行的长度
      if (lineProperty.isEmptyOrWhitespace) {
        nextLine = editor.selection.active.line + 1;
        lineSpace = editor.document.lineAt(nextLine)
          .firstNonWhitespaceCharacterIndex;
        lineFirst = lineFirst === 0 ? lineSpace : 0;
        frontStr = ''.padStart(lineFirst);
      } else {
        lineSpace = lineFirst;
      }
      editor.edit(function(editBuilder) {
        let [data, fontTpl, strContent] = [{}, '', ''];
        let time = new Date().format('yyyy-MM-dd hh:mm:ss');
        let userSet = Object.keys(config.cursorMode);
        if (userSet.length === 0) {
          data = {
            msg: '',
            param: '',
            return: ''
          };
        } else {
          // 如果用户设置了模板，那将默认根据用户设置模板
          data = Object.assign({}, config.cursorMode); // 复制对象，否则对象不能更改值
        }
        // 生成模板
        const str = ''.padStart(lineSpace); // 生成指定长度的字符串
        Object.keys(data).forEach(key => {
          if (key === 'param') {
            // 类型
            let type = '{type}';
            strContent += `${str}* @${key} ${type} &${key}&\r\n `;
          } else {
            strContent += `${str}* @${key}: &${key}&\r\n `;
          }
        });
        // 当前行为空 不换行
        if (nextLine === undefined) {
          fontTpl = `${frontStr}/**\r\n ${strContent}${str}*/\r\n${str}`;
        } else {
          fontTpl = `${frontStr}/**\r\n ${strContent}${str}*/`;
        }

        let tpl = new fontTemplate(fontTpl).render(data); // 生成模板
        editBuilder.insert(new vscode.Position(line, lineSpace), tpl); // 插入
      });
    }
  );
  context.subscriptions.push(cursorTip);

  // 文件保存时 触发
  vscode.workspace.onDidSaveTextDocument(function(file) {
    setTimeout(function() {
      let editor = vscode.editor || vscode.window.activeTextEditor;
      let document = editor.document;
      let comment = false;
      let authorRange, authorText, lastTimeRange, lastTimeText, diff;
      for (let i = 0; i < 24; i++) {
        // 前24行没有文件头部注释内容即退出
        let linetAt = document.lineAt(i); // 获取每行内容
        let line = linetAt.text.trim();
        if (line.startsWith('/*') && !line.endsWith('*/')) {
          comment = true; // 进入注释
        } else if (comment) {
          if (line.endsWith('*/')) {
            comment = false; // 结束注释
          }
          let range = linetAt.range;
          if (line.indexOf('@LastEditors') > -1) {
            //表示是修改人
            authorRange = range;
            let LastEditors = config.customMade.LastEditors || 'your name';
            authorText = ' * @LastEditors: ' + LastEditors;
          } else if (line.indexOf('@LastEditTime') > -1) {
            //最后修改时间
            let time = line.replace('@LastEditTime:', '').replace('*', '');
            let oldTime = new Date(time);
            let curTime = new Date();
            diff = (curTime - oldTime) / 1000;
            lastTimeRange = range;
            lastTimeText =
              ' * @LastEditTime: ' + curTime.format('yyyy-MM-dd hh:mm:ss');
          }
          if (!comment) {
            break; // 结束 退出循环
          }
        }
      }
      if (authorRange != null && lastTimeRange != null && diff > 20) {
        setTimeout(function() {
          editor.edit(function(edit) {
            edit.replace(authorRange, authorText);
            edit.replace(lastTimeRange, lastTimeText);
          });
          document.save(); // 保存
        }, 200);
      }
    }, 300);
  });
  // 当插件关闭时被清理的可清理列表
  context.subscriptions.push(fileheader);
}

exports.activate = activate;

// 扩展被禁用 调用
function deactivate() {}
exports.deactivate = deactivate;
