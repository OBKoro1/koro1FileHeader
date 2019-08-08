/*
 * @Description: 公共函数
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-08 13:47:30
 */

const vscode = require('vscode');
const moment = require('moment');

// 模板
function fontTemplate(tpl) {
  let fn,
    match,
    code = [
      "let r=[];\nlet _html = function (str) { return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };"
    ],
    // 取出由&包裹的属性名 替换为值
    re = /\&\s*([\S]+)?\s*\&/m,
    addLine = function (text) {
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
  console.log(JSON.stringify(code), 'code')
  // console.log(code.join('\n'),'111')
  fn = new Function(code.join('\n'));
  console.log(fn, 'fn')
  this.render = function (model) {
    // 采用配置数据
    return fn.apply(model);
  };
}

/**
 * @description: 节流函数 单位时间内有事件被多次触发则，只生效一次
 * @param {Function} fn 节流的函数
 * @param {Number} gapTime 节流执行间隔
 * @param {Number} _lastTime 上次执行时间
 * @return: 上次触发time
 */
const throttle = (fn, gapTime, _lastTime = null) => {
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      // !_lastTime 第一次进入
      fn(); // 当前时间- 上次执行的时间 超过 给定时间间隔 就执行回调
      _lastTime = _nowTime; // 触发后，上次执行时间赋值为当前时间
      return _lastTime;
    }
    return _lastTime;
  };
};

/**
 * @description: 切割文件路径 获取文件后缀
 * @param {String} fsPath 文件路径
 * @return: 文件后缀
 */
const fsPathFn = fsPath => {
  const pathArr = fsPath.split('/');
  const fileName = pathArr[pathArr.length - 1]; // 取/最后一位
  const fileNameArr = fileName.split('.');
  return fileNameArr[fileNameArr.length - 1]; // 取.最后一位
};

/**
 * 以哪种形式生成注释
 * 1. 用户定义的语言符号
 * 2. 插件自带的语言符号
 * 3. 无法识别的语言 默认的注释符号
 */
const fileEndMatch = fileEnd => {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项
  const language = config.configObj.language; // 自定义语言项
  const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
  let fsName = fsPathFn(editor._documentData._uri.fsPath); // 文件后缀
  // 检查用户是否设自定义语言 匹配语言
  if (language[fileEnd]) {
    return {
      fileEnd,
      userLanguage: true // 使用用户的配置
    }
  } else if (language[fsName]) {
    // 语言没有匹配到 单独匹配一下文件后缀
    // fileEnd.userLanguage 没有值 即为单独的字符串
    return {
      fileEnd: fsName,
      userLanguage: true
    }
  }
  const obj = {
    '/^java$|^javascript$|^typescript$|^go$|^cpp$|^c$/': 'javascript',
    '/^python$/': 'python',
    '/^vb$/': 'vb',
    '/^vue$|^html$|^markdown$/': 'html',
    '/^shellscript$/': 'shellscript'
  };
  // 匹配插件支持的注释符号
  for (let key in obj) {
    // 正则匹配
    const reg = eval(key);
    const isMatch = reg.test(fileEnd);
    if (isMatch) {
      return obj[key];
    }
  }
  // 默认注释符号
  return 'default_str';
};

// 修改内容保存编辑器
const saveEditor = (editor, callBack) => {
  setTimeout(() => {
    editor.edit(edit => {
      callBack(edit)
    });
    editor.document.save();
  }, 200);
}

// 修改时间格式
Date.prototype.format = function () {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项
  return moment(this).format(config.configObj.dateFormat)
};

module.exports = {
  fontTemplate,
  throttle,
  fileEndMatch,
  fsPathFn,
  saveEditor
};
