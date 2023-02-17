/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-10-14 19:27:49
 * FilePath     : \koro1FileHeader\src\function-params\function-lua.js
 * Description  : lua语言获取函数参数
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
    const processArr = ['matchFunction']
    let params = ''
    for (const item of processArr.values()) {
      const match = this[item]()
      if (match) {
        // let className = res[1] // 类名
        // let methodName = res[2] // 方法名
        params = match[3]
        break
      }
    }
    // 匹配参数
    this.parsing(params)
  }

  // def开头的函数
  matchFunction () {
    // 匹配function单词 至少一个空格 匹配类名 匹配： 匹配函数名 可能的空格 匹配一个括号 匹配括号内的一切
    const reg = /\bfunction\b\s+(\w+)\:(\w+)\s*\((.*)\)/
    return reg.exec(this.text)
  }

  parsing (params) {
    let res
    const paramsArr = [] // 参数列表
    // 可能的空格或者*号 匹配参数 可能的类型声明 匹配一切除了逗号
    const reg = /\s*([*\s]*)(\w+)(\s*:\s*(\w+))?[^,]*/g
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
      const obj = {
        type: '*',
        param: res[2]
      }
      if (res[1].indexOf('**') !== -1) {
        obj.type = 'object'
      } else if (res[1].indexOf('*') !== -1) {
        obj.type = 'array'
      } else if (res[4] !== undefined) {
        obj.type = res[4]
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
