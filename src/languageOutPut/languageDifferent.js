/*
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-12-11 21:29:11
 * @LastAuthor: OBKoro1
 * @lastTime: 2019-08-08 16:31:43
 * @Description: 通过fileEnd使用正则匹配各个语言已调好的注释符号以及用户自定义注释符号
 */

const util = require('../utile/util')
const global = require('../utile/CONST')
const customLanguage = '自定义语言注释'

/**
 * @description: 通过fileEnd使用正则匹配各个语言已调好的注释符号
 * @param {String} obj.fileEnd 语言后缀
 * @param {String} obj.type 匹配成功后，输出哪个属性下的字符串
 * @param {String} else 逻辑下需要的参数
 * @return: 不同逻辑下的字符串
 */
function TplJudge (obj) {
  this.initConfig(obj)
  // 匹配用户定义语言符号 在fileEndMatch中如果用户定义了 会返回一个对象
  let res
  if (obj.fileEnd.userLanguage) {
    res = this.userLanguageSetFn(obj, customLanguage)
  } else if (obj.fileEnd !== global.NoMatchLanguage) {
    // 匹配插件的符号
    res = this[obj.type]()
  } else if (this.annotationSymbol.use) {
    // 调用用户设置的默认注释符号
    res = this.userLanguageSetFn(obj)
  } else {
    // 插件默认设置
    obj.fileEnd = 'javascript'
    return new TplJudge(obj)
  }
  this.res = res
}

/**
 * 防止用户在使用期间更改配置导致的没有同步的问题
 * 在每次运行的时候都重新读取一下配置就不会出现这个问题了。
 */
TplJudge.prototype = {
  fsPathEndFn: function (fsPath) {
    let special
    const pathArr = fsPath.split('/')
    const fileName = pathArr[pathArr.length - 1] // 取/最后一位
    Object.keys(this.config.configObj.language).forEach((item) => {
      if (item.indexOf('.') !== -1) {
        // 限制key包含. fileName包含key fileName与key不等(变量.后缀.后缀)
        if (fileName.indexOf(item) !== -1 && fileName !== item) {
          special = item
        }
      }
    })
    if (special) {
      return special
    } else {
      const fileName = pathArr[pathArr.length - 1] // 取/最后一位
      const fileNameArr = fileName.split('.')
      return fileNameArr[fileNameArr.length - 1] // 取.最后一位
    }
  },
  initConfig: function (obj = {}) {
    this.obj = obj
    this.setSymbol(obj.fileEnd)
    this.vscode = require('vscode')
    const editor = this.vscode.editor || this.vscode.window.activeTextEditor // 每次运行选中文件
    this.config = this.vscode.workspace.getConfiguration('fileheader') // 配置项默认值
    this.annotationSymbol = this.config.configObj.annotationStr // 默认注释配置
    this.languageObj = this.config.configObj.language // 自定义语言项
    this.fsPath = this.fsPathEndFn(editor.document.uri.fsPath)
    // LastEditTime、LastEditors 特殊字段用户有没有设置
    const specialOptions = this.config.configObj.specialOptions
    this.LastEditTimeName = specialOptions.LastEditTime
      ? specialOptions.LastEditTime
      : 'LastEditTime'
    this.LastEditTimeName = util.spaceStringFn(
      this.LastEditTimeName,
      this.config.configObj.wideNum
    )
    this.LastEditorsName = specialOptions.LastEditors
      ? specialOptions.LastEditors
      : 'LastEditors'
    this.LastEditorsName = util.spaceStringFn(
      this.LastEditorsName,
      this.config.configObj.wideNum
    )
    this.filePathName = specialOptions.LastEditors
      ? specialOptions.LastEditors
      : 'FilePath'
    this.filePathName = util.spaceStringFn(
      this.filePathName,
      this.config.configObj.wideNum
    )
  },
  // 设置@符号和冒号
  setSymbol (fileEnd = '') {
    const options = {
      symbolName: 'atSymbol',
      fileEnd: fileEnd || '',
      getValueType: 'arr'
    }
    this.atSymbol = util.getColon(options)
    options.symbolName = 'colon'
    this.colon = util.getColon(options)
  },
  /**
   * @description: 用户自定义语言注释符号和未设置下的默认注释符号
   * @param {String} obj.type 匹配成功后，输出哪个属性下的字符串
   * @param {String} else 逻辑下需要的参数
   * @param {Boolean} isDefault 默认的注释形式和自定义的语言注释形式
   */
  userLanguageSetFn: function (obj, type) {
    if (type === customLanguage) {
      this.annotationSymbol = this.languageObj[obj.fileEnd.fileEnd]
      // 函数注释符号
      const functionAnnotationSymbol = obj.isFunctionAnnotation && this.annotationSymbol.functionSymbol
      if (functionAnnotationSymbol) {
        this.annotationSymbol = this.annotationSymbol.functionSymbol
      }
    }
    const userObj = {
      topMiddle: `${this.annotationSymbol.middle}${obj.key}${this.colon[0]}${obj.value}\r\n`,
      topHeadEnd: `${this.annotationSymbol.head}\r\n${obj.str}${this.annotationSymbol.end}\r\n`,
      fnMiddle_param: `${obj.str}${this.annotationSymbol.middle}${obj.key} ${obj.typeVal}\r\n`,
      fnMiddle_key: `${obj.str}${this.annotationSymbol.middle}${obj.key}${this.colon[1]}${obj.value}\r\n`,
      topHeadEnd_nextLineNo: `${obj.str}${this.annotationSymbol.head}\r\n${obj.strContent}${obj.str}${this.annotationSymbol.end}\r\n`,
      topHeadEnd_nextLineYes: `${obj.str}${this.annotationSymbol.head}\r\n${obj.strContent}${obj.str}${this.annotationSymbol.end}`,
      annotationStarts: `${this.annotationSymbol.head}`,
      // 没有头部和尾部的情况 使用中间
      annotationStartsNoHead: `${this.annotationSymbol.middle}`,
      lastTimeStr: `${this.annotationSymbol.middle}${this.LastEditTimeName}${
        this.colon[0]
      }${new Date().format()}`,
      LastEditorsStr: `${this.annotationSymbol.middle}${this.LastEditorsName}${this.colon[0]}${obj.LastEditors}`
    }
    return userObj[obj.type]
  },
  // 头部注释 头尾链接
  topHeadEnd: function () {
    const topHeadEndObj = {
      javascript: `/*\r\n${this.obj.str} */\r\n`,
      lua: `--[[\r\n${this.obj.str}--]]\r\n`,
      python: `'''\r\n${this.obj.str}'''\r\n`,
      html: `<!--\r\n${this.obj.str}-->\r\n`,
      vb: `'\r\n${this.obj.str}'\r\n`,
      shellscript: `###\r\n${this.obj.str}### \r\n`
    }
    return topHeadEndObj[this.obj.fileEnd]
  },
  // 头部注释 中间部分
  topMiddle: function () {
    const topMiddleObj = {
      '/^javascript$|^html$/': ` * ${this.atSymbol[0]}${this.obj.key}${this.colon[0]}${this.obj.value}\r\n`,
      '/^python|^lua$/': `${this.obj.key}${this.colon[0]}${this.obj.value}\r\n`,
      '/^vb$/': `' ${this.atSymbol[0]}${this.obj.key}${this.colon[0]}${this.obj.value}\r\n`,
      '/^shellscript$/': ` # ${this.atSymbol[0]}${this.obj.key}${this.colon[0]}${this.obj.value}\r\n`
    }
    return util.matchProperty(topMiddleObj, this.obj.fileEnd)
  },
  // 头部注释最后编辑人
  LastEditorsStr: function () {
    if (this.config.configObj.wideSame) {
      this.LastEditorsName = util.spaceStringFn(
        this.LastEditorsName,
        this.config.configObj.wideNum
      )
    }
    const LastEditorsStrObj = {
      '/^javascript$|^html$/': ` * ${this.atSymbol[0]}${this.LastEditorsName}${this.colon[0]}${this.obj.LastEditors}`,
      '/^python|^lua$/': `${this.LastEditorsName}${this.colon[0]}${this.obj.LastEditors}`,
      '/^vb$/': `' ${this.atSymbol[0]}${this.LastEditorsName}${this.colon[0]}${this.obj.LastEditors}`,
      '/^shellscript$/': ` # ${this.atSymbol[0]}${this.LastEditorsName}${this.colon[0]}${this.obj.LastEditors}`
    }
    // 切换
    return util.matchProperty(LastEditorsStrObj, this.obj.fileEnd)
  },
  // 头部注释最后编辑时间
  lastTimeStr: function () {
    if (this.config.configObj.wideSame) {
      this.LastEditTimeName = util.spaceStringFn(
        this.LastEditTimeName,
        this.config.configObj.wideNum
      )
    }
    const lastTimeStrObj = {
      '/^javascript$|^html$/': ` * ${this.atSymbol[0]}${this.LastEditTimeName}${
        this.colon[0]
      }${new Date().format()}`,
      '/^python|^lua$/': `${this.LastEditTimeName}${
        this.colon[0]
      }${new Date().format()}`,
      '/^vb$/': `' ${this.atSymbol[0]}${this.LastEditTimeName}${
        this.colon[0]
      }${new Date().format()}`,
      '/^shellscript$/': ` # ${this.atSymbol[0]}${this.LastEditTimeName}${
        this.colon[0]
      }${new Date().format()}`
    }
    return util.matchProperty(lastTimeStrObj, this.obj.fileEnd)
  },
  topHeadEnd_nextLineNo: function () {
    return this.topHeadEnd_nextLineYes(true)
  },
  // 函数注释处理头尾字符串
  topHeadEnd_nextLineYes: function (nextLine = false) {
    const TopHeadEndNextLineNoObj = {
      javascript: `${this.obj.str}/**\r\n ${this.obj.strContent}${this.obj.str}*/`,
      python: `${this.obj.str}'''\r\n${this.obj.strContent}${this.obj.str}'''`,
      lua: `${this.obj.str}--[[\r\n${this.obj.strContent}${this.obj.str}--]]`,
      html: `${this.obj.str}/**\r\n ${this.obj.strContent}${this.obj.str}*/`,
      vb: `${this.obj.str}'\r\n${this.obj.strContent}${this.obj.str}'`,
      shellscript: `${this.obj.str}###\r\n${this.obj.strContent}${this.obj.str}###`
    }
    let res = TopHeadEndNextLineNoObj[this.obj.fileEnd]
    // 当前行不为空 下一行换行
    if (nextLine) {
      res += '\r\n'
    }
    return res
  },
  // 函数注释中间写死的key
  fnMiddle_key: function () {
    const FnMiddleKeyObj = {
      '/^javascript$|^html$/': `${this.obj.str}* ${this.atSymbol[1]}${this.obj.key}${this.colon[1]}${this.obj.value}\r\n `,
      '/^python|^lua$/': `${this.obj.str}${this.atSymbol[1]}${this.obj.key}${this.colon[1]}${this.obj.value}\r\n`,
      '/^vb$/': `${this.obj.str}' ${this.atSymbol[1]}${this.obj.key}${this.colon[1]}${this.obj.value}\r\n`,
      '/^shellscript$/': `${this.obj.str} # ${this.atSymbol[1]}${this.obj.key}${this.colon[1]}${this.obj.value}\r\n`
    }
    return util.matchProperty(FnMiddleKeyObj, this.obj.fileEnd)
  },

  // 函数注释参数
  fnMiddle_param: function () {
    const FnMiddleParamObj = {
      '/^javascript$|^html$/': `${this.obj.str}* ${this.atSymbol[1]}${this.obj.key} ${this.obj.typeVal}\r\n `,
      '/^python|^lua$/': `${this.obj.str}${this.atSymbol[1]}${this.obj.key} ${this.obj.typeVal}\r\n`,
      '/^vb$/': `${this.obj.str}' ${this.atSymbol[1]}${this.obj.key} ${this.obj.typeVal}\r\n`,
      '/^shellscript$/': `${this.obj.str} # ${this.atSymbol[1]}${this.obj.key} ${this.obj.typeVal}\r\n`
    }
    return util.matchProperty(FnMiddleParamObj, this.obj.fileEnd)
  },

  // 注释开头：用以判断是否进入注释
  // TODO: 加新语言需要改CONST.js
  annotationStarts: function () {
    const annotationStartsObj = {
      javascript: '/*',
      python: '\'\'\'',
      lua: '--[[',
      html: '<!--',
      vb: '\'',
      shellscript: '###'
    }
    return annotationStartsObj[this.obj.fileEnd]
  }
}

module.exports = TplJudge
