/*
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-12-11 21:29:11
 * @LastAuthor: OBKoro1
 * @lastTime: 2019-08-08 16:31:43
 * @Description: 通过fileEnd使用正则匹配各个语言已调好的注释符号以及用户自定义注释符号
 */

/**
 * @description: 通过fileEnd使用正则匹配各个语言已调好的注释符号
 * @param {String} obj.fileEnd 语言后缀
 * @param {String} obj.type 匹配成功后，输出哪个属性下的字符串
 * @param {String} else 逻辑下需要的参数
 * @return: 不同逻辑下的字符串
 */
function tplJudge(obj) {
  this.initConfig(obj);
  // 匹配用户定义语言符号 在fileEndMatch中如果用户定义了 会返回一个对象
  let res;
  if (obj.fileEnd.userLanguage) {
    res = this.userLanguageSetFn(obj, false);
  } else if (obj.fileEnd !== 'default_str') {
    // 匹配插件的符号
    res = this[obj.type]();
  } else if (this.annotationSymbol.use) {
    // 调用用户设置的默认注释符号
    res = this.userLanguageSetFn(obj);
  } else {
    // 插件默认设置
    obj.fileEnd = 'javascript';
    return new tplJudge(obj);
  }
  this.res = res
};

/**
 * 防止用户在使用期间更改配置导致的没有同步的问题
 * 在每次运行的时候都重新读取一下配置就不会出现这个问题了。
 */
tplJudge.prototype = {
  fsPathEndFn: function (fsPath) {
    const pathArr = fsPath.split('/');
    const fileName = pathArr[pathArr.length - 1]; // 取/最后一位
    const fileNameArr = fileName.split('.');
    return fileNameArr[fileNameArr.length - 1]; // 取.最后一位
  },
  initConfig: function (obj) {
    this.obj = obj
    this.vscode = require('vscode');
    const editor = this.vscode.editor || this.vscode.window.activeTextEditor; // 每次运行选中文件
    this.fsPath = this.fsPathEndFn(editor._documentData._uri.fsPath)
    this.config = this.vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
    this.annotationSymbol = this.config.configObj.annotationStr; // 默认注释配置
    this.languageObj = this.config.configObj.language; // 自定义语言项
    this.atSymbol = this.config.configObj.atSymbolObj[this.fsPath]; // @符号
    this.colon = this.config.configObj.colonObj[this.fsPath] // 冒号
    if (this.atSymbol === undefined) {
      this.atSymbol =  this.config.configObj.atSymbol // 默认有
    }
    if (this.colon === undefined) {
      this.colon = this.config.configObj.colon
    }
    // LastEditTime、LastEditors 特殊字段用户有没有设置
    const specialOptions = this.config.configObj.specialOptions;
    this.LastEditTimeName = specialOptions.LastEditTime
      ? specialOptions.LastEditTime
      : 'LastEditTime';
    this.LastEditorsName = specialOptions.LastEditors
      ? specialOptions.LastEditors
      : 'LastEditors';
  },
  /**
   * @description: 用户自定义语言注释符号和未设置下的默认注释符号
   * @param {String} obj.type 匹配成功后，输出哪个属性下的字符串
   * @param {String} else 逻辑下需要的参数
   * @param {Boolean} isDefault 默认的注释形式和自定义的语言注释形式
   */
  userLanguageSetFn: function (obj, isDefault = true) {
    if (!isDefault) {
      // 自定义语言注释
      this.annotationSymbol = this.languageObj[obj.fileEnd.fileEnd];
    }
    const userObj = {
      topMiddle: `${this.annotationSymbol.middle}${obj.key}${this.colon}${obj.value}\r\n`,
      topHeadEnd: `${this.annotationSymbol.head}\r\n${obj.str}${
        this.annotationSymbol.end
        }\r\n`,
      fnMiddle_param: `${obj.str}${this.annotationSymbol.middle}${obj.key} ${
        obj.typeVal
        } ${obj.value}\r\n`,
      fnMiddle_key: `${obj.str}${this.annotationSymbol.middle}${obj.key}${this.colon}${
        obj.value
        }\r\n`,
      topHeadEnd_nextLineNo: `${obj.frontStr}${this.annotationSymbol.head}\r\n${
        obj.strContent
        }${obj.str}${this.annotationSymbol.end}\r\n${obj.str}`,
      topHeadEnd_nextLineYes: `${obj.frontStr}${this.annotationSymbol.head}\r\n${
        obj.strContent
        }${obj.str}${this.annotationSymbol.end}`,
      annotationStarts: `${this.annotationSymbol.head}`,
      lastTimeStr: `${
        this.annotationSymbol.middle
        }${this.LastEditTimeName}${this.colon}${new Date().format()}`,
      LastEditorsStr: `${this.annotationSymbol.middle}${this.LastEditorsName}${this.colon}${
        obj.LastEditors
        }`
    };
    return userObj[obj.type];
  },
  // 头部注释 头尾链接
  topHeadEnd: function () {
    const topHeadEndObj = {
      javascript: `/*\r\n ${this.obj.str}*/\r\n`,
      python: `'''\r\n${this.obj.str}'''\r\n`,
      html: `<!--\r\n ${this.obj.str}-->\r\n`,
      vb: `'\r\n${this.obj.str}'\r\n`,
      shellscript: `### \r\n${this.obj.str}###\r\n`
    }
    return topHeadEndObj[this.obj.fileEnd]
  },
  // 头部注释 中间部分
  topMiddle: function () {
    const topMiddleObj = {
      javascript: `* ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n `,
      python: `${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n`,
      html: `* ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n `,
      vb: `' ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n`,
      shellscript: `# ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n `,
    }
    return topMiddleObj[this.obj.fileEnd]
  },
  // 头部注释最后编辑人
  LastEditorsStr: function () {
    const LastEditorsStrObj = {
      javascript: ` * ${this.atSymbol}${this.LastEditorsName}${this.colon}${this.obj.LastEditors}`,
      python: `${this.atSymbol}${this.LastEditorsName}${this.colon}${this.obj.LastEditors}`,
      html: ` * ${this.atSymbol}${this.LastEditorsName}${this.colon}${this.obj.LastEditors}`,
      vb: `' ${this.atSymbol}${this.LastEditorsName}${this.colon}${this.obj.LastEditors}`,
      shellscript: ` # ${this.atSymbol}${this.LastEditorsName}${this.colon}${this.obj.LastEditors}`
    }
    return LastEditorsStrObj[this.obj.fileEnd]
  },
  // 头部注释最后编辑时间
  lastTimeStr: function () {
    const lastTimeStrObj = {
      javascript: ` * ${this.atSymbol}${this.LastEditTimeName}${this.colon}${new Date().format()}`,
      python: `${this.atSymbol}${this.LastEditTimeName}${this.colon}${new Date().format()}`,
      html: ` * ${this.atSymbol}${this.LastEditTimeName}${this.colon}${new Date().format()}`,
      vb: `' ${this.atSymbol}${this.LastEditTimeName}${this.colon}${new Date().format()}`,
      shellscript: ` # ${this.atSymbol}${this.LastEditTimeName}${this.colon}${new Date().format()}`
    }
    return lastTimeStrObj[this.obj.fileEnd]
  },
  topHeadEnd_nextLineNo: function () {
    return this.topHeadEnd_nextLineYes(true)
  },
  // 函数注释处理头尾字符串
  topHeadEnd_nextLineYes: function (nextLine = false) {
    const topHeadEnd_nextLineNoObj = {
      javascript: `${this.obj.frontStr}/**\r\n ${this.obj.strContent}${
        this.obj.str
        }*/`,
      python: `${this.obj.frontStr}'''\r\n${this.obj.strContent}${
        this.obj.str
        }'''`,
      html: `${this.obj.frontStr}/**\r\n ${this.obj.strContent}${
        this.obj.str
        }*/`,
      vb: `${this.obj.frontStr}'\r\n${this.obj.strContent}${
        this.obj.str
        }'`,
      shellscript: `${this.obj.frontStr}###\r\n${this.obj.strContent}${
        this.obj.str
        }###`
    }
    let res = topHeadEnd_nextLineNoObj[this.obj.fileEnd]
    // 当前行不为空 下一行加空格
    if (nextLine) {
      res += `${this.obj.str}\r\n${this.obj.str}`
    }
    return res
  },
  // 函数注释中间写死的key
  fnMiddle_key: function () {
    const fnMiddle_keyObj = {
      javascript: `${this.obj.str}* ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n `,
      python: `${this.obj.str}${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n`,
      html: `${this.obj.str}* ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n `,
      vb: `${this.obj.str}' ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n`,
      shellscript: `${this.obj.str} # ${this.atSymbol}${this.obj.key}${this.colon}${this.obj.value}\r\n`
    }
    return fnMiddle_keyObj[this.obj.fileEnd]
  },
  // 函数注释参数
  fnMiddle_param: function () {
    const fnMiddle_paramObj = {
      javascript: `${this.obj.str}* ${this.atSymbol}${this.obj.key} ${this.obj.typeVal} ${
        this.obj.value
        }\r\n `,
      python: `${this.obj.str}${this.atSymbol}${this.obj.key} ${this.obj.typeVal} ${this.obj.value}\r\n`,
      html: `${this.obj.str}* ${this.atSymbol}${this.obj.key} ${this.obj.typeVal} ${
        this.obj.value
        }\r\n `,
      vb: `${this.obj.str}' ${this.atSymbol}${this.obj.key} ${this.obj.typeVal} ${this.obj.value}\r\n`,
      shellscript: `${this.obj.str} # ${this.atSymbol}${this.obj.key} ${this.obj.typeVal} ${this.obj.value}\r\n`
    }
    return fnMiddle_paramObj[this.obj.fileEnd]
  },
  // 注释开头：用以判断是否进入注释
  annotationStarts: function () {
    const annotationStartsObj = {
      javascript: `/*`,
      python: `'''`,
      html: `<!--`,
      vb: `'`,
      shellscript: `###`,
    }
    return annotationStartsObj[this.obj.fileEnd]
  }
}

module.exports = {
  tplJudge
};
