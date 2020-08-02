/**
 * Author       : OBKoro1
 * Date         : 2020-02-15 00:11:39
 * LastEditors: OBKoro1
 * LastEditTime: 2020-04-24 16:10:12
 * FilePath     : /koro1FileHeader/src/utile/logicUtil.js
 * Description  :
 * https://github.com/OBKoro1
 */

const util = require('./util')
const vscode = require('vscode')
const global = require('../utile/CONST')

// 将字段弄得一样长
const sameLengthFn = (data) => {
  const config = vscode.workspace.getConfiguration('fileheader')
  if (!config.configObj.wideSame) return data // 不改变长度
  let maxNum = config.configObj.wideNum
  let objData = {}
  // 修改属性
  Object.keys(data).forEach((item) => {
    const newItem = util.spaceStringFn(item, maxNum)
    objData[newItem] = data[item]
  })
  return objData
}

/**
 * 更改字段，不改变他们的顺序
 * @Created_time: 2019-05-07 19:36:20
 * @return {Object} 更换字段后的对象
 */
const changePrototypeNameFn = (data, config) => {
  let keysArr = Object.keys(data)
  let specialOptions = config.configObj.specialOptions // 时间字段重命名配置
  let objData = {}
  let specialArr = [
    'Date',
    'LastEditTime',
    'LastEditors',
    'Description',
    'FilePath',
  ]
  keysArr.forEach((item) => {
    // 特殊字段 且 有设置特殊字段
    if (specialArr.includes(item) && specialOptions[item]) {
      objData[specialOptions[item]] = data[item]
    } else if (item.indexOf('custom_string_obkoro') !== -1) {
      // 更改用户自定义输出字段 后期需要切割它
      if(item === 'custom_string_obkoro1_copyright'){
        objData[`symbol_custom_string_obkoro10001`] = data[item]
      }else if(item === 'custom_string_obkoro1_date'){
        objData[`symbol_custom_string_obkoro10000`] = data[item]
      }else{
        objData[`symbol_${item}`] = data[item]
      }

    } else {
      objData[item] = data[item]
    }
  })
  return objData
}

/**
 * description: 注释模板使用工作区模板或全局模板
 * param {string} madeName 注释模板的key值
 * return: 使用的模板
 */
const getAnnotationTemplate = (madeName, config) => {
  let userObj = config[madeName]
  // 使用工作区的模板
  if (config.configObj.useWorker) {
    const allTemplate = config.inspect(madeName, 'workspaceValue') // 全部模板
    if (!allTemplate.workspaceValue) return userObj // 未设置
    userObj = allTemplate.workspaceValue
    if (Object.keys(userObj).length === 0) {
      userObj = config[madeName] // 工作区未设置模板使用全局的
    }
  }
  return userObj
}

// 获取语言注释的符号对象
const getLanguageSymbol = (fileEnd) => {
  const config = vscode.workspace.getConfiguration('fileheader') // 配置项默认值
  let languageOption = {}
  // 匹配用户定义语言符号
  if (fileEnd.userLanguage) {
    languageOption = config.configObj.language[fileEnd.fileEnd]
  } else if (fileEnd !== '匹配不到_默认注释') {
    // 匹配插件的符号
    languageOption = global.annotationSymbol[fileEnd]
  } else if (config.configObj.annotationStr.use) {
    // 调用用户设置的默认注释符号
    languageOption = config.configObj.language
  } else {
    // 插件默认设置
    languageOption = global.annotationSymbol.javascript
  }
  return languageOption
}

module.exports = {
  sameLengthFn,
  changePrototypeNameFn,
  getAnnotationTemplate,
  getLanguageSymbol
}
