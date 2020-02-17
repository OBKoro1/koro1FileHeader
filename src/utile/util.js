/*
 * @Description: 公共函数
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-02-13 12:32:24
 */

const vscode = require('vscode');
const moment = require('moment');
const path = require('path');

/**
 * @description: 节流函数 单位时间内有事件被多次触发则，只生效一次
 * @param {Function} fn 节流的函数
 * @param {Number} gapTime 节流执行间隔
 * @param {Number} _lastTime 上次执行时间
 * @return: 上次触发time
 */
const throttle = (fn, gapTime, _lastTime = null) => {
  return function() {
    let _nowTime = Date.now();
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
 * 项目使用特殊库/规则，导致文件语言跟注释形式不匹配情况
 * 1. 用户定义的语言符号
 * 2. 插件自带的语言符号
 * 3. 无法识别的语言 默认的注释符号
 */
const fileEndMatch = fileEnd => {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项
  const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
  let fsName = fsPathFn(editor._documentData._uri.fsPath); // 文件后缀
  //  匹配用户自定义语言
  let isMatch = userLanguageFn(
    config,
    fileEnd,
    fsName,
    editor._documentData._uri.fsPath
  );
  if (isMatch) {
    return isMatch; // 匹配到了 返回对象
  }
  const obj = {
    '/^java$|^javascript$|^typescript$|^go$|^cpp$|^php$|^c$/': 'javascript',
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
  return '匹配不到_默认注释';
};

// 是否使用用户配置
function userLanguageFn(config, fileEnd, fsName, fsPath) {
  // 特殊文件
  const language = config.configObj.language; // 自定义语言项
  let isSpecial = specialLanguageFn(fsPath, config);
  if (isSpecial) {
    return {
      fileEnd: isSpecial,
      userLanguage: true // 使用用户的配置
    };
  }

  // 检查用户是否设自定义语言 匹配语言
  if (language[fileEnd]) {
    return {
      fileEnd,
      userLanguage: true // 使用用户的配置
    };
  } else if (language[fsName]) {
    // 语言没有匹配到 单独匹配一下文件后缀
    return {
      fileEnd: fsName,
      userLanguage: true
    };
  }
  for (let key in language) {
    if (key.indexOf('/') !== -1) {
      const keyArr = key.split('/');
      for (let item of keyArr.values()) {
        if (item === fsName) {
          return {
            fileEnd: key,
            userLanguage: true
          };
        }
      }
    }
  }

  return false;
}

// 项目使用特殊库/规则，导致文件语言跟注释形式不匹配 如：变量.blade.php与test.php的注释不同
function specialLanguageFn(fsPath, config) {
  config = config.configObj['language']; // 自定义语言项
  const pathArr = fsPath.split('/');
  const fileName = pathArr[pathArr.length - 1]; // 取/最后一位
  Object.keys(config).forEach(item => {
    if (item.indexOf('.') !== -1) {
      // 限制key包含. fileName包含key fileName与key不等(变量.后缀.后缀)
      if (fileName.indexOf(item) !== -1 && fileName !== item) {
        return item;
      }
    }
  });
}

// 修改时间格式
Date.prototype.format = function() {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项
  return moment(this)
    .local()
    .format(config.configObj.dateFormat);
};

// 获取该文件的冒号
const getColon = fileEnd => {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
  let colon = config.configObj.colonObj[fileEnd]; // 冒号
  // 文件没有设置 采用全局
  if (colon === undefined) {
    colon = config.configObj.colon;
  }
  return colon;
};

/**
 * 切割特殊字符串生成空行
 * @param {string} tpl 生成的模板
 */
const replaceSymbolStr = (tpl, fileEnd) => {
  let sinceOut = tpl.indexOf('symbol_custom_string_obkoro1');
  if (sinceOut !== -1) {
    const colon = getColon(fileEnd);
    tpl = tpl.replace(`symbol_custom_string_obkoro1${colon}`, '');
  }
  return tpl;
};

/**
 * 使用空格填充字符
 */
const spaceStringFn = (oldStr, maxNum) => {
  if (typeof maxNum !== 'number') {
    // 不为数字默认为13
    maxNum = 13;
  }
  let diffNum = maxNum - oldStr.length;
  let spaceStr = ''.padStart(diffNum);
  return `${oldStr}${spaceStr}`;
};

// 获取文件和项目的地址
const getFileRelativeSite = () => {
  const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
  const fsPath = editor._documentData._uri.fsPath; // 文件路径
  let itemName = ''; // 项目名称
  let itemPath = ''; // 项目路径
  try {
    itemPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    // path.sep window: \ mac: /
    let itemNameArr = itemPath.split(path.sep);
    itemName = itemNameArr[itemNameArr.length - 1]; // 取/最后一位
  } catch (err) {
    itemName = vscode.workspace.name;
    itemPath = vscode.workspace.rootPath;
  }
  let fileItemPath = fsPath.replace(itemPath, ''); // 相对地址
  return {
    fsPath, // 文件绝对地址
    itemPath, // 项目的绝对地址
    fileItemPath, // 文件相对地址
    itemName // 项目名称
  };
};

module.exports = {
  throttle, // 节流
  fileEndMatch, // 匹配文件后缀 以哪种形式生成注释
  fsPathFn, // 切割文件路径 获取文件后缀
  specialLanguageFn, // 项目使用特殊库/规则，导致文件语言跟注释形式不匹配
  replaceSymbolStr, // 切割特殊字符串生成空行
  getColon, // 获取该文件的冒号
  spaceStringFn, // 使用空格填充字符
  getFileRelativeSite // 获取文件和项目的地址
};
