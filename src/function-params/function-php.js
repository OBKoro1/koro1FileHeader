/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * @LastEditors  : OBKoro1
 * @LastEditTime : 2021-02-24 14:17:24
 * File         : \koro1FileHeader\src\function-params\function-php.js
 * Description  : js语言获取函数参数
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
    const processArr = [
      'matchFunction'
    ]
    let params = ''
    for (const item of processArr.values()) {
      const match = this[item]()
      if (match) {
        // let methodName = res[1] // 方法名
        params = match[2]
        break
      }
    }
    // 匹配参数
    this.parsing(params)
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
    // 匹配函数参数: 前面可能是... 也可以是空格 匹配可能的类型声明 匹配$以及一切 匹配后面的一切 除了,不匹配
    const reg = /\s*([...\s]*)((\w+)\s+)?(\$[$\w]*)[^,]*/g
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
      const obj = {
        type: '*',
        param: res[4]
      }
      if (res[1].startsWith('...')) {
        obj.type = 'array'
      }
      if (res[3]) {
        obj.type = res[3]
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
