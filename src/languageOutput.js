/*
 * @Description: 不同语言的输出
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-11-08 12:58:51
 * @LastEditors: OBKoro1
 * @LastEditTime: 2018-11-16 14:49:59
 */

// 头部注释中间部分生成
const middleTpl = (data, fileEnd) => {
  let str = '';
  Object.keys(data).forEach(key => {
    const obj = {
      python: `@${key}: &${key}&\r\n`,
      html: `@${key}: &${key}&\r\n`,
      vb: `' @${key}: &${key}&\r\n`,
      default: `* @${key}: &${key}&\r\n `
    };
    str += obj[fileEnd] || obj['default'];
  });
  return str;
};

/**
 * @description: 文件头部注释生成
 * @param {Object} data 模板数据对象
 * @param {String} fileEnd 文件采用语言
 * @return: 字符串
 */
const headNotes = (data, fileEnd) => {
  let str = middleTpl(data, fileEnd);
  // 头部 中间模板 尾部合并
  const headEnd = {
    python: `'''\r\n${str}'''\r\n`,
    html: `<!--\r\n${str}-->\r\n`,
    vb: `'\r\n${str}'\r\n`,
    default: `/*\r\n ${str}*/\r\n`
  };
  return headEnd[fileEnd] || headEnd['default'];
};

class functionTplStr {
  /**
   * @description: 函数注释模板生成
   * @param {Object} data 模板数据对象
   * @param {String} fileEnd 文件采用语言
   * @param {Number} lineSpace 每行前面的长度
   * @param {String} nextLine 当前行为空 不换行
   * @param {String} frontStr 函数注释第一行的长度
   * @return: 函数注释的模板字符串
   */
  constructor(data, fileEnd, lineSpace, nextLine, frontStr) {
    this.fileEnd = fileEnd;
    this.nextLine = nextLine;
    this.frontStr = frontStr;
    this.str = ''.padStart(lineSpace); // 生成指定长度的字符串
    this.strContent = '';
    this.data = data;
  }
  // 生成函数注释模板
  generate() {
    // 生成中间模板
    Object.keys(this.data).forEach(key => {
      this.strContent += this.paramStr(key);
    });
    return this.mergeStr();
  }

  /**
   * @param {String} key 数据对象的key
   */
  paramStr(key) {
    const type = '{type}';
    const paramObj = {
      python: `${this.str}@${key} ${type} &${key}&\r\n`,
      vb: `${this.str}' ${key} ${type} &${key}&\r\n`,
      default: `${this.str}* @${key} ${type} &${key}&\r\n `
    };
    const keyObj = {
      python: `${this.str}@${key}: &${key}&\r\n`,
      vb: `${this.str}' ${key}: &${key}&\r\n`,
      default: `${this.str}* @${key}: &${key}&\r\n `
    };
    if (key === 'param') {
      return paramObj[this.fileEnd] || paramObj['default'];
    } else {
      return keyObj[this.fileEnd] || keyObj['default'];
    }
  }
  mergeStr() {
    if (this.nextLine === undefined) {
      // 当前行不为空
      return this.nextLineNo();
    } else {
        // 当前行为空
      return this.nextLineYes();
    }
  }
  nextLineNo() {
    const obj = {
      python: `${this.frontStr}'''\r\n${this.strContent}${this.str}'''\r\n${
        this.str
      }`,
      vb: `${this.frontStr}'\r\n${this.strContent}${this.str}'\r\n${this.str}`,
      default: `${this.frontStr}/**\r\n ${this.strContent}${this.str}*/\r\n${
        this.str
      }`
    };
    return obj[this.fileEnd] || obj['default'];
  }
  nextLineYes() {
    const obj = {
      python: `${this.frontStr}'''\r\n${this.strContent}${this.str}'''`,
      vb: `${this.frontStr}'\r\n${this.strContent}${this.str}'`,
      default: `${this.frontStr}/**\r\n ${this.strContent}${this.str}*/`
    };
    return obj[this.fileEnd] || obj['default'];
  }
}

/**
 * @description: 保存触发修改时的需要的字符输出
 * @param {String} fileEnd 文件语言
 */
class changeFont {
  constructor(fileEnd) {
    this.fileEnd = fileEnd;
  }
  // 输出注释开头：用以判断是否进入注释   
  star() {
    const annotationStarts = {
      python: `'''`,
      html: `<!--`,
      vb: `'`,
      default: `/*`
    };
    return annotationStarts[this.fileEnd] || annotationStarts['default'];
  }
  // 最后编辑人   
  LastEditorsStr(LastEditors) {
    const obj = {
      python: `@LastEditors: ${LastEditors}`,
      html: `@LastEditors: ${LastEditors}`,
      vb: `' @LastEditors: ${LastEditors}`,
      default: ` * @LastEditors: ${LastEditors}`
    };
    return obj[this.fileEnd] || obj['default'];
  }
   // 最后编辑时间   
  lastTimeStr() {
    const lastTimeText = {
      python: `@LastEditTime: ${new Date().format('yyyy-MM-dd hh:mm:ss')}`,
      html: `@LastEditTime: ${new Date().format('yyyy-MM-dd hh:mm:ss')}`,
      vb: `' @LastEditTime: ${new Date().format('yyyy-MM-dd hh:mm:ss')}`,
      default: ` * @LastEditTime: ${new Date().format('yyyy-MM-dd hh:mm:ss')}`
    };
    return lastTimeText[this.fileEnd] || lastTimeText['default'];
  }
}

module.exports = {
  headNotes,
  functionTplStr,
  changeFont
};
