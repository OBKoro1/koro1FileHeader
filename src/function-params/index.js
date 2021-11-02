/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:23
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-02 17:29:56
 * File         : \koro1FileHeader\src\function-params\index.js
 * Description  :
 */

const vscode = require('vscode')
const util = require('../utile/util')
const handleError = require('../logic/handleError')

class FunctionParams {
  /**
   * description:
   * param {Object} option
   * option.data 函数注释模板
   * option.fileEnd 文件后缀
   * option.lineProperty 解析行的属性 包括text等
   * option.languageId 文件的语言类型
   * return {type}
   */
  init (option) {
    this.option = option
    this.match = false
    this.paramsData = this.option.data
    // 支持函数注释的语言
    const supportLanguage = {
      javascript: 'function-js.js',
      javascriptreact: 'function-js.js', // react jsx
      vue: 'function-js.js', // vue
      html: 'function-js.js', // html
      typescript: 'function-ts.js', // ts
      typescriptreact: 'function-ts.js', // react tsx
      java: 'function-java.js', // java
      python: 'function-python.js', // py
      rust: 'function-rust.js', // rust
      go: 'function-go.js', // go
      c: 'function-c.js',
      cpp: 'function-c.js',
      php: 'function-php.js',
      solidity: 'function-solidity.js' // 智能合约的语言
    }
    // 获取自定义语言设置的函数注释参数提取的语言
    let myLanguage = null
    // 是否声明了自定义语言
    if (option.fileEnd.userLanguage) {
      // 自定义语言是否存在functionParams
      const languageObj = option.config.configObj.language[option.fileEnd.fileEnd]
      if (languageObj) {
        myLanguage = supportLanguage[languageObj.functionParams]
      }
    }
    const typeSupport = supportLanguage[option.languageId]
    // 先使用自定义语言
    if (myLanguage) {
      this.require(myLanguage)
    } else if (typeSupport) {
      // 使用插件检测的语言
      this.require(typeSupport)
    }
  }

  // 引用语言文件 匹配函数 匹配参数
  require (languageType) {
    try {
      const languageGetParams = require(`./${languageType}`)
      languageGetParams.init(this.option.lineProperty)
      // 匹配到将param 变成数组
      if (languageGetParams.match) {
        this.config = vscode.workspace.getConfiguration('fileheader')
        const maxNum = this.config.configObj.functionWideNum
        const key = util.spaceStringFn('param', maxNum)
        this.paramsData[key] = languageGetParams.res
        this.match = true
      }
    } catch (err) {
      handleError.showErrorMessage('fileHeader: FunctionParams', err)
    }
  }
}

module.exports = FunctionParams
