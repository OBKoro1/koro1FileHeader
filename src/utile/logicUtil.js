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

// 获取变的一样长的字段
const getSameKey = (obj, oldKey) => {
  let newKey = ''
  Object.keys(obj).forEach((item) => {
    if (item.startsWith(oldKey)) {
      newKey = item
    }
  })
  return newKey
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
    } else if (item === 'custom_string_obkoro1') {
      // 更改用户自定义输出字段 后期需要切割它
      objData.symbol_custom_string_obkoro1 = data[item]
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

module.exports = {
  sameLengthFn,
  changePrototypeNameFn,
  getAnnotationTemplate,
  getSameKey,
}
