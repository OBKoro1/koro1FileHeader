/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-05-14 16:34:29
 * File         : \koro1FileHeader\src\function-params\function-go.js
 * Description  : java语言获取函数参数
 */

class GetParams {
  init (lineProperty) {
    this.text = lineProperty.text // 代码
    this.match = false // 是否匹配到参数
    this.res = ''
    this.matchProcess()
  }

  // 匹配流程
  matchProcess () {
    const matchObj = {
      matchFunction: 2,
      matchFuncNoName: 1
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

  // 匹配方法声明的参数
  matchFunction () {
    // 匹配单词func 可能有空格 可能有函数名 可能有空格 匹配括号 匹配括号内的一切
    const reg = /\bfunc\b.*(\w+)\s*\((.*?)\)/
    return reg.exec(this.text)
  }

  // 匹配匿名函数  var Add = func(a, b int) int {
  matchFuncNoName () {
    const reg = /\bfunc\b\s*\((.*?)\)/
    return reg.exec(this.text)
  }

  parsing (params) {
    let res
    const paramsArr = [] // 参数列表
    // 可能的空格 匹配参数 匹配可能的参数类型 遇到逗号停下来
    const reg = /\s*([A-Za-z_]\w*)(\s+[^,]*)?[^,]*/g
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
      if (res[2] !== undefined) {
        res[2] = res[2].replace(/\s+/g, '')
      } else {
        res[2] = '*'
      }
      const obj = {
        type: res[2],
        param: res[1]
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
