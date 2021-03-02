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
const handleTpl = require('../models/handleTpl')

class DesignCommand {
  constructor () {
    this.commandArr = design.commandArr
    this.context = global.context
  }

  // 注册命令
  registerCommand () {
    this.commandArr.forEach((item) => {
      const command = vscode.commands.registerCommand(
        `fileheader.${item}`,
        this.commandHandel(item)
      )
      this.context.subscriptions.push(command)
    })
  }

  // 是否随机注释图案
  getCommandName (commandName) {
    // 随机图案
    if (commandName === 'random') {
      const commandNum = this.commandArr.length - 1 // 小于数组长度 索引值最后
      const index = Math.ceil(Math.random() * commandNum)
      return this.commandArr[index]
    }
    return commandName
  }

  // 头部注释直接生成
  headDesignCreate (head = 'have') {
    this.config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
    let commandName = this.config.configObj.headDesignName
    const isCommandName = this.commandArr.includes(commandName)
    if (!isCommandName) {
      // 没找到注释图案 改为随机
      commandName = 'random'
    }
    this.commandHandel(commandName)(head)
  }

  // 命令行回调
  commandHandel (commandName) {
    commandName = this.getCommandName(commandName)
    return (head) => {
      this.config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
      if (head !== 'header') {
        // 根据配置是否添加注释模板
        this.designAddHead = this.config.configObj.designAddHead
      } else {
        // 头部注释永远添加注释模板
        this.designAddHead = true
      }
      const editor = vscode.editor || vscode.window.activeTextEditor // 选中文件
      this.fileEnd = util.fileEndMatch(editor.document.languageId) // 提取文件后缀 或者语言类型
      const tpl = this.designCreate(commandName)
      const { lineNum } = handleTpl.handleTplFn(
        tpl,
        editor.document.uri.fsPath,
        this.config
      )
      editor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(lineNum, 0), tpl) // 插入
        setTimeout(() => {
          editor.document.save()
        }, 200)
      })
    }
  }

  // 生成注释图案
  designCreate (commandName) {
    let designStr = design[commandName]
    designStr = this.deleteBegin(designStr)
    return designStr
  }

  // 去掉开始的注释
  deleteBegin (designStr) {
    const regString = /\r\n|\r|\n/ // 切割换行字符串 转义\\
    let stringArr = designStr.split(regString) // 切割换行字符串
    stringArr.forEach((item, index) => {
      const newLine = item.substr(2) // 切割前面的空格
      stringArr[index] = newLine
    })
    stringArr = this.addAnnotation(stringArr)
    return stringArr.join('\n')
  }

  // 增加语言的注释符号
  addAnnotation (stringArr) {
    // 获取不同设置下 语言项
    const languageOption = logicUtil.getLanguageSymbol(this.fileEnd)
    if (this.designAddHead) {
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
        this.designAddHead
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

  // 生成插件中间的注释
  getPluginAnnotation () {
    const data = logic.userSet(this.config)
    const tpl = languageOutput.middleTpl(data, this.fileEnd, this.config)
    return util.replaceSymbolStr(tpl, this.fileEnd)
  }
}

module.exports = DesignCommand
