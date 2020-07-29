/*
 * Author: OBKoro1
 * Date: 2020-02-05 14:40:32
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-07-29 15:38:59
 * FilePath     : \koro1FileHeader\src\models\fileSave.js
 * Description: 文件保存时触发
 * https://github.com/OBKoro1
 */

const vscode = require('vscode')
const util = require('../utile/util')
const handleError = require('../logic/handleError')
const checkFile = require('./checkFile')
const repealChange = require('./repealChange')
const createAnnotation = require('./createAnnotation')
const global = require('../utile/CONST')

function watchSaveFn() {
  let intervalVal = null // 保存上次触发时间，用于节流
  let fileName = '' // 保存操作的文件
  // 文件保存时 触发
  vscode.workspace.onWillSaveTextDocument(file => {
    if (!file.document.isDirty) return // 文件没有修改 不操作
    let editor = vscode.editor || vscode.window.activeTextEditor
    const config = vscode.workspace.getConfiguration('fileheader')
    // 先保存本次编辑 再查看文件的修改
    file.document.save().then(() => {
      const RepealChange = new repealChange(config.configObj.CheckFileChange)
      if (RepealChange.resetFile) return
      try {
        if (file.fileName === fileName) {
          // 同一个文件操作 节流
          intervalVal = util.throttle(documentSaveFn, 6666, intervalVal)()
        } else {
          fileName = file.fileName // 保存上次编辑的文件
          documentSaveFn()
        }
      } catch (err) {
        handleError.showErrorMessage(err)
      }
    })
    function documentSaveFn() {
      // 配置项默认值
      let fileEnd = editor._documentData._languageId // 文件后缀
      fileEnd = util.fileEndMatch(fileEnd)
      const document = editor.document
      const { hasAnnotation, replaceArr } = checkFile.saveReplaceTime(
        document,
        config,
        fileEnd
      )
      let replace = false
      // 更新最后编辑人，时间，路径
      editor.edit(edit => {
        replaceArr.forEach(item => {
          if (!item.range) return
          replace = true
          edit.replace(item.range, item.value)
        })
      })

      if (replace) {
        editor.document.save()
      }
      // 检测文件注释,自动添加注释
      setTimeout(() => {
        let params = {
          fsPath: editor._documentData._uri.fsPath,
          lineCount: editor.document.lineCount,
          fileEnd,
          hasAnnotation,
          config
        }
        let isAutoAdd = isAutoAddFn(params)
        if (isAutoAdd) {
          global.autoAddFiles.push(params.fsPath)
          const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
          createAnnotation.headerAnnotation(editor)
        }
      }, 500)
    }
  })
}

/**
 * @description: 是否自动添加 逻辑判断
 * @param {Object} params
 * @param {Number} params.lineCount 文件行数
 * @param {String} params.fsPath 文件路径
 * @param {String} params.fileEnd 文件后缀
 * @param {Boolean} params.hasAnnotation 文件是否已有头部注释
 * @param {Object} params.config 插件配置
 * @Created_time: 2019-11-02 17:12:51
 * @return {Boolean} 是否自动添加
 */
function isAutoAddFn(params) {
  // 文件超过一定行数时 不自动添加头部注释
  if (params.config.configObj.autoAddLine < params.lineCount) return false
  if (!params.config.configObj.autoAdd) return false // 关闭自动添加
  if (params.hasAnnotation) return false // 文件已经有注释
  const hasAddProhibit = util.authList(params.fsPath)
  if (!hasAddProhibit) return false // 被添加进黑名单 或者没有添加进白名单
  if (autoAddItemBlacklist(params.config.configObj.prohibitItemAutoAdd))
    return false // 项目黑名单
  // 曾经自动添加过头部注释 不再添加
  if (global.autoAddFiles.includes(params.fsPath)) return false
  if (
    params.config.configObj.autoAlready &&
    params.fileEnd === '匹配不到_默认注释'
  ) {
    // 只自动添加支持的语言 该文件不是插件支持的语言
    return false
  }
  return true // 自动添加
}

// 项目黑名单
function autoAddItemBlacklist(prohibitItemAutoAdd) {
  const {
    itemName // 项目名称
  } = util.getFileRelativeSite()
  return prohibitItemAutoAdd.includes(itemName)
}

module.exports = watchSaveFn
