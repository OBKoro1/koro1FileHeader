/*
 * Author: OBKoro1
 * Date: 2020-02-05 14:40:32
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-01 21:35:45
 * FilePath     : /koro1FileHeader/src/models/fileSave.js
 * Description: 文件保存时触发
 * https://github.com/OBKoro1
 */

const vscode = require('vscode')
const util = require('../utile/util')
const handleError = require('../logic/handleError')
const checkFile = require('./checkFile')
const RepealChange = require('./repealChange')
const createAnnotation = require('./createAnnotation')
const global = require('../utile/CONST')
const path = require('path')

// 添加文件、LRU更新当前操作文件成最新
function updateFileNameArr (fileNameArr, fileName) {
  // 查找文件
  const index = fileNameArr.findIndex((item) => {
    return item.fileName === fileName
  })
  let item = null
  if (index !== -1) {
    item = fileNameArr[index]
    fileNameArr.splice(index, 1) // 删除
  } else {
    // 插入新的元素 维护数组的最大值10个
    if (fileNameArr.length >= 30) {
      fileNameArr.shift() // 删除不活跃的文件
    }
    item = {
      lastTime: null, // 上次执行时间
      fileName // 文件
    }
  }
  // 保持文件的活跃度，更新文件到最末尾
  fileNameArr.push(item)
  return fileNameArr
}

function watchSaveFn () {
  let fileNameArr = [] // 保存最近操作的文件
  // 文件保存时 触发
  vscode.workspace.onWillSaveTextDocument((file) => {
    if (!file.document.isDirty) return // 文件没有修改 不操作
    const editor = vscode.editor || vscode.window.activeTextEditor
    const config = vscode.workspace.getConfiguration('fileheader')
    try {
      fileNameArr = updateFileNameArr(fileNameArr, file.document.fileName)
      const lastItem = fileNameArr[fileNameArr.length - 1]
      // 同一个文件操作 节流
      lastItem.lastTime = util.throttle(
        config.configObj.throttleTime,
        lastItem.lastTime,
        documentSaveFn,
        config,
        editor
      )()
    } catch (err) {
      handleError.showErrorMessage('fileHeader: watchSaveFn', err)
    }
  })
}

function documentSaveFn (config, editor) {
  // 配置项默认值
  let fileEnd = editor.document.languageId // 文件后缀
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

  // 自动添加头部注释
  function autoAdd () {
    const params = {
      fsPath: editor.document.uri.fsPath,
      lineCount: editor.document.lineCount,
      fileEnd,
      hasAnnotation,
      config
    }
    const isAutoAdd = isAutoAddFn(params)
    if (isAutoAdd) {
      global.autoAddFiles.push(params.fsPath)
      const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
      createAnnotation.headerAnnotation(editor)
    }
  }

  // 检测文件注释,自动添加注释
  setTimeout(() => {
    try {
      autoAdd()
      // 异步等文件被保存过后 再读取diff
      const repealChange = new RepealChange(config.configObj.CheckFileChange)
      if (repealChange.resetFile) {
        console.log('文件未更改 恢复')
      }
    } catch (err) {
      handleError.showErrorMessage('fileHeader: documentSaveFn', err)
    }
  }, 500)
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
function isAutoAddFn (params) {
  // 文件超过一定行数时 不自动添加头部注释
  if (params.config.configObj.autoAddLine < params.lineCount) return false
  if (!params.config.configObj.autoAdd) return false // 关闭自动添加
  if (params.hasAnnotation) return false // 文件已经有注释
  if (folderBlacklistFn(params.config.configObj.folderBlacklist, params.fsPath)) return false // 文件夹禁止自动添加
  const hasAddProhibit = util.authList(params.fsPath)
  if (!hasAddProhibit) return false // 被添加进黑名单 或者没有添加进白名单
  if (autoAddItemBlacklist(params.config.configObj.prohibitItemAutoAdd)) { return false } // 项目黑名单
  // 曾经自动添加过头部注释 不再添加
  if (global.autoAddFiles.includes(params.fsPath)) return false
  if (
    params.config.configObj.autoAlready &&
    params.fileEnd === global.NoMatchLanguage
  ) {
    // 只自动添加支持的语言 该文件不是插件支持的语言
    return false
  }
  return true // 自动添加
}

/**
 * @description 文件夹名称禁止自动添加头部注释
 * @param {*} fsPath 文件路径
 * @return {Boolean} 是否禁止
 */
function folderBlacklistFn (folderBlacklist, fsPath) {
  const folderArr = fsPath.split(path.sep)
  const index = folderArr.findIndex((item) => {
    return folderBlacklist.includes(item)
  })
  return index !== -1 // 代表找到了 找到了 就不自动添加头部注释
}

// 项目黑名单
function autoAddItemBlacklist (prohibitItemAutoAdd) {
  const {
    itemName // 项目名称
  } = util.getFileRelativeSite()
  return prohibitItemAutoAdd.includes(itemName)
}

module.exports = watchSaveFn
