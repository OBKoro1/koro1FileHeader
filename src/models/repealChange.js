/*
 * Author       : OBKoro1
 * Date         : 2019-12-18 15:04:39
 * @LastEditors  : OBKoro1
 * @LastEditTime : 2021-02-25 17:43:10
 * @FilePath     : \koro1FileHeader\src\models\repealChange.js
 * Description  : 文件没有变化 取消头部注释的变更
 * https://github.com/OBKoro1
 */

const util = require('../utile/util')
const execSync = require('child_process').execSync
const fs = require('fs')
const languageDiff = require('../languageOutPut/languageDifferent')
const handleError = require('../logic/handleError')

class RepealChange {
  /**
   * @param {Boolean} CheckFileChange 是否进行diff检查
   */
  constructor (CheckFileChange) {
    this.resetFile = false // 依据这个值来判断文件是否重置
    if (CheckFileChange) {
      this.init()
    }
  }

  init () {
    const filePathObj = util.getFileRelativeSite()
    this.itemPath = filePathObj.itemPath
    if (this.hasGit()) {
      this.fsPath = filePathObj.fsPath
      this.getDiff()
    }
  }

  hasGit () {
    const url = `${this.itemPath}/.git` // 文件路径
    try {
      const isDirectory = fs.statSync(url).isDirectory() // 判断是否为文件夹 返回布尔值
      if (isDirectory) {
        return true
      } else {
        return false
      }
    } catch (err) {
      return false // 路径不存在的情况
    }
  }

  getDiff () {
    const diffStr = this.myExecSync(
      `cd ${this.itemPath} && git diff ${this.fsPath}`
    )
    const fileIsChange = this.checkDiff(diffStr)
    if (!fileIsChange) {
      // 文件只改变了时间和作者 放弃修改
      this.myExecSync(`cd ${this.itemPath} && git checkout -- ${this.fsPath}`)
      this.resetFile = true
    }
  }

  checkDiff (diffString) {
    // 切割diff字符串
    const splitReg = /@@ [+-].*@@/m
    const splitArr = diffString.split(splitReg)
    if (splitArr.length !== 2) {
      return true // 应该只有一个变更 只能切出一个@@
    }
    diffString = splitArr[1]
    const regString = /\r\n|\r|\n/ // 切割换行字符串 转义\\
    const stringArr = diffString.split(regString) // 切割换行字符串
    // 检测每行字符串
    const reg = /^[-+]/ // 必须以 - 或者 + 开头
    // 获取文件头
    languageDiff.prototype.initConfig()
    const lastEditorName = languageDiff.prototype.LastEditorsName
    const lastTimeName = languageDiff.prototype.LastEditTimeName
    const filePathName = languageDiff.prototype.filePathName
    for (const item of stringArr.values()) {
      // 检测有变更的字符串
      if (item.match(reg) !== null) {
        const nameReg = new RegExp(`[\\s\\W]${lastEditorName}[\\W\\s]`, 'g')
        const timeReg = new RegExp(`[\\s\\W]${lastTimeName}[\\W\\s]`, 'g')
        const filePathReg = new RegExp(`[\\s\\W]${filePathName}[\\W\\s]`, 'g')
        // 检测是否只有这三个变更
        if (nameReg.test(item)) {
          continue
        } else if (timeReg.test(item)) {
          continue
        } else if (filePathReg.test(item)) {
          continue
        } else {
          return true // 有其他变更 不恢复文件
        }
      }
    }
    return false // 恢复文件
  }

  myExecSync (cmd) {
    // 除了该方法直到子进程完全关闭后才返回 执行完毕 返回
    try {
      const res = execSync(cmd, {
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: undefined,
        env: undefined
      })
      return res
    } catch (err) {
      handleError.showErrorMessage('fileHeader: RepealChange', cmd)
    }
  }
}

module.exports = RepealChange
