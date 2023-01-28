/* eslint-disable no-template-curly-in-string */
/*
 * Author       : OBKoro1
 * Date         : 2020-06-01 11:10:04
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2023-01-28 21:28:22
 * FilePath     : /src/logic/logic.js
 * Description  : 逻辑输出
 * https://github.com/OBKoro1
 */

const vscode = require('vscode')
const fs = require('fs')
const filePathFile = require('./filePath')
const logicUtil = require('../utile/logicUtil')
const global = require('../utile/CONST')
const { runExecSync } = require('../utile/node')

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
      Author: 'git config user.name && git config user.email',
      Date: '',
      LastEditors: 'git config user.name && git config user.email',
      LastEditTime: '',
      FilePath: '',
      Description: '这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE'
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
  const moreLineObj = isMoreLine(editor)
  const cursorModeInternal = logicUtil.getLanguageOrFileSetting({
    optionsName: 'cursorModeInternalAll',
    globalSetting: 'cursorModeInternal',
    defaultValue: false
  })
  if (moreLineObj) {
    // 函数参数注释多行逻辑
    return getMoreLine(cursorModeInternal, editor, moreLineObj, cursorModeInternal)
  } else {
    // 函数注释单行逻辑
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
      // 当前行有内容 是否想生成在函数内部
      if (cursorModeInternal) {
        activeLine = activeLine + 1
      }
    }
    return [lineSpace, activeLine, nextLine, lineProperty]
  }
}

// 多行的生成行号，多行文本合并
function getMoreLine (cursorModeInternal, editor, moreLineObj) {
  const lineProperty = getMultilineText(editor, moreLineObj)
  let activeLine = getFirstLineNoEmpty(editor, moreLineObj)
  let lineSpace = editor.document.lineAt(activeLine).firstNonWhitespaceCharacterIndex
  // 函数内生成 获取最后一行的行号和前面的空格 用于生成
  if (cursorModeInternal) {
    const endLineNoEmpty = getEndLineNoEmpty(editor, moreLineObj)
    activeLine = endLineNoEmpty + 1
    // 最后一行的前面空格
    lineSpace = editor.document.lineAt(endLineNoEmpty).firstNonWhitespaceCharacterIndex
  }
  return [lineSpace, activeLine, undefined, lineProperty]
}
// 获取最后一行不为空的行数
function getEndLineNoEmpty (editor, moreLineObj) {
  const { startObj, endObj } = moreLineObj
  const lineNumber = endObj.line
  for (let i = endObj.line; i >= startObj.line; i--) {
    const lineProperty = editor.document.lineAt(i)
    if (!lineProperty.isEmptyOrWhitespace) return i
  }
  return lineNumber
}

// 获取第一行不为空的行数
function getFirstLineNoEmpty (editor, moreLineObj) {
  const { startObj, endObj } = moreLineObj
  const lineNumber = startObj.line
  for (let i = startObj.line; i <= endObj.line; i++) {
    const lineProperty = editor.document.lineAt(i)
    if (!lineProperty.isEmptyOrWhitespace) return i
  }
  return lineNumber
}

// 多行合并成一行
function getMultilineText (editor, moreLineObj) {
  const { startObj, endObj } = moreLineObj
  let text = ''
  for (let i = startObj.line; i <= endObj.line; i++) {
    const lineProperty = editor.document.lineAt(i)
    text += lineProperty.text
  }
  return {
    text: text
  }
}

// 选择多行判断
function isMoreLine (editor) {
  const selectionsArr = editor.selections
  const selectItem = selectionsArr[0]
  const startObj = selectItem.start
  const endObj = selectItem.end
  // 多行返回对象
  if (startObj.line !== endObj.line) {
    return { startObj, endObj }
  }
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

/**
 * @description: 如果value配置了，获取并设置git用户名、git用户邮箱
 * @return {string} value 配置项
 */
function setGitConfig (value) {
  let res = ''
  try {
    if (value && value.indexOf('git config') !== -1) {
      const userName = runExecSync('git config --get user.name').trim()
      const userEmail = runExecSync('git config --get user.email').trim()
      if (value === 'git config user.name') {
        res = userName
      }
      if (value === 'git config user.email') {
        res = userEmail
      }
      if (value === 'git config user.name && git config user.email') {
        res = `${userName} ${userEmail}`
      }
    }
  } catch (err) {
    res = `error: ${value} & please set dead value or install git`
  }

  return res || value
}

// 修改模板设置的值
function changeTplValue (data) {
  const newData = {}
  Object.keys(data).forEach(key => {
    newData[key] = writeValue(data[key])
  })
  function writeValue (value) {
    // now_year 全局替换
    let res = value.replace(
      /\$\{now_year}/g,
      new Date().format('YYYY')
    )
    // 获取用户名和邮箱
    const templateObj = {
      '${git_name_email}': 'git config user.name && git config user.email',
      '${git_name}': 'git config user.name',
      '${git_email}': 'git config user.email'
    }
    Object.keys(templateObj).forEach(key => {
      res = res.replace(templateObj[key], setGitConfig(templateObj[key]))
    })
    return res
  }
  return newData
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
  const DescriptionName = logicUtil.getSpecialOptionName(global.SPECIAL_FN_DESCRIPTION)
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
    const DescriptionName = logicUtil.getSpecialOptionName(global.SPECIAL_HEAD_DESCRIPTION)
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
