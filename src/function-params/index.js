/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:23
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-09-08 19:16:14
 * FilePath     : \koro1FileHeader\src\function-params\index.js
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
    const obj = {
      javascript: 'function-js.js',
    }
    const typeSupport = obj[option.languageId]
    if (typeSupport) {
      this.require(typeSupport)
    } else {
      return option.data
    }
  }
  require(languageType) {
    const languageGetParams = require(`./${languageType}`)
    const params = languageGetParams.init(this.option.lineProperty)
    // 匹配到将param 变成数组
    if(languageGetParams.match){
        this.option.data.param = languageGetParams.res
    }
    console.log('languageType', params, languageType, languageGetParams)
  }
}

module.exports = new functionParams()
