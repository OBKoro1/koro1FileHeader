/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-12-25 17:44:28
 * FilePath     : \koro1FileHeader\src\function-params\function-java.js
 * Description  : java语言获取函数参数
 */

class GetParams {
  init (lineProperty) {
    this.text = lineProperty._text // 代码
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
        // let methodName = res[1] // 方法名
        params = match[2]
        break
      }
    }
    // 匹配参数
    this.parsing(params)
  }

  // 匹配方法声明的参数
  matchFunction () {
    // 函数名 可能有空格 匹配一个括号 可能有空格 类型可能的值: [\w[].] 匹配2个字符以上 必须的空格 匹配一个参数名\w 到这里已经判定它是函数声明后面匹配括号内的其他一切
    // eslint-disable-next-line no-useless-escape
    const reg = /([A-Za-z_]\w*?)\s*\((\s*([\w\[\]\.\s]{2,}(\s*<.*>)?)\s+([A-Za-z_]\w+).*)\)/
    return reg.exec(this.text)
  }

  parsing (params) {
    let res
    const paramsArr = [] // 参数列表
    // 可能的空格 匹配类型声明 至少2个字符以上 至少一个必须的空格 参数名 匹配一切除了逗号
    // eslint-disable-next-line no-useless-escape
    const reg = /\s*([\w\[\]\.\s]{2,}(\s*<.*>)?)\s+([A-Za-z_]\w*)[^,]*/g
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
      res[1] = res[1].replace(/\s+/g, '')
      const obj = {
        type: res[1],
        param: res[3]
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
