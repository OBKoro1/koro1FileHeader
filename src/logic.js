/*
 * @Description: 逻辑输出
 * @Author: OBKoro1
 * @Date: 2018-10-31 16:22:55
 * @LastAuthor: OBKoro1
 * @lastTime: 2019-08-08 16:32:27
 */
const vscode = require('vscode');
const languageOutput = require('./languageOutput');
const util = require('./util');

/**
 * @description: 头部注释根据用户设置返回模板数据对象
 * @param {Object} userObj 用户设置
 * @param {String} time 文件创建时间
 * @return: 返回生成模板的数据对象
 */
const userSet = (config, time) => {
  const userObj = config.customMade;

  let data = {};
  let userSet = Object.keys(userObj);
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
    data = Object.assign({}, userObj); // 复制对象，否则对象不能更改值
  }
  // 判断是否设置
  if (data.Date !== undefined) {
    data.Date = time;
  }
  if (data.LastEditTime !== undefined) {
    // 最后编辑时间
    data.LastEditTime = time
  }
  return data;
};

/**
 * @description: 函数注释前面的长度
 * @param {Object} editor 当前激活文件
 * @return: lineSpace：前面的长度，frontStr：函数注释第一行的长度，line:当前行(数字)，nextLine 激活行的下一行是否有内容
 */
const lineSpaceFn = editor => {
  const line = editor.selection.active.line; // 当前行
  const lineProperty = editor.document.lineAt(line); // 当前行的属性
  let lineFirst = lineProperty.firstNonWhitespaceCharacterIndex; // 激活行 前面是否有值
  let lineSpace,
    nextLine,
    frontStr = ''; // 前面空几行
  const activeLine = editor.selection.active.line; // 激活行 行号
  // 判断当前行有没有内容 决定选择当前行还是下一行的长度
  if (
    lineProperty.isEmptyOrWhitespace &&
    editor._documentData.document.lineCount !== activeLine + 1
  ) {
    nextLine = activeLine + 1;
    lineSpace = editor.document.lineAt(nextLine)
      .firstNonWhitespaceCharacterIndex;
    lineFirst = lineFirst === 0 ? lineSpace : 0;
    frontStr = ''.padStart(lineFirst);
  } else {
    lineSpace = lineFirst;
  }
  return [lineSpace, frontStr, line, nextLine];
};

/**
 * @description: 保存时触发修改
 * @param {object} document 文档对象
 * @param {object} userObj 用户设置
 * @param {String} fileEnd 文件后缀
 * @return: authorRange 原修改人行
 * @return: authorText  当前修改人
 * @return: lastTimeRange  原最后编辑时间
 * @return: lastTimeText 当前编辑时间
 * @return: hasAnnotation 是否自动添加头部注释
 */
function saveReplaceTime(document, config, fileEnd) {
  const userObj = config.customMade;
  let authorRange, authorText, lastTimeRange, lastTimeText;
  let changeFont = new languageOutput.changeFont(fileEnd);
  let annotationStarts = changeFont.star();
  let totalLine = document.lineCount - 1; // 总行数
  let enter = false;
  let hasAnnotation = false; // 默认没有
  const fsPath =  util.fsPathFn(document.fileName)
  let colon = config.configObj.colonObj[fsPath] // 冒号
  if(colon === undefined){
    colon = config.configObj.colon
  }
  // 有没有更改特殊变量
  const checkHasAnnotation = (name, line) => {
    let userSetName = config.configObj.specialOptions[name];
    if (userSetName) {
      if (line.indexOf(`${userSetName}${colon}`) === -1) {
        // 没有检测用户自己更改的 再检测特殊变量
        return line.indexOf(`${name}${colon}`) !== -1;
      } else {
        // 检测用户自己更改的
        return true;
      }
    } else {
      // 检测特殊变量
      return line.indexOf(`${name}${colon}`) !== -1;
    }
  };

  for (let i = 0; i < 15; i++) {
    // 只遍历前15行没有文件头部注释内容即退出
    let linetAt = document.lineAt(i); // 获取每行内容
    let lineNoTrim = linetAt.text; // line 
    let line = linetAt.text.trim();
    if (!enter) {
      // 判断进入注释
      if (annotationStarts === line || annotationStarts === lineNoTrim) {
        enter = true;
      }
    } else {
      let range = linetAt.range;
      if (checkHasAnnotation('LastEditors', line)) {
        //表示是修改人
        hasAnnotation = true;
        authorRange = range;
        let LastEditors = userObj.LastEditors || 'Please set LastEditors';
        authorText = changeFont.LastEditorsStr(LastEditors);
      } else if (checkHasAnnotation('LastEditTime', line)) {
        //最后修改时间
        hasAnnotation = true;
        lastTimeRange = range;
        lastTimeText = changeFont.lastTimeStr();
      } else if (checkHasAnnotation('Date', line)) {
        hasAnnotation = true;
      }
    }
    if (totalLine === i) break; // 行数不够则退出循环
  }
  return [authorRange, authorText, lastTimeRange, lastTimeText, hasAnnotation];
}

/**
 * @description: 取出文件后缀
 * @param {String} fsPath 文件路径
 * @param {Object} config 用户设置
 * @return: [生成注释的行数,注释之前添加的内容]
 */
const editLineFn = (fsPath, config) => {
  // 切割文件路径 获取文件后缀
  const pathArr = fsPath.split('/');
  const fileName = pathArr[pathArr.length - 1];
  const fileNameArr = fileName.split('.');
  const fileEnd = fileNameArr[fileNameArr.length -1]; // 文件后缀
  const headInsertLineObj = config.configObj.headInsertLine;
  let lineNum = 0;
  if (headInsertLineObj[fileEnd]) {
    lineNum = headInsertLineObj[fileEnd] - 1;
  }
  // 是否设置在注释之前添加内容
  let isSetAdd = config.configObj.beforeAnnotation[fileEnd];
  let isAfterAdd = config.configObj.afterAnnotation[fileEnd];
  return [lineNum, isSetAdd, isAfterAdd];
};
/**
 * 更改字段，不改变他们的顺序
 * @Created_time: 2019-05-07 19:36:20
 * @return {Object} 更换字段后的对象 
 */
const changePrototypeNameFn = (data, config) => {
  let keysArr = Object.keys(data);
  let specialOptions = config.configObj.specialOptions; // 时间字段重命名配置
  let objData = {};
  let specialArr = ['Date', 'LastEditTime', 'LastEditors', 'Description']
  keysArr.forEach((item) => {
    // 特殊字段 且 有设置特殊字段
    if (specialArr.includes(item) && specialOptions[item]) {
      objData[specialOptions[item]] = data[item]
    } else if (item === 'custom_string_obkoro1') {
      // 更改用户自定义输出字段 后期需要切割它
      objData.symbol_custom_string_obkoro1 = data[item]
    } else {
      objData[item] = data[item]
    }
  })
  return objData
}

/**
 * @description: 处理生成的模板 比如添加信息，删除信息等。
 * @param {Object} beforehand 模板和预处理的参数
 * {string} tpl 模板
 * {Boolean} beforeAnnotation 是否在模板之前添加内容
 * {Boolean} afterAnnotation 是否在模板之后添加内容
 * @return: {String} tpl
 * @Created_time: 2019-05-14 14:25:26
 */
const handleTplFn = (beforehand) => {
  let res = beforehand.tpl
  // 切割用户自定义输出字段的属性名
  let sinceOut = res.indexOf('symbol_custom_string_obkoro1');
  if (sinceOut !== -1) {
    res = res.replace('symbol_custom_string_obkoro1: ', '')
  }

  if (beforehand.beforeAnnotation) {
    res = `${beforehand.beforeAnnotation}\n${res}`;
  }
  if (beforehand.afterAnnotation) {
    res = `${res}\n${beforehand.afterAnnotation}`;
  }
  return res
}

// 自动添加是否匹配黑名单
const isMatchProhibit = (fsPath, config) => {
  let match = false;
  let prohibit = config.configObj.prohibitAutoAdd
  let fsName = util.fsPathFn(fsPath)
  if (prohibit && prohibit.length > 0) {
    match = prohibit.includes(fsName)
  }
  return match
}

/**
 * @description: 移动光标到description所在行 移动视图到顶部
 * @param {String} tpl 最终要生成的模板
 * @Created_time: 2019-06-18 14:28:13
 */
const moveCursor = (tpl) => {
  const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
  if (config.configObj.moveCursor) {
    const editor = vscode.editor || vscode.window.activeTextEditor; // 每次运行选中文件
    const specialOptions = config.configObj.specialOptions; // 时间字段重命名配置
    const DescriptionName = specialOptions.Description
      ? specialOptions.Description
      : 'Description';
    // 注释总行数 最后多一行注释开头 一行注释结尾 最后一行换行
    const strLine = tpl.split(/\r\n|\r|\n/).length
    // 文档是从0开始 行数从1开始 要减去1
    let descriptionLineNum;
    for (let i = 0; i < strLine; i++) {
      let line = editor.document.lineAt(i);
      let lineNoTrim = line.text; // line 
      if (lineNoTrim.indexOf(`${DescriptionName}:`) !== -1) {
        descriptionLineNum = i
        break
      }
      if (editor.document.lineCount - 1 === i) break // 总行数
    }
    // 没有Description 则不移动视图
    if (descriptionLineNum === undefined) {
      return
    }
    // 移动光标到指定行数
    const position = editor.selection.active;
    var newPosition = position.with(descriptionLineNum, 10000);
    editor.selection = new vscode.Selection(newPosition, newPosition);
    // 移动视图到顶部
    vscode.commands.executeCommand('editorScroll', {
      to: 'up',
      value: 10000,
    });
  }
}

module.exports = {
  userSet,
  lineSpaceFn,
  saveReplaceTime,
  editLineFn,
  changePrototypeNameFn,
  handleTplFn,
  isMatchProhibit,
  moveCursor
};
