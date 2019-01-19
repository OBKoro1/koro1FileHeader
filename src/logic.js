/*
 * @Description: 逻辑输出
 * @Author: OBKoro1
 * @Date: 2018-10-31 16:22:55
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-01-19 16:14:02
 */
const languageOutput = require('./languageOutput');

/**
 * @description: 头部注释根据用户设置返回模板数据对象
 * @param {Object} userObj 用户设置
 * @param {String} time 文件创建时间
 * @return: 返回生成模板的数据对象
 */
const userSet = (userObj, time) => {
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
    data.LastEditTime = new Date().format();
  }
  return data;
};

/**
 * @description: 函数注释前面的长度
 * @param {Object} 当前激活文件
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
 * @return:
 */
function saveReplaceTime(document, userObj, fileEnd) {
  let authorRange, authorText, lastTimeRange, lastTimeText;
  let changeFont = new languageOutput.changeFont(fileEnd);
  let annotationStarts = changeFont.star();
  let totalLine = document.lineCount - 1; // 总行数
  let enter = false;
  let hasAnnotation = false; // 默认没有
  for (let i = 0; i < 15; i++) {
    // 只遍历前20行没有文件头部注释内容即退出
    let linetAt = document.lineAt(i); // 获取每行内容
    let line = linetAt.text.trim();
    if (!enter) {
      // 判断进入注释
      if (annotationStarts === line) {
        enter = true;
      }
    } else {
      let range = linetAt.range;
      if (line.indexOf('@LastEditors:') > -1) {
        //表示是修改人
        hasAnnotation = true;
        authorRange = range;
        let LastEditors = userObj.LastEditors || 'Please set LastEditors';
        authorText = changeFont.LastEditorsStr(LastEditors);
      } else if (line.indexOf('@LastEditTime:') > -1) {
        //最后修改时间
        hasAnnotation = true;
        lastTimeRange = range;
        lastTimeText = changeFont.lastTimeStr();
      } else if (line.indexOf('Date:') > -1) {
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
 * @return: 生成注释的行数
 */
const editLineFn = (fsPath, config) => {
  // 切割文件路径 获取文件后缀
  const pathArr = fsPath.split('/');
  const fileName = pathArr[pathArr.length - 1];
  const fileNameArr = fileName.split('.');
  const fileEnd = fileNameArr[1]; // 文件后缀
  const headInsertLineObj = config.configObj.headInsertLine;
  if (headInsertLineObj[fileEnd]) {
    return headInsertLineObj[fileEnd] - 1;
  }
  return 0;
};

module.exports = {
  userSet,
  lineSpaceFn,
  saveReplaceTime,
  editLineFn
};
