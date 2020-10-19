/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:23
 * ,@LastEditors  : OBKoro1
 * ,@LastEditTime : 2020-10-19 15:38:05
 * ,@FilePath     : \koro1FileHeader\src\function-params\index.js
 * Description  :
 */

class functionParams {
  /**
   * description:
   * param {Object} option
   * option.data 函数注释模板
   * option.fileEnd 文件后缀
   * option.lineProperty 解析行的属性 包括text等
   * option.languageId 文件的语言类型
   * return {type}
   */
  init(option) {
    this.option = option
    this.match = false
    this.paramsData = this.option.data
    const obj = {
      javascript: 'function-js.js',
      typescript: 'function-ts.js',
      vue: 'function-js.js',
      html: 'function-js.js',
      java: 'function-java.js',
      python: 'function-python.js',
      go: 'function-go.js'
    }
    const typeSupport = obj[option.languageId]
    if (typeSupport) {
      this.require(typeSupport)
    }
  }
  // 引用语言文件 匹配函数 匹配参数
  require(languageType) {
    const languageGetParams = require(`./${languageType}`)
    languageGetParams.init(this.option.lineProperty)
    // 匹配到将param 变成数组
    if(languageGetParams.match){
        this.paramsData.param = languageGetParams.res
        this.match =true
    }
  }
}

module.exports = new functionParams()
