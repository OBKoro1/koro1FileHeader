/*
 * Author: OBKoro1
 * Date: 2020-02-05 14:27:10
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-02 17:08:25
 * @FilePath     : /koro1FileHeader/src/models/createAnnotation.js
 * Description: 在对应的文件添加头部/函数注释
 * https://github.com/OBKoro1
 */

const vscode = require('vscode')
const logic = require('../logic/logic')
const util = require('../utile/util')
const handleError = require('../logic/handleError')
const languageOutput = require('../languageOutPut/languageOutput')
const handleTpl = require('./handleTpl')
const Design = require('../design')
const FunctionParams = require('../function-params')
const global = require('../utile/CONST')

// 在对应文件头部添加头部注释
function headerAnnotation (editor, option = {}) {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
  // 头部注释直接生成头部注释图案
  if (config.configObj.headDesign) {
    new Design().headDesignCreate('header')
    return
  }
  // 默认合并
  editor.edit((editBuilder) => {
    try {
      // 文件后缀
      let fileEnd = editor.document.languageId // 语言
      fileEnd = util.fileEndMatch(fileEnd) // 提取文件后缀 或者语言类型
      if (option.create && fileEnd === global.NoMatchLanguage) return // 创建文件匹配不到_默认注释 不自动添加头部注释
      // 返回生成模板的数据对象
      const data = logic.userSet(config)
      // 生成
      const tpl = languageOutput.headNotes(data, fileEnd, config)
      // 处理生成的模板
      const { lineNum, newTpl } = handleTpl.handleTplFn(
        tpl,
        editor.document.uri.fsPath,
        config,
        fileEnd
      )
      editBuilder.insert(new vscode.Position(lineNum, 0), newTpl) // 插入
      setTimeout(() => {
        try {
          editor.document.save()
          logic.moveCursor(newTpl)
        } catch (err) {
          handleError.showErrorMessage('fileHeader: headerAnnotation save', err)
        }
      }, 200)
    } catch (err) {
      handleError.showErrorMessage('fileHeader: headerAnnotation', err)
    }
  })
}

// 在对应文件添加函数注释
const functionAnnotation = () => {
  try {
    const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
    const editor = vscode.editor || vscode.window.activeTextEditor // 选中文件
    const fileEnd = util.fileEndMatch(editor.document.languageId)
    const [lineSpace, line, nextLine, lineProperty] = logic.lineSpaceFn(editor, config)

    editor.edit((editBuilder) => {
      const data = logic.cursorOptionHandleFn(config)
      const matchFunctionParamsOptions = {
        languageId: editor.document.languageId, // 语言
        lineProperty, // 函数行内容
        fileEnd, // 文件后缀
        config,
        data // 函数注释模板数据
      }
      matchFunctionParams(config, matchFunctionParamsOptions)
      const functionTplStr = new languageOutput.FunctionTplStr(
        data,
        fileEnd,
        lineSpace,
        nextLine
      )
      const fontTpl = functionTplStr.generate() // 函数注释的模板字符串
      editBuilder.insert(new vscode.Position(line, 0), fontTpl) // 插入
      setTimeout(() => {
        try {
          logic.moveCursorDesFn(fileEnd, config, fontTpl, line)
        } catch (err) {
          handleError.showErrorMessage('fileHeader: functionAnnotation moveCursorDesFn', err)
        }
      }, 100)
    })
  } catch (err) {
    handleError.showErrorMessage('fileHeader: functionAnnotation', err)
  }
}

/**
 * @description 匹配函数参数
 * @param {*} config 插件配置
 * @param {*} options.languageId 语言
 * @param {*} options.lineProperty 函数行内容
 * @param {*} options.fileEnd 文件后缀
 * @param {*} options.data 函数注释模板数据
 * @return {*}
 */
function matchFunctionParams (config, options) {
  // 匹配参数
  if (config.configObj.openFunctionParamsCheck) {
    const functionParams = new FunctionParams()
    functionParams.init(options)
    if (functionParams.match) {
      return functionParams.paramsData
    }
  }
  return options.data
}

module.exports = {
  functionAnnotation,
  headerAnnotation
}
