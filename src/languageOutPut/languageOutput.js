/*
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-11-08 12:58:51
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2023-01-28 21:15:52
 * @Description: 不同语言的逻辑
 */
const LanguageDifferent = require('./languageDifferent')
const vscode = require('vscode')
const handleError = require('../logic/handleError')
const global = require('../utile/CONST')
const util = require('../utile/util')
const logicUtil = require('../utile/logicUtil')

// 头部注释中间部分生成
const middleTpl = (data, fileEnd, config) => {
  let str = ''
  Object.keys(data).forEach((key) => {
    const obj = {
      fileEnd,
      type: 'topMiddle',
      key,
      value: newlineAddAnnotationFn(data[key], fileEnd, config)
    }
    const TplJudge = new LanguageDifferent(obj)
    str = str + TplJudge.res
  })
  return str
}

/**
 * @description: 文件头部注释生成
 * @param {Object} data 模板数据对象
 * @param {String} fileEnd 文件采用语言
 * @return: 字符串
 */
const headNotes = (data, fileEnd, config) => {
  try {
    const str = middleTpl(data, fileEnd, config)
    if (logicUtil.noLinkHeadEnd(fileEnd, 'head')) return str
    // 头部 中间模板 尾部合并
    const obj = {
      fileEnd,
      type: 'topHeadEnd',
      str
    }
    return new LanguageDifferent(obj).res
  } catch (err) {
    handleError.showErrorMessage('fileHeader: headerAnnotation', err)
  }
}

class FunctionTplStr {
  /**
   * @description: 函数注释模板生成
   * @param {Object} data 模板数据对象
   * @param {String} fileEnd 文件采用语言
   * @param {Number} lineSpace 每行前面的长度
   * @param {String} nextLine 当前行为空 不换行
   * @return: 函数注释的模板字符串
   */
  constructor (data, fileEnd, lineSpace, nextLine) {
    this.config = vscode.workspace.getConfiguration('fileheader')
    this.fileEnd = fileEnd
    this.nextLine = nextLine
    // 加上用户设置的长度
    const functionBlankSpace = logicUtil.getLanguageOrFileSetting({
      optionsName: 'functionBlankSpaceAll',
      globalSetting: 'functionBlankSpace',
      defaultValue: 0
    })
    lineSpace = lineSpace + functionBlankSpace
    this.str = ''.padStart(lineSpace) // 函数注释每行前面的空格
    this.strContent = '' // 中间模板部分的字符
    this.data = data
    this.noMatch = false
  }

  // 生成函数注释模板
  generate () {
    try {
      // 生成中间模板
      Object.keys(this.data).forEach((key) => {
        this.strContent += this.paramStr(key)
      })
      if (logicUtil.noLinkHeadEnd(this.fileEnd, 'function')) {
        this.tpl = this.strContent
      } else {
        this.tpl = this.mergeStr()
      }
      return util.replaceSymbolStr(this.tpl, this.fileEnd, 'fn')
    } catch (err) {
      handleError.showErrorMessage('fileHeader: headerAnnotation', err)
    }
  }

  /**
   * @param {String} key 数据对象的key
   */
  paramStr (key) {
    const obj = {
      isFunctionAnnotation: true, // 函数注释
      fileEnd: this.fileEnd,
      str: this.str,
      key,
      value: this.data[key]
    }
    obj.type = 'fnMiddle_key'
    if (key.startsWith('param') || key.startsWith('return')) {
      return this.handleParamReturn(obj, key)
    }
    return new LanguageDifferent(obj).res
  }

  /**
   * @description: 参数和返回值处理
   * @return {string} res
   */
  handleParamReturn (obj, key) {
    const specialParam = logicUtil.getSpecialOptionName(global.SPECIAL_PARAM, true)
    const specialReturn = logicUtil.getSpecialOptionName(global.SPECIAL_RETURN, true)
    if (specialParam && key.startsWith('param')) {
      obj.key = util.spaceStringFn(specialParam, this.config.configObj.functionWideNum)
    } else if (specialReturn && key.startsWith('return')) {
      obj.key = util.spaceStringFn(specialReturn, this.config.configObj.functionWideNum)
    }
    obj.type = 'fnMiddle_param'
    obj.typeVal = this.getTypeVal()
    const NoMatchParams = this.config.configObj.NoMatchParams
    if (key.startsWith('param')) {
      if (!Array.isArray(this.data[key])) {
        // 没匹配到函数参数
        this.noMatch = true
        // 没匹配到函数参数 param返回空字符串
        if (NoMatchParams === 'no show param') {
          return ''
        }
      }
    }

    // 没匹配到函数参数 return 返回空字符串
    if (NoMatchParams === 'no show param and return' && this.noMatch) {
      return ''
    }
    return this.paramsHandle(obj, key)
  }

  // 拼接type和param参数
  getTypeVal (item = {}) {
    const typeVal = this.getTodoType(item)

    // type 和 param 都不存在
    if (item.type === undefined && item.param === undefined) {
      return typeVal
    }

    // 配置不要类型捕获
    let res = ''
    if (this.config.configObj.functionParamsShape === 'no type') {
      // return 没有param
      if (item.param === undefined) {
        return ''
      }
      res = `${item.param}`
    } else {
      const typeParamOrder = this.config.configObj.typeParamOrder
      if (typeParamOrder === 'type param') {
        res = `${typeVal} ${item.param}`
      } else if (typeParamOrder === 'param type') {
        res = `${item.param} ${typeVal}`
      } else if (typeParamOrder === 'param') {
        res = `${item.param}`
      }
    }

    // 在type param 后面增加字符串 可能是冒号，方便输入参数描述
    const functionParamAddStr = this.config.configObj.functionParamAddStr
    if (functionParamAddStr) {
      return `${res}${functionParamAddStr}`
    }
    return res
  }

  // 合成参数
  paramsHandle (obj, key) {
    const paramArr = this.data[key]
    if (Array.isArray(paramArr)) {
      let params = ''
      paramArr.forEach((item) => {
        obj.typeVal = this.getTypeVal(item)
        const str = new LanguageDifferent(obj).res
        params += str
      })
      return params
    }
    return new LanguageDifferent(obj).res
  }

  // 函数注释处理头尾字符串
  mergeStr () {
    const obj = {
      isFunctionAnnotation: true, // 函数注释
      fileEnd: this.fileEnd,
      strContent: this.strContent,
      str: this.str
    }
    if (this.nextLine === undefined) {
      // 当前行不为空
      obj.type = 'topHeadEnd_nextLineNo'
    } else {
      // 当前行为空
      obj.type = 'topHeadEnd_nextLineYes'
    }
    return new LanguageDifferent(obj).res
  }

  // 获取注释type [] [*] {item.type}
  getTodoType (item) {
    let functionParamsShape = this.config.configObj.functionParamsShape
    // 不要方括号
    if (functionParamsShape === 'no bracket') {
      functionParamsShape = ['', '']
    } else if (functionParamsShape === 'normal') {
      functionParamsShape = ['{', '}']
    }
    let functionTypeSymbol = item.type
    // 当没有匹配到type时的默认type 设置type的默认值
    if (item.type === undefined || item.type === '*') {
      functionTypeSymbol = this.config.configObj.functionTypeSymbol
    }
    let typeVal = `${functionParamsShape[0]}${functionTypeSymbol}${functionParamsShape[1]}`
    // 匹配到param 但是不需要param时 只显示type 比如: [*] 改成 []
    if (this.config.configObj.functionTypeSymbol === 'match param no type') {
      typeVal = `${functionParamsShape[0]}${functionParamsShape[1]}`
    }
    return typeVal
  }
}

/**
 * @description: 保存触发修改时的需要的字符输出
 * @param {String} fileEnd 文件语言
 */
class ChangeFont {
  constructor (fileEnd) {
    this.fileEnd = fileEnd
  }

  // 输出注释开头：用以判断是否进入注释
  star () {
    const obj = {
      fileEnd: this.fileEnd,
      type: 'annotationStarts'
    }
    // 没有head 和end 获取中间部分
    if (logicUtil.noLinkHeadEnd(this.fileEnd, 'head')) {
      obj.type = 'annotationStartsNoHead'
    }
    return new LanguageDifferent(obj).res
  }

  // 最后编辑人
  LastEditorsStr (LastEditors) {
    const obj = {
      fileEnd: this.fileEnd,
      type: 'LastEditorsStr',
      LastEditors
    }
    return new LanguageDifferent(obj).res
  }

  // 最后编辑时间
  lastTimeStr () {
    const obj = {
      fileEnd: this.fileEnd,
      type: 'lastTimeStr'
    }
    return new LanguageDifferent(obj).res
  }
}

// 换行符加注释符号
function newlineAddAnnotationFn (value, fileEnd, config) {
  if (config.configObj.switch.newlineAddAnnotation) {
    let middle = null
    // 匹配用户定义语言符号
    if (fileEnd.userLanguage) {
      middle = config.configObj.language[fileEnd.fileEnd].middle
    } else if (fileEnd !== global.NoMatchLanguage) {
      // 匹配插件的符号
      middle = global.annotationSymbol[fileEnd].middle
    } else if (config.configObj.annotationStr.use) {
      // 调用用户设置的默认注释符号
      middle = config.configObj.language.middle
    } else {
      // 插件默认设置
      middle = global.annotationSymbol.javascript.middle
    }
    if (middle !== null) {
      // \n 换行
      // \r 回车
      // \r\n Windows系统里面，每行结尾是“<回车><换行>”
      // eslint-disable-next-line no-useless-escape
      value = value.replace(/\r\n/g, `\obkoro1\obkoro1${middle}`) // 转化为特殊字符 不影响下面的替换
      value = value.replace(/\n/g, `\n${middle}`)
      value = value.replace(/\r/g, `\r${middle}`)
      // eslint-disable-next-line no-useless-escape
      value = value.replace(/\obkoro1\obkoro1/g, '\r\n') // 转化回来
    }
  }
  return value
}

module.exports = {
  headNotes,
  FunctionTplStr,
  ChangeFont,
  middleTpl
}
