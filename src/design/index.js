/**
 * Author       : OBKoro1
 * Date         : 2020-05-09 14:01:31
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-05-11 15:06:14
 * FilePath     : \koro1FileHeader\src\design\index.js
 * Description  : 注释的图形
 * https://github.com/OBKoro1
 */

const global = require('../utile/CONST')
const vscode = require('vscode')
const util = require('../utile/util')
const logicUtil = require('../utile/logicUtil')
const design = require('./design')
const logic = require('../logic/logic')
const languageOutput = require('../languageOutPut/languageOutput')

class designCommand {
  constructor() {
    this.context = global.context
    this.registerCommand()
  }
  registerCommand() {
    const commandArr = [
      'buddhalImg',
      'buddhalSay',
      'buddhalImgSay',
      'belle',
      'totemDragon',
      'totemBat',
      'totemWestDragon',
      'jesus',
      'coderSong',
      'dog',
    ]
    commandArr.forEach((item) => {
      const command = vscode.commands.registerCommand(
        `fileheader.${item}`,
        this.commandHandel(item)
      )
      this.context.subscriptions.push(command)
    })
  }
  // 命令行回调
  commandHandel(commandName) {
    return () => {
      const editor = vscode.editor || vscode.window.activeTextEditor // 选中文件
      this.fileEnd = util.fileEndMatch(editor._documentData._languageId) // 提取文件后缀 或者语言类型
      const tpl = this.designCreate(commandName)
      editor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(0, 0), tpl) // 插入
        setTimeout(() => {
          editor.document.save()
        }, 200)
      })
    }
  }
  // 生成注释图案
  designCreate(commandName) {
    this.config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
    let designStr = design[commandName]
    designStr = this.deleteBegin(designStr)
    return designStr
  }
  // 去掉开始的注释
  deleteBegin(designStr) {
    const regString = /\r\n|\r|\n/ // 切割换行字符串 转义\\
    let stringArr = designStr.split(regString) // 切割换行字符串
    stringArr.forEach((item, index) => {
      const newLine = item.substr(2) //
      stringArr[index] = newLine
    })
    stringArr = this.addAnnotation(stringArr)
    return stringArr.join('\n')
  }
  // 增加语言的注释符号
  addAnnotation(stringArr) {
    // 获取不同设置下 语言项
    const languageOption = logicUtil.getLanguageSymbol(this.fileEnd)
    if (this.config.configObj.designAddHead) {
      stringArr.splice(-1, 0, '')
      stringArr.splice(-1, 0, this.getPluginAnnotation())
    }
    stringArr.forEach((item, index) => {
      let symbolNow = languageOption.middle
      if (index === 0) {
        symbolNow = languageOption.head
      } else if (index === stringArr.length - 1) {
        symbolNow = languageOption.end
      } else if (
        index === stringArr.length - 2 &&
        this.config.configObj.designAddHead
      ) {
        // 去掉注释模板最后一行多余的换行
        const lineArr = stringArr[index].split('\r\n')
        lineArr.splice(lineArr.length - 1, 1)
        stringArr[index] = lineArr.join('\r\n')
        return
      }
      stringArr[index] = `${symbolNow}${item}`
    })
    stringArr.push('\n') // 末尾换行
    return stringArr
  }
  // 获得插件注释
  getPluginAnnotation() {
    const data = logic.userSet(this.config)
    const tpl = languageOutput.middleTpl(data, this.fileEnd, this.config)
    return util.replaceSymbolStr(tpl, this.fileEnd)
  }
}

module.exports = designCommand
