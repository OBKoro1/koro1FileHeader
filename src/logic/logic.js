/*
 * Author       : OBKoro1
 * Date         : 2020-06-01 11:10:04
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-04 20:21:34
 * FilePath     : logic.js
 * Description  : 逻辑输出
 * https://github.com/OBKoro1
 */

const vscode = require('vscode')
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
  const userObj = logicUtil.getAnnotationTemplate('customMade', config)
  let data = {}
  if (Object.keys(userObj).length === 0) {
    // 默认模板
    data = {
      Author: 'your name',
      Date: '',
      LastEditTime: '',
      LastEditors: 'your name',
      Description: '打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE',
      FilePath: ''
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
 * @return: lineSpace：前面的长度 line:当前行(数字)，nextLine 激活行的下一行是否有内容
 */
const lineSpaceFn = (editor, config) => {
  let activeLine = editor.selection.active.line // 激活行 行号
  let lineProperty = editor.document.lineAt(activeLine) // 激活行内容
  let lineSpace = lineProperty.firstNonWhitespaceCharacterIndex // 激活行前面的空格
  let nextLine
  // 判断当前行有没有内容 决定选择当前行还是下一行的长度
  if (
    lineProperty.isEmptyOrWhitespace &&
    editor.document.lineCount !== activeLine + 1
  ) {
    // 选择下一行
    nextLine = activeLine + 1
    lineProperty = editor.document.lineAt(nextLine)
    lineSpace = lineProperty.firstNonWhitespaceCharacterIndex
  } else {
    const cursorModeInternal = logicUtil.getLanguageOrFileSetting({
      optionsName: 'cursorModeInternalAll',
      globalSetting: 'cursorModeInternal',
      defaultValue: false
    })
    // 当前行有内容 是否想生成在函数内部
    if (cursorModeInternal) {
      activeLine = activeLine + 1
    }
  }
  return [lineSpace, activeLine, nextLine, lineProperty]
}

/**
 * 修改时间，描述等配置值
 * @param {object} data 配置项
 */
function changeDataOptionFn (data, config) {
  data = noEditorValue(data, config)
  data = logicUtil.changePrototypeNameFn(data, config) // 更改字段，不改变他们的顺序
  data = changeTplValue(data, config) // 修改模板设置的值
  data = logicUtil.sameLengthFn(data) // 将字段弄得一样长
  return data
}

// Do not edit 的值
function noEditorValue (data, config) {
  let time = new Date().format()
  // 文件创建时间
  if (config.configObj.createFileTime) {
    const filePath = vscode.window.activeTextEditor.document.fileName
    const fileStat = fs.statSync(filePath)
    let createTime = fileStat.birthtime
    const format = new Date(createTime).format()
    // 不支持创建时间的系统 比如linux可能会保存1970-01-01T00:00Z
    if (format.startsWith('1970')) {
      createTime = fileStat.ctime
    }

    if (createTime) {
      // 修复linux无法获取文件创建时间的问题
      time = new Date(createTime).format()
    }
  }
  // 去掉@Date
  if (data[`${global.specialString}1_date`]) {
    data[`${global.specialString}1_date`] = time
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
function changeTplValue (data) {
  // 版权自定义
  if (data[global.customStringCopyRight]) {
    const copyright = data[global.customStringCopyRight]
    data[global.customStringCopyRight] = copyright.replace(
      // eslint-disable-next-line no-template-curly-in-string
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
  const userObj = logicUtil.getAnnotationTemplate('cursorMode', config)
  if (Object.keys(userObj).length === 0) {
    data = {
      description: '',
      param: '',
      return: ''
    }
  } else {
    // 如果用户设置了模板，那将默认根据用户设置模板
    data = Object.assign({}, userObj) // 复制对象，否则对象不能更改值
  }
  if (data.Date !== undefined) {
    data.Date = new Date().format()
  }
  data = logicUtil.changePrototypeNameFn(data, config)
  data = changeTplValue(data, config) // 修改模板设置的值
  data = logicUtil.sameLengthFn(data, 'function') // 将字段弄得一样长
  return data
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
  // 计算函数注释模板行数
  const newLineNum = fontTpl.split(/\r\n|\r|\n/).length - 1
  let i = lineNum - 1 // 初始行数
  let descriptionLineNum // 目标行
  for (i < i + newLineNum; i++;) {
    const line = editor.document.lineAt(i)
    const lineNoTrim = line.text // line
    if (lineNoTrim.indexOf(DescriptionName) !== -1) {
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
  const newPosition = position.with(descriptionLineNum, 10000)
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
      const line = editor.document.lineAt(i)
      const lineNoTrim = line.text // line
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
    const newPosition = position.with(descriptionLineNum, 10000)
    editor.selection = new vscode.Selection(newPosition, newPosition)
    // 移动视图到顶部
    vscode.commands.executeCommand('editorScroll', {
      to: 'up',
      value: 10000
    })
  }
}

module.exports = {
  userSet,
  lineSpaceFn,
  cursorOptionHandleFn,
  moveCursor,
  moveCursorDesFn
}
