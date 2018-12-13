/*
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-11-08 12:58:51
 * @LastEditors: OBKoro1
 * @LastEditTime: 2018-12-13 15:49:02
 * @Description: 不同语言的逻辑
 */
const languageDifferent = require('./languageDifferent');

// 头部注释中间部分生成
const middleTpl = (data, fileEnd) => {
  let str = '';

  Object.keys(data).forEach(key => {
    const obj = {
      fileEnd,
      type: 'topMiddle',
      key
    };
    str = str + languageDifferent.tplJudge(obj);
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
  const obj = {
    fileEnd,
    type: 'topHeadEnd',
    str
  };
  return languageDifferent.tplJudge(obj);
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
    const obj = {
      fileEnd: this.fileEnd,
      str: this.str,
      key
    };
    // 注释是参数的话 多加一个参数的属性
    if (key === 'param') {
      obj.type = 'fnMiddle_param';
      obj.typeVal = '{type}';
    } else {
      obj.type = 'fnMiddle_key';
    }
    return languageDifferent.tplJudge(obj);
  }
  mergeStr() {
    const obj = {
      fileEnd: this.fileEnd,
      frontStr: this.frontStr,
      strContent: this.strContent,
      str: this.str
    };
    if (this.nextLine === undefined) {
      // 当前行不为空
      obj.type = 'topHeadEnd_nextLineNo';
    } else {
      // 当前行为空
      obj.type = 'topHeadEnd_nextLineYes';
    }
    return languageDifferent.tplJudge(obj);
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
    const obj = {
      fileEnd: this.fileEnd,
      type: 'annotationStarts'
    };
    return languageDifferent.tplJudge(obj);
  }
  // 最后编辑人
  LastEditorsStr(LastEditors) {
    const obj = {
      fileEnd: this.fileEnd,
      type: 'LastEditorsStr',
      LastEditors
    };
    return languageDifferent.tplJudge(obj);
  }
  // 最后编辑时间
  lastTimeStr() {
    const obj = {
      fileEnd: this.fileEnd,
      type: 'lastTimeStr'
    };
    return languageDifferent.tplJudge(obj);
  }
}

module.exports = {
  headNotes,
  functionTplStr,
  changeFont
};
