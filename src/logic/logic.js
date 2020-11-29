/*
 * Author       : OBKoro1
 * Date         : 2020-06-01 11:10:04
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-11-29 15:00:33
 * FilePath     : \koro1FileHeader\src\logic\logic.js
 * Description  : 逻辑输出
 * https://github.com/OBKoro1
 */

const vscode = require('vscode')
const languageOutput = require('../languageOutPut/languageOutput')
const fs = require('fs')
const filePathFile = require('./filePath')
const logicUtil = require('../utile/logicUtil')
const global = require('../utile/CONST')

/**
 * @description: 头部注释根据用户设置返回模板数据对象
 * @param {Object} userObj 用户设置
 * @param {String} time 文件创建时间
 * @return: 返回生成模板的数据对象
 */
const userSet = (config) => {
  let userObj = logicUtil.getAnnotationTemplate('customMade', config)
  let data = {}
  if (Object.keys(userObj).length === 0) {
    // 默认模板
    data = {
      Author: 'your name',
      Date: '',
      LastEditTime: '',
      LastEditors: 'your name',
      Description: 'In User Settings Edit',
      FilePath: '',
    }
  } else {
    // 如果用户设置了模板，那将默认根据用户设置模板
    data = Object.assign({}, userObj) // 复制对象，否则对象不能更改值
  }
  data = changeDataOptionFn(data, config)
  return data
}

/**
 * @description: 函数注释前面的长度
 * @param {Object} editor 当前激活文件
 * @return: lineSpace：前面的长度，frontStr：函数注释第一行的长度，line:当前行(数字)，nextLine 激活行的下一行是否有内容
 */
const lineSpaceFn = (editor,config) => {
  let activeLine = editor.selection.active.line // 激活行 行号
  let lineProperty = editor.document.lineAt(activeLine) // 解析行的属性 包括text等
  let lineFirst = lineProperty.firstNonWhitespaceCharacterIndex // 激活行 前面是否有值
  let lineSpace = lineFirst,
    nextLine,
    frontStr = '' // 前面空几行
  // 判断当前行有没有内容 决定选择当前行还是下一行的长度
  if (
    lineProperty.isEmptyOrWhitespace &&
    editor._documentData.document.lineCount !== activeLine + 1
  ) {
    nextLine = activeLine + 1
    lineProperty = editor.document.lineAt(nextLine)
    lineSpace = lineProperty.firstNonWhitespaceCharacterIndex
    lineFirst = lineFirst === 0 ? lineSpace : 0
    frontStr = ''.padStart(lineFirst)
  }else{
    if(config.configObj.cursorModeInternal){
      // 当前行有内容 是否想生成在函数内部
      activeLine = activeLine + 1
    }
  }
  return [lineSpace, frontStr, activeLine, nextLine, lineProperty]
}

/**
 * 修改时间，描述等配置值
 * @param {object} data 配置项
 */
function changeDataOptionFn(data, config) {
  data = noEditorValue(data, config)
  data = logicUtil.changePrototypeNameFn(data, config) // 更改字段，不改变他们的顺序
  data = changeTplValue(data, config) // 修改模板设置的值
  data = logicUtil.sameLengthFn(data) // 将字段弄得一样长
  return data
}

// Do not edit 的值
function noEditorValue(data, config) {
  let time = new Date().format()
  // 文件创建时间
  if (config.configObj.createFileTime) {
    const filePath =
      vscode.window.activeTextEditor._documentData._document.fileName
    const fileStat = fs.statSync(filePath)
    let createTime = fileStat.birthtime
    // 不支持创建时间的系统 比如linux可能会保存1970-01-01T00:00Z
    if(time.startsWith('1970')){
      createTime = fileStat.ctime
    }

    if (createTime) {
      // 修复linux无法获取文件创建时间的问题
      time = new Date(createTime).format()
    }
  }
  // 去掉@Date
  if (data.custom_string_obkoro1_date) {
    data.custom_string_obkoro1_date = time
  }
  // 判断是否设置
  if (data.Date !== undefined) {
    data.Date = time
  }
  // 当前时间为最后编辑时间
  if (data.LastEditTime !== undefined) {
    data.LastEditTime = new Date().format()
  }
  // 自动添加文件路径
  if (data.FilePath !== undefined) {
    data.FilePath = filePathFile.createFilePath(data.FilePath)
  }
  return data
}

// 修改模板设置的值
function changeTplValue(data) {
  // 版权自定义
  if (data[global.customStringCopyRight]) {
    let copyright = data[global.customStringCopyRight]
    data[global.customStringCopyRight] = copyright.replace(
      '${now_year}',
      new Date().format('YYYY')
    )
  }
  return data
}

/**
 * 函数注释，更改值,
 * @Created_time: 2019-05-07 19:36:20
 * @return {Object} 更换字段后的对象
 */
const cursorOptionHandleFn = (config) => {
  let data = {}
  let userObj = logicUtil.getAnnotationTemplate('cursorMode', config)
  if (Object.keys(userObj).length === 0) {
    data = {
      description: '',
      param: '',
      return: '',
    }
  } else {
    // 如果用户设置了模板，那将默认根据用户设置模板
    data = Object.assign({}, userObj) // 复制对象，否则对象不能更改值
  }
  if (data.Date !== undefined) {
    data.Date = new Date().format()
  }
  data = changNameFn(data, config)
  return data
}

/**
 * 更改字段，不改变他们的顺序
 * @param {obeject} data 函数模板配置
 * @param {*} config 顶层配置
 */
function changNameFn(data, config) {
  let keysArr = Object.keys(data)
  let specialOptions = config.configObj.specialOptions // 时间字段重命名配置
  let objData = {}
  // 支持日期和描述
  let specialArr = ['Date', 'Description']
  keysArr.forEach((item) => {
    if (specialArr.includes(item) && specialOptions[item]) {
      // 特殊字段重新赋值
      objData[specialOptions[item]] = data[item]
    } else if (item.indexOf(global.specialString) !== -1) {
      objData[`symbol_${item}`] = data[item]
    } else {
      objData[item] = data[item]
    }
  })
  return objData
}

/**
 * @description: 函数注释移动光标到description所在行
 * @param {String} tpl 最终要生成的模板
 * @Created_time: 2019-06-18 14:28:13
 */
const moveCursorDesFn = (fileEnd, config, fontTpl, lineNum) => {
  // 生成Description行
  if (!config.configObj.moveCursor) return
  const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
  const specialOptions = config.configObj.specialOptions // 时间字段重命名配置
  const DescriptionName = specialOptions.Description
    ? specialOptions.Description
    : 'Description'
  let data = {
    [DescriptionName]: '',
  }
  let str = languageOutput.middleTpl(data, fileEnd, config)
  str = str.trim()
  // 计算函数注释模板行数
  let newLineNum = fontTpl.split(/\r\n|\r|\n/).length - 1
  let i = lineNum - 1 // 初始行数
  let descriptionLineNum // 目标行
  for (i < i + newLineNum; i++; ) {
    let line = editor.document.lineAt(i)
    let lineNoTrim = line.text // line
    if (lineNoTrim.indexOf(str) !== -1) {
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
  const position = editor.selection.active
  var newPosition = position.with(descriptionLineNum, 10000)
  editor.selection = new vscode.Selection(newPosition, newPosition)
}

/**
 * @description: 移动光标到description所在行 移动视图到顶部
 * @param {String} tpl 最终要生成的模板
 * @Created_time: 2019-06-18 14:28:13
 */
const moveCursor = (tpl) => {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
  if (config.configObj.moveCursor) {
    const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
    const specialOptions = config.configObj.specialOptions // 时间字段重命名配置
    const DescriptionName = specialOptions.Description
      ? specialOptions.Description
      : 'Description'
    // 注释总行数 最后多一行注释开头 一行注释结尾 最后一行换行
    const strLine = tpl.split(/\r\n|\r|\n/).length
    // 文档是从0开始 行数从1开始 要减去1
    let descriptionLineNum
    for (let i = 0; i < strLine; i++) {
      let line = editor.document.lineAt(i)
      let lineNoTrim = line.text // line
      if (lineNoTrim.indexOf(`${DescriptionName}`) !== -1) {
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
    const position = editor.selection.active
    var newPosition = position.with(descriptionLineNum, 10000)
    editor.selection = new vscode.Selection(newPosition, newPosition)
    // 移动视图到顶部
    vscode.commands.executeCommand('editorScroll', {
      to: 'up',
      value: 10000,
    })
  }
}

module.exports = {
  userSet,
  lineSpaceFn,
  cursorOptionHandleFn,
  moveCursor,
  moveCursorDesFn,
}
