/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-05-14 16:46:15
 * FilePath     : /koro1FileHeader/src/function-params/function-java.js
 * Description  : java语言获取函数参数
 */

class GetParams {
  init (lineProperty) {
    this.text = lineProperty.text // 代码
    this.match = false // 是否匹配到参数
    this.res = ''
    this.replaceModifier()
  }

  // 切割修饰符
  replaceModifier () {
    const modifierArr = ['public', 'private', 'protected', 'default']
    this.text = this.text.trim()
    modifierArr.forEach(item => {
      const reg = new RegExp(`^\\s*(${item})\\s+`, 'g')
      this.text = this.text.replace(reg, '')
    })
    this.matchProcess()
  }

  // 匹配流程
  matchProcess () {
    const matchObj = {
      matchFunction: 3
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
    // 类型 函数名 可能的空格 匹配括号
    // eslint-disable-next-line no-useless-escape
    const reg = /([A-Za-z_]\w*?)\s+(\w+)\s*\((.*?)\)/
    return reg.exec(this.text)
  }

  parsing (params) {
    let res
    const paramsArr = [] // 参数列表
    // 可能的空格 匹配类型声明 至少2个字符以上 至少一个必须的空格 参数名 匹配一切除了逗号
    // eslint-disable-next-line no-useless-escape
    const reg = /\s*([\w\[\]\.\s]{2,}(\s*<.*?>)?)\s+([A-Za-z_]\w*)[^,]*/g
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
