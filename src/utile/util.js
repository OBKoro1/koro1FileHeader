/*
 * @Description: 公共函数
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-15 17:35:57
 */

const vscode = require('vscode')
const moment = require('moment')
const path = require('path')
const global = require('./CONST')

/**
 * @description: 节流函数 单位时间内有事件被多次触发则，只生效一次
 * @param {Number} gapTime 节流执行间隔
 * @param {Number} _lastTime 上次执行时间
 * @param {Function} fn 节流的函数
 * @param {Array} arr 节流的函数的参数
 * @return: 上次触发time
 */
const throttle = (gapTime, _lastTime = null, fn, ...arr) => {
  return function () {
    const _nowTime = Date.now()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      // !_lastTime 第一次进入
      fn(...arr) // 当前时间- 上次执行的时间 超过 给定时间间隔 就执行回调
      _lastTime = _nowTime // 触发后，上次执行时间赋值为当前时间
      return _lastTime
    }
    return _lastTime
  }
}

/**
 * @description: 切割文件路径 获取文件后缀
 * @param {String} fsPath 文件路径
 * @return: 文件后缀
 */
const fsPathFn = (fsPath) => {
  const pathArr = fsPath.split('/')
  const fileName = pathArr[pathArr.length - 1] // 获取文件名
  return getFsNameEnd(fileName) // 获取文件后缀
}

/**
 * description: 获取文件后缀，匹配特殊文件
 * param {string} fileName
 * Date: 2020-04-27 16:31:35
 * return: 特殊文件的后缀/文件后缀
 */
const getFsNameEnd = (fileName) => {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项
  const language = config.configObj.language // 自定义语言项
  const fileNameArr = fileName.split('.')
  // 多个.的文件名 从多到少匹配自定义注释
  for (const index of fileNameArr.keys()) {
    const newArr = JSON.parse(JSON.stringify(fileNameArr))
    newArr.splice(0, index + 1)
    const endStr = newArr.join('.')
    if (language[endStr]) {
      return endStr
    }
  }
  return fileNameArr[fileNameArr.length - 1] // 取.最后一位
}

/**
 * 以哪种形式生成注释
 * 项目使用特殊库/规则，导致文件语言跟注释形式不匹配情况
 * 1. 用户定义的语言符号
 * 2. 插件自带的语言符号
 * 3. 无法识别的语言 默认的注释符号
 */
const fileEndMatch = (fileEnd) => {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项
  const editor = vscode.editor || vscode.window.activeTextEditor // 选中文件
  const fsName = fsPathFn(editor.document.uri.fsPath) // 文件后缀
  //  匹配用户自定义语言
  const isMatch = userLanguageFn(
    config,
    fileEnd,
    fsName,
    editor.document.uri.fsPath
  )
  if (isMatch) {
    return isMatch // 匹配到了 返回对象
  }
  // 支持语言
  const obj = {
    '/^java$|^javascript$|^typescript$|^javascriptreact$|^typescriptreact$|^go$|^cpp$|^php$|^rust$|^dart$|^c$/':
      'javascript',
    '/^python$/': 'python',
    '/^lua$/': 'lua',
    '/^vb$/': 'vb',
    '/^vue$|^html$|^markdown$/': 'html',
    '/^shellscript$/': 'shellscript'
  }
  return matchProperty(obj, fileEnd)
}

// 是否使用用户配置
function userLanguageFn (config, fileEnd, fsName, fsPath) {
  // 特殊文件
  const language = config.configObj.language // 自定义语言项
  const isSpecial = specialLanguageFn(fsPath)
  if (isSpecial) {
    return {
      fileEnd: isSpecial,
      userLanguage: true // 使用用户的配置
    }
  }

  // 检查用户是否设自定义语言 匹配语言
  if (language[fileEnd]) {
    return {
      fileEnd,
      userLanguage: true // 使用用户的配置
    }
  } else if (language[fsName]) {
    // 语言没有匹配到 单独匹配一下文件后缀
    return {
      fileEnd: fsName,
      userLanguage: true
    }
  }
  for (const key in language) {
    if (key.indexOf('/') !== -1) {
      const keyArr = key.split('/')
      for (const item of keyArr.values()) {
        if (item === fsName) {
          return {
            fileEnd: key,
            userLanguage: true
          }
        }
      }
    }
  }
  return false
}

// 正则匹配对象中的属性
function matchProperty (matchObj, matchStr) {
  for (const key in matchObj) {
    // 属性即正则
    // eslint-disable-next-line no-eval
    const reg = eval(key)
    const isMatch = reg.test(matchStr)
    if (isMatch) {
      return matchObj[key]
    }
  }
  // 默认注释符号
  return global.NoMatchLanguage
}

// 项目使用特殊库/规则，导致文件语言跟注释形式不匹配 如：变量.blade.php与test.php的注释不同
function specialLanguageFn (fsPath, name = 'language') {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项
  const options = config.configObj[name]
  const pathArr = fsPath.split('/')
  const fileName = pathArr[pathArr.length - 1] // 取/最后一位
  Object.keys(options).forEach((item) => {
    if (item.indexOf('.') !== -1) {
      // 限制key包含. fileName包含key fileName与key不等(变量.后缀.后缀)
      if (fileName.indexOf(item) !== -1 && fileName !== item) {
        return item
      }
    }
  })
}

// 修改时间格式
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (formatStr) {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项
  if (!formatStr) formatStr = config.configObj.dateFormat
  return moment(this).local().format(formatStr)
}

/**
 * @description 获取该文件的符号
 * @param {*} options
 * symbolName 'atSymbol' || 'colon' 获取艾特符号或者冒号
 * options.fileEnd 文件后缀
 * getValueType 'arr' || 'head' || 'fn' 数组或者头部或者函数
 * @return {*}
 */
const getColon = (options) => {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项
  const obj = {
    atSymbol: ['atSymbol', 'atSymbolObj'],
    colon: ['colon', 'colonObj']
  }

  const [constName, objName] = obj[options.symbolName]
  let arr
  // 文件语言
  if (options.fileEnd !== '') {
    arr = config.configObj[objName][options.fileEnd]
  }
  // 说明没有找到语言后缀 找一下文件后缀
  if (arr === undefined) {
    const editor = vscode.editor || vscode.window.activeTextEditor // 选中文件
    const fsName = fsPathFn(editor.document.uri.fsPath) // 文件后缀
    arr = config.configObj[objName][fsName]
  }
  if (arr === undefined) {
    // 没值 采用所有文件后缀的默认值
    arr = config.configObj[constName]
    if (!Array.isArray(arr)) {
      // 不是数组 设置为数组
      arr = [arr, arr]
    }
  } else {
    // 有值 不是数组 设置为数组
    if (!Array.isArray(arr)) {
      arr = [arr, arr]
    }
  }
  if (options.symbolName === 'atSymbol') {
  // 自定义语言不使用@符号
    if (options.fileEnd.userLanguage) {
      arr = ['', '']
    }
    // python没有@
    if ((options.fileEnd === 'py' || options.fileEnd === 'python')) {
      arr = ['', '']
    }
  }

  const getValueTypeOptions = {
    arr: arr, // 数组
    head: arr[0], // 头部
    fn: arr[1] // 函数
  }
  return getValueTypeOptions[options.getValueType] || ''
}

/**
 * 切割特殊字符串生成空行
 * @param {string} tpl 生成的模板
 */
const replaceSymbolStr = (tpl, fileEnd, customName = 'head') => {
  const sinceOut = tpl.indexOf([global.customStringConst])
  // 是否存在自定义信息
  if (sinceOut !== -1) {
    const option = {
      symbolName: 'colon',
      fileEnd,
      getValueType: customName
    }
    const colon = getColon(option)
    option.symbolName = 'atSymbol'
    // 艾特符号 为可选匹配 因为python没有
    const atClone = getColon(option)
    let reg = ''
    // python没有@符号
    if (atClone) {
      reg = `${atClone}?`
    }
    // 替换全部自定义信息
    reg = new RegExp(`${reg}${global.customStringConst}\\d+${colon}`, 'gim')
    tpl = tpl.replace(reg, '')
  }
  return tpl
}

/**
 * 使用空格填充字符
 */
const spaceStringFn = (oldStr, maxNum) => {
  const config = vscode.workspace.getConfiguration('fileheader')
  if (!config.configObj.wideSame) return oldStr // 不改变长度
  if (maxNum === 0) return oldStr // 不改变长度
  if (typeof maxNum !== 'number') {
    // 不为数字默认为13
    maxNum = 13
  }
  const diffNum = maxNum - oldStr.length
  if (diffNum < 0) return oldStr
  const spaceStr = ''.padStart(diffNum)
  return `${oldStr}${spaceStr}`
}

// 获取文件和项目的地址
const getFileRelativeSite = () => {
  const editor = vscode.editor || vscode.window.activeTextEditor // 选中文件
  const fsPath = editor.document.uri.fsPath // 文件路径
  let itemName = '' // 项目名称
  let itemPath = '' // 项目路径
  try {
    itemPath = vscode.workspace.workspaceFolders[0].uri.fsPath
    // path.sep window: \ mac: /
    const itemNameArr = itemPath.split(path.sep)
    itemName = itemNameArr[itemNameArr.length - 1] // 取/最后一位
  } catch (err) {
    itemName = vscode.workspace.name
    itemPath = vscode.workspace.rootPath
  }
  const fileItemPath = fsPath.replace(itemPath, '') // 相对地址
  return {
    fsPath, // 文件绝对地址
    itemPath, // 项目的绝对地址
    fileItemPath, // 文件相对地址
    itemName // 项目名称
  }
}

// 自动添加黑名单，自动添加白名单 权限
const authList = (fsPath) => {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
  let match = false // 默认没被添加进黑名单
  let support = true // 默认允许
  const prohibit = config.configObj.prohibitAutoAdd // 黑名单
  const fsName = fsPathFn(fsPath)
  if (prohibit && prohibit.length > 0) {
    match = !prohibit.includes(fsName)
  }
  // 白名单
  const supportAutoLanguage = config.configObj.supportAutoLanguage
  if (supportAutoLanguage && supportAutoLanguage.length > 0) {
    support = supportAutoLanguage.includes(fsName)
  }
  return match && support // 不在黑名单 并且在白名单中
}

module.exports = {
  throttle, // 节流
  getColon, // 获取该文件的符号
  fileEndMatch, // 匹配文件后缀 以哪种形式生成注释
  fsPathFn, // 切割文件路径 获取文件后缀
  specialLanguageFn, // 项目使用特殊库/规则，导致文件语言跟注释形式不匹配
  replaceSymbolStr, // 切割特殊字符串生成空行
  spaceStringFn, // 使用空格填充字符
  getFileRelativeSite, // 获取文件和项目的地址
  authList, // 自动添加是否匹配黑名单
  matchProperty // 正则匹配对象中的属性
}
