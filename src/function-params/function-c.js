/*
 * Author       : OBKoro1
 * CreateDate   : 2020-09-07 15:47:40
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-10-08 12:40:26
 * FilePath     : \koro1FileHeader\src\function-params\function-java.js
 * Description  : java语言获取函数参数
 */

class GetParams {
  init(lineProperty) {
    this.text = lineProperty._text // 代码
    this.match = false // 是否匹配到参数
    this.res = ''
    this.matchProcess()
  }

  // 删除前后空格
  Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  // 多个空格替换为一个
  ResetBlank(str) {
    return str.replace(/\s+/g, " ");
  }

  // 匹配流程
  matchProcess() {
    let paramsArr = []
    const regParam = /\((.*)\)/
    const matchParam = regParam.exec(this.text)
    let matchParmStr = ""
    if (matchParam) {
      matchParmStr = matchParam[1]
    } else {
      return
    }

    matchParmStr = matchParmStr.trim()
    if ("" == matchParmStr) {
      return
    }

    let splitList = matchParmStr.split(",")
    for (let i = 0; i < splitList.length; i++) {
      let tempParam = splitList[i]
      tempParam = tempParam.trim()
      tempParam = this.ResetBlank(tempParam)
      if (0 == tempParam.indexOf(' ')) {
        continue
      }
      let typeStr = tempParam.substring(0, tempParam.lastIndexOf(" "))
      let typeParam = tempParam.substring(tempParam.lastIndexOf(" ") + 1)
      const obj = {
        type: typeStr,
        param: typeParam,
      }
      paramsArr.push(obj)
    }
    this.res = paramsArr
    if (paramsArr.length !== 0) {
      this.match = true
    }

    let tempRetStr = this.text.substring(0, this.text.indexOf('('))
    tempRetStr = tempRetStr.trim()
    let retType = tempRetStr.substring(0, tempRetStr.lastIndexOf(" "))
    const obj = {
      retType: retType,
      param: "return value",
    }
    paramsArr.push(obj)
    return
  }
}

module.exports = new GetParams()
