/*
 * Author       : OBKoro1
 * CreateDate   : 2020-12-24 13:34:52
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-05-14 15:22:39
 * File         : \koro1FileHeader\src\function-params\function-c.js
 * Description  : c语言获取函数参数
 * Copyright 2020 OBKoro1
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
    let params = ''
    const matchObj = {
      matchFunction: 3
    }
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
    // 函数名 可能有空格 匹配一个括号 可能有空格 类型可能的值: [\w[].] 匹配2个字符以上 必须的空格 匹配一个参数名\w 到这里已经判定它是函数声明后面匹配括号内的其他一切
    const reg = /(\s*\w*?\s+)?\s*([A-Za-z_]\w*?)\s*\((.*)\)/
    return reg.exec(this.text)
  }

  // 替换关键字
  replaceKeyword (params, keywordArr) {
    keywordArr.forEach(item => {
      const reg = new RegExp(`\\s*${item}\\s+`, 'g')
      params = params.replace(reg, '') // 去掉const声明的情况
    })
    return params
  }

  parsing (params) {
    let res
    const paramsArr = [] // 参数列表
    const keywordArr = ['const', 'struct'] // c ++ 关键字
    params = this.replaceKeyword(params, keywordArr)
    // 可能的空格 匹配类型声明可以包含*和& 至少2个字符以上 至少一个必须的空格 参数名 匹配一切除了逗号
    // eslint-disable-next-line no-useless-escape
    const reg = /\s*([\w\[\]\.\s*&]{2,}(\s*<.*?>)?)\s+([A-Za-z_*&.]*\w*)[^,]*/g
    // 捕获函数参数
    while ((res = reg.exec(params))) {
      if (!res) break
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
