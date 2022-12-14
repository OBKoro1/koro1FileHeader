/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-15 17:42:56
 * FilePath     : /koro1FileHeader/src/function-params/function-js.js
 * Description  : js语言获取函数参数
 */

class GetParams {
  init (lineProperty) {
    this.text = lineProperty.text // 代码
    this.match = false // 是否匹配到参数
    this.res = ''
    this.matchProcess()
  }

  // 匹配对象的函数
  matchObjFunction () {
    // 获取函数名 可能的空格: function 必须的空格 可能的函数名 可能的空格 括号
    const reg = /^\s*([A-Za-z_]\w*?)\s*:\s*\bfunction\b\s*\w*?\s*\((.*)\)\s*/
    return reg.exec(this.text)
  }

  // 匹配对象或者class 的函数
  matchClassFunction () {
    // 开头可能有空格 函数名 可能的空格 括号 可能的空格 必须包含{ 这样才能表示是对象或者class的函数
    const reg = /\s*([A-Za-z_]\w*?)\s*\((.*)\)\s*{/
    return reg.exec(this.text)
  }

  // 匹配流程
  matchProcess () {
    const matchObj = {
      matchFunction: 2,
      arrowFunction: 3,
      matchClassFunction: 2,
      matchObjFunction: 2
    }
    let params = ''
    const keyArr = Object.keys(matchObj)
    for (const item of keyArr.values()) {
      const match = this[item]()
      if (match) {
        const index = matchObj[item]
        params = match[index]
        break
      }
    }
    // 匹配参数
    this.parsing(params)
  }

  // 箭头函数
  arrowFunction () {
    // 匹配 a = 参数 => 的形式
    const reg = /([A-Za-z_]\w*?)\s*=\s*(async)?\s*?\(?(.*)\)?\s*=>/
    return reg.exec(this.text)
  }

  // 匹配函数关键字
  matchFunction () {
    // 匹配function 可能会有一个函数名 捕获函数名 匹配括号里面的参数字符 ?表示非贪婪
    const reg = /\bfunction\b(\s?[A-Za-z_]\w*?\s?)\((.*)\)/
    return reg.exec(this.text)
  }

  parsing (params) {
    let res
    const paramsArr = [] // 参数列表
    // 匹配函数参数: 前面可能是... 也可以是空格 捕获参数名(变量名第一个不能是数字) 匹配后面的一切 除了,不匹配
    const reg = /\s*([...\s]*)([A-Za-z_]\w*)[^,]*/g
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
      const obj = {
        type: '*',
        param: res[2]
      }
      if (res[1].startsWith('...')) {
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
