/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-12-14 22:17:24
 * File         : \koro1FileHeader\src\function-params\function-ts.js
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
    // 开头是可能的空格 函数名 可能的空格: function 可能的函数名和泛型(除了括号) 括号
    // eslint-disable-next-line no-useless-escape
    const reg = /^\s*([A-Za-z_]\w*?)\s*:\s*\bfunction\b[^\(\)]*\((.*)\)/
    return reg.exec(this.text)
  }

  // 匹配对象或者class 的函数
  matchClassFunction () {
    // 开头是可能的空格 函数名 可能有泛型 匹配括号 匹配括号内的一切 可能的空格 可能的一切(返回值类型) 匹配 {
    // eslint-disable-next-line no-useless-escape
    const reg = /^(\s*\w*?\s+)?\s*([A-Za-z_]\w*?)[^\(\)]*\((.*)\)\s*.*?{/
    return reg.exec(this.text)
  }

  // 匹配流程
  matchProcess () {
    const matchObj = {
      matchFunction: 2,
      arrowFunction: 3,
      matchClassFunction: 3,
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
    // 函数名 匹配可能的类型声明和泛型等 匹配= 匹配参数和其他的匹配=>
    const reg = /([A-Za-z_]\w*?)\s*[^=]*=\s*(async)?\s*\(?(.+)\)?.*=>/
    return reg.exec(this.text)
  }

  // 匹配函数关键字
  matchFunction () {
    // 匹配function关键字 必须的空格 匹配函数名 可能的空格 可能的泛型 匹配一个括号
    // eslint-disable-next-line no-useless-escape
    const reg = /\bfunction\b\s*([A-Za-z_]\w*?)\s*[^\(\)]*\((.*)\)/
    return reg.exec(this.text)
  }

  parsing (params) {
    let res
    const paramsArr = [] // 参数列表

    const reg = /\s*([...\s]*)([A-Za-z_]\w*)(\s*\??\s*:\s*(\w+))?[^,]*/g
    // 切割函数数组对象防止其中的逗号干扰
    params = params.replace(/\(.*?\)/g, ' korofunction ')
    // eslint-disable-next-line no-useless-escape
    params = params.replace(/\[+[^\[\]]+\]+/g, ' koroarray ')
    params = params.replace(/{+[^{}]+}+/g, ' koroobject ')
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
      if (res[4] !== undefined) {
        res[4] = res[4].replace(/\s+/g, '')
      } else {
        res[4] = '*'
      }
      const index = paramsArr.length
      // 参数是数组或者对象函数 直接转化为params1234
      res[2] = res[2].replace(/koro\w+/g, `param${index + 1}`)
      // 还原数组对象函数的类型
      res[4] = res[4].replace('koro', '')
      const obj = {
        type: res[4],
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
