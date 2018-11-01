/*
 * @Description: 逻辑输出
 * @Author: OBKoro1
 * @Date: 2018-10-31 16:22:55
 * @LastEditors: OBKoro1
 * @LastEditTime: 2018-11-01 00:03:05
 */

module.exports = {
  userSet,
  fontTplStr,
  lineSpaceFn,
  FnTplStr,
  saveReplaceTime
};

/**
 * @description: 头部注释根据用户设置返回模板数据对象
 * @param {Object} userObj 用户设置
 * @param {String} time 文件创建时间
 * @return: 返回生成模板的数据对象
 */
function userSet(userObj, time) {
  let ddata = {};
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
  if (data.Date !== undefined) {
    // 用户设置了时间选项，文件创建时间
    data.Date = time;
  }
  if (data.LastEditTime !== undefined) {
    // 最后编辑时间为当前时间
    data.LastEditTime = new Date().format('yyyy-MM-dd hh:mm:ss');
  }
  return data;
}

/**
 * @param {Object} data 模板数据对象
 * @param {String} fileEnd 文件后缀
 * @return: 头部注释的模板字符串
 */
function fontTplStr(data, fileEnd) {
  let strContent = '',
    fontTpl;
  Object.keys(data).forEach(key => {
    if (fileEnd === 'python') {
      // python '''形式
      strContent += `@${key}: &${key}&\r\n`;
    } else {
      strContent += `* @${key}: &${key}&\r\n `;
    }
  });
  fontTpl = `/*\r\n ${strContent}*/\r\n`;
  if (fileEnd === 'python') {
    fontTpl = `'''\r\n${strContent}'''\r\n`;
  }
  return fontTpl;
}

/**
 * @description: 函数注释前面的长度
 * @param {Object} 当前激活文件
 * @return: lineSpace：前面的长度，frontStr：函数注释第一行的长度，line:当前行(数字)，nextLine 激活行的下一行是否有内容
 */
function lineSpaceFn(editor) {
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
  return [lineSpace, frontStr, line, nextLine];
}

/**
 * @param {Object} data 模板数据对象
 * @param {String} fileEnd 文件后缀
 * @param {Number} lineSpace 每行前面的长度
 * @param {String} nextLine 当前行为空 不换行
 * @param {String} frontStr 函数注释第一行的长度
 * @return: 函数注释的模板字符串
 */
function FnTplStr(data, fileEnd, lineSpace, nextLine, frontStr) {
  let strContent = '';
  const str = ''.padStart(lineSpace); // 生成指定长度的字符串
  Object.keys(data).forEach(key => {
    if (key === 'param') {
      // 类型
      let type = '{type}';
      if (fileEnd === 'python') {
        // 转成'''并且前面取消一个空格
        strContent += `${str}@${key} ${type} &${key}&\r\n`;
      } else {
        strContent += `${str}* @${key} ${type} &${key}&\r\n `;
      }
    } else {
      if (fileEnd === 'python') {
        // 转成'''并且前面取消一个空格
        strContent += `${str}@${key}: &${key}&\r\n`;
      } else {
        strContent += `${str}* @${key}: &${key}&\r\n `;
      }
    }
  });
  // 当前行为空 不换行
  if (nextLine === undefined) {
    fontTpl = `${frontStr}/**\r\n ${strContent}${str}*/\r\n${str}`;
    if (fileEnd === 'python') {
      // 转成'''并且前面取消一个空格
      fontTpl = `${frontStr}'''\r\n${strContent}${str}'''\r\n${str}`;
    }
  } else {
    fontTpl = `${frontStr}/**\r\n ${strContent}${str}*/`;
    if (fileEnd === 'python') {
      // 转成'''并且前面取消一个空格
      fontTpl = `${frontStr}'''\r\n${strContent}${str}'''`;
    }
  }
  return fontTpl;
}

/**
 * @description: 保存时触发修改
 * @param {object} document 文档对象
 * @param {object} userObj 用户设置
 * @param {String} fileEnd 文件后缀
 * @return: authorRange 原修改人行
 * @return: authorText  当前修改人
 * @return: lastTimeRange  原最后编辑时间
 * @return: lastTimeText 当前编辑时间
 */
function saveReplaceTime(document, userObj, fileEnd) {
  let authorRange, authorText, lastTimeRange, lastTimeText;
  let LastEditors = userObj.LastEditors || 'Please set LastEditors';

  let annotationStarts = '/*';
  let annotationEnd = '*/';
  // 不同语言兼容
  if (fileEnd === 'python') {
    annotationStarts = `'''`;
    annotationEnd = `'''`;
  }
  let comment = false;
  for (let i = 0; i < 24; i++) {
    // 前24行没有文件头部注释内容即退出
    let linetAt = document.lineAt(i); // 获取每行内容
    let line = linetAt.text.trim();
    if (line.startsWith(annotationStarts)) {
      comment = true; // 进入注释
    } else if (comment) {
      if (line.endsWith(annotationEnd)) {
        comment = false; // 结束注释
      }
      let range = linetAt.range;
      if (line.indexOf('@LastEditors') > -1) {
        //表示是修改人
        authorRange = range;
        let LastEditors = userObj.LastEditors || 'Please set LastEditors';
        authorText = ' * @LastEditors: ' + LastEditors;
        if (fileEnd === 'python') {
          authorText = ' @LastEditors: ' + LastEditors;
        }
      } else if (line.indexOf('@LastEditTime') > -1) {
        //最后修改时间
        lastTimeRange = range;
        lastTimeText =
          ' @LastEditTime: ' + curTime.format('yyyy-MM-dd hh:mm:ss');
        if (fileEnd === 'python') {
          lastTimeText =
            ' @LastEditTime: ' + curTime.format('yyyy-MM-dd hh:mm:ss');
        }
      }
      if (!comment) {
        break; // 结束 退出循环
      }
    }
  }
  return [authorRange, authorText, lastTimeRange, lastTimeText];
}
