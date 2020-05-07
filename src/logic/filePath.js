/*
 * Author       : OBKoro1
 * Date         : 2020-02-06 12:26:22
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-02-06 13:23:18
 * FilePath     : /koro1FileHeader/src/logic/filePath.js23333
 * Description  : 文件路径相关
 * https://github.com/OBKoro1
 */
const vscode = require('vscode')
const util = require('../utile/util')
const path = require('path')
const logicUtil = require('../utile/logicUtil')
const languageDifferent = require('../languageOutPut/languageDifferent')

const createFilePath = (FilePath) => {
  const config = vscode.workspace.getConfiguration('fileheader')
  let { itemName, fileItemPath } = util.getFileRelativeSite()
  let res = `${path.sep}${itemName}${fileItemPath}` // 拼接项目名称和相对于项目的路径
  if (FilePath === 'no item name') {
    res = `${fileItemPath}`
  }
  if (config.configObj.filePathColon !== '路径分隔符替换') {
    // path.sep window: \ mac: /
    let pathStr = '/' // mac
    if (path.sep !== pathStr) {
      pathStr = '\\\\' // window \在RegExp中需要再转义一次
    }
    const reg = new RegExp(pathStr, 'g')
    res = res.replace(reg, config.configObj.filePathColon)
  }
  return res
}

// 模拟生成中间部分
const mockCreateMiddle = (FilePath, fileEnd) => {
  FilePath = createFilePath(FilePath) // 生成FilePath
  let data = {
    FilePath,
  }
  data = logicUtil.sameLengthFn(data) // FilePath长度
  // 只生成路径
  let result = ''
  Object.keys(data).forEach((key) => {
    const obj = {
      fileEnd,
      type: 'topMiddle',
      key,
      value: data[key],
    }
    let res = new languageDifferent.tplJudge(obj).res
    res = res.split('\r\n')
    if (res[1] !== undefined) {
      // 如果换行后增加了空格等 则拼接在前面
      result = `${res[1]}${res[0]}`
    } else {
      // 没有空格
      result = `${res[0]}`
    }
  })
  return result
}

module.exports = {
  createFilePath,
  mockCreateMiddle,
}
