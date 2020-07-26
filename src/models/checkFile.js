/*
 * Author       : OBKoro1
 * Date         : 2020-02-05 16:09:11
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-07-26 21:12:25
 * FilePath     : \koro1FileHeader\src\models\checkFile.js
 * Description  : 检测文件的一些逻辑
 * https://github.com/OBKoro1
 */

const languageOutput = require('../languageOutPut/languageOutput')
const CONST = require('../utile/CONST')
const filePathLogic = require('../logic/filePath')

/**
 * @description: 保存时触发修改 替换最后编辑时间 最后修改时间 文件路径
 * @param {object} document 文档对象
 * @param {object} userObj 用户设置
 * @param {String} fileEnd 文件后缀
 * @return: authorRange 原修改人行
 * @return: authorText  当前修改人
 * @return: lastTimeRange  原最后编辑时间
 * @return: lastTimeText 当前编辑时间
 * @return: hasAnnotation 是否自动添加头部注释
 */
function saveReplaceTime(document, config, fileEnd) {
  const userObj = config.customMade
  let authorRange,
    authorText,
    lastTimeRange,
    lastTimeText,
    FilePathRange,
    FilePathText
  let changeFont = new languageOutput.changeFont(fileEnd)
  let annotationStarts = changeFont.star()
  let totalLine = document.lineCount - 1 // 总行数
  let enter = false
  let hasAnnotation = false // 默认没有
  // 有没有更改特殊变量
  const checkHasAnnotation = (name, line, checked) => {
    if (checked) return false // 已经找到要替换的
    let userSetName = config.configObj.specialOptions[name]
    const reg = new RegExp(`[\\s\\W]?${name}[\\W\\s]`, 'g')
    if (userSetName) {
      const regUser = new RegExp(`[\\s\\W]?${userSetName}[\\W\\s]`, 'g')
      if (!regUser.test(line)) {
        // 没有检测用户自己更改的 再检测特殊变量
        return reg.test(line)
      } else {
        // 检测用户自己更改的
        return true
      }
    } else {
      // 检测特殊变量
      return reg.test(line)
    }
  }
  let lineNum = CONST.lineNum
  // 注释图案 比较长 需要检测更多行数
  if (config.configObj.designAddHead) {
    lineNum = 100
  }

  for (let i = 0; i < lineNum; i++) {
    // 只遍历前15行没有文件头部注释内容即退出
    let linetAt = document.lineAt(i) // 获取每行内容
    let lineNoTrim = linetAt.text // line
    let line = linetAt.text.trim()
    if (!enter) {
      // 判断进入注释
      if (annotationStarts === line || annotationStarts === lineNoTrim) {
        enter = true
      }
    } else {
      let range = linetAt.range
      if (checkHasAnnotation('LastEditors', line, authorRange)) {
        //表示是修改人
        hasAnnotation = true
        authorRange = range
        let LastEditors = userObj.LastEditors || 'Please set LastEditors'
        authorText = changeFont.LastEditorsStr(LastEditors)
      } else if (checkHasAnnotation('LastEditTime', line, lastTimeRange)) {
        //最后修改时间
        hasAnnotation = true
        lastTimeRange = range
        lastTimeText = changeFont.lastTimeStr()
      } else if (checkHasAnnotation('FilePath', line, FilePathRange)) {
        hasAnnotation = true
        if (config.customMade.FilePath !== undefined) {
          FilePathRange = range
          FilePathText = filePathLogic.mockCreateMiddle(
            config.customMade.FilePath,
            fileEnd
          )
        }
      } else if (checkHasAnnotation('Date', line)) {
        hasAnnotation = true
      }
    }
    if (totalLine === i) break // 行数不够则退出循环
  }

  return {
    hasAnnotation, // 是否有注释
    replaceArr: [
      {
        range: authorRange, // 头部注释的range
        value: authorText,
      },
      {
        range: lastTimeRange, // 最后编辑时间range
        value: lastTimeText,
      },
      {
        range: FilePathRange, // 路径的range
        value: FilePathText,
      },
    ],
  }
}

module.exports = {
  saveReplaceTime,
}
