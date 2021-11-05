/*
 * Author       : OBKoro1
 * Date         : 2020-02-06 12:26:22
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-05 16:39:27
 * FilePath     : /koro1FileHeader/src/logic/filePath.js
 * Description  : 文件路径相关
 * https://github.com/OBKoro1
 */
const vscode = require('vscode')
const util = require('../utile/util')
const path = require('path')
const logicUtil = require('../utile/logicUtil')
const LanguageDifferent = require('../languageOutPut/languageDifferent')

const createFilePath = (FilePath) => {
  const config = vscode.workspace.getConfiguration('fileheader')
  const { itemName, fileItemPath } = util.getFileRelativeSite()
  let res = `${path.sep}${itemName}${fileItemPath}` // 拼接项目名称和相对于项目的路径
  if (FilePath === 'no item name') {
    res = `${fileItemPath}`
  } else if (FilePath === 'only file name') {
    const arr = fileItemPath.split(path.sep)
    res = arr[arr.length - 1]
  } else if (FilePath === 'only file name without ext') {
    // Remove ext from the file name.
    // If the file name is `README.md`, then remove `.md`, output `README`.
    // The file name could also be `foo.bar.js`, then remove `.js` and output `foo.bar`.
    const arr = fileItemPath.split(path.sep)
    const resExt = arr[arr.length - 1]
    const resArr = resExt.split('.')
    res = resArr.slice(0, resArr.length - 1).join('.')
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
  const config = vscode.workspace.getConfiguration('fileheader')
  FilePath = createFilePath(FilePath) // 生成FilePath
  const specialFileName = config.configObj.specialOptions.FilePath
  const name = specialFileName || 'FilePath'
  let data = {
    [name]: FilePath
  }
  data = logicUtil.sameLengthFn(data) // FilePath长度
  // 只生成路径
  let result = ''
  Object.keys(data).forEach((key) => {
    const obj = {
      fileEnd,
      type: 'topMiddle',
      key,
      value: data[key]
    }
    let res = new LanguageDifferent(obj).res
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
  mockCreateMiddle
}
