/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-09-08 19:11:19
 * FilePath     : \koro1FileHeader\src\function-params\function-js.js
 * Description  : js语言获取函数参数
 */

class GetParams {
  init(lineProperty) {
    this.text = lineProperty._text // 代码
    this.match = false // 是否匹配到参数
    this.res = ''
    this.differentMatch()
  }

  // 匹配函数
  differentMatch(matchName) {
    const match = this.matchFunction()
    if (!match) {
    }
  }
  // 匹配函数关键字
  matchFunction() {
    // 匹配function 可能会有一个函数名 捕获函数名 匹配括号里面的参数字符 ?表示非贪婪
    /**
     * description: 
     * param {type} 
     * CreateDate: 2020-09-08 19:09:28
     * return {type} 
     */    
    const reg = /\bfunction\b(\s?[A-Za-z_]\w*?\s?)\((.*?)\)/
    const res = reg.exec(this.text)
    if (res) {
    //   let methodName = res[1]
      let params = res[2]
     this.parsing(params)
    } else {
      return null
    }
  }
  parsing(params) {
    let res
    let paramsArr = [] // 参数列表
    // 匹配函数参数: 前面可能是... 也可以是空格 捕获参数名(变量名第一个不能是数字) 后面可能有逗号或者空格
    const reg = /([...\s]*)([A-Za-z_]\w*)[/s,]*?/g
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
      let obj = {
        type: '*',
        param: res[2],
      }
      if (res[1] === '...') {
        obj.type = 'array'
      }
      paramsArr.push(obj)
    }
    this.res = paramsArr
    if (paramsArr.length !== 0) {
        this.match = true
    }
  }
}

module.exports = new GetParams()
