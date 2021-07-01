/*
 * Author       : OBKoro1
 * Date         : 2020-02-12 11:29:09
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-07-01 20:24:04
 * FilePath     : handleTpl.js
 * Description  : 已经生成注释模板，处理模板
 * https://github.com/OBKoro1
 */

const util = require('../utile/util')

/**
 * @description: 处理生成的模板 比如添加信息，删除信息等。
 * @param {Object} beforehand 模板和预处理的参数
 * beforehand.tpl {string} tpl 模板changePrototypeNameFn
 * beforehand.beforeAnnotation {Boolean}  是否在模板之前添加内容
 * beforehand.afterAnnotation {Boolean}  是否在模板之后添加内容
 * beforehand.fileEnd 文件后缀
 * @return: {String} tpl
 * @Created_time: 2019-05-14 14:25:26
 */
const handleTplFn = (tpl, fsPath, config, fileEnd) => {
  const option = editLineFn(fsPath, config)
  let newTpl = util.replaceSymbolStr(tpl, fileEnd)
  if (option.beforeAnnotation) {
    newTpl = `${option.beforeAnnotation}\n${newTpl}`
  }
  if (option.afterAnnotation) {
    newTpl = `${newTpl}${option.afterAnnotation}\n`
  }
  return {
    newTpl,
    lineNum: option.lineNum
  }
}

/**
 * @description: 获取要处理模板的配置
 * @param { String } 文件后缀
 * @param {Object} config 用户设置
 * @return: [生成注释的行数,注释之前添加的内容,注释之前添加的内容]
 */
function editLineFn (fsPath, config) {
  let fileEnd = util.fsPathFn(fsPath) // 文件后缀
  const isSpecial = util.specialLanguageFn(fsPath)
  // 特殊文件
  if (isSpecial) {
    fileEnd = isSpecial
  }

  // 切割文件路径 获取文件后缀
  let lineNum = getFileEndConfig(config, 'headInsertLine', fileEnd)
  if (lineNum) {
    // 要减一行
    lineNum = lineNum - 1
  } else {
    lineNum = 0 // 默认插入第一行
  }
  // 是否设置在注释之前添加内容
  const beforeAnnotation = getFileEndConfig(config, 'beforeAnnotation', fileEnd)
  // 注释之后添加内容
  const afterAnnotation = getFileEndConfig(config, 'afterAnnotation', fileEnd)
  return { lineNum, beforeAnnotation, afterAnnotation, fileEnd }
}

// 获取文件后缀的对应配置
function getFileEndConfig (config, configName, fileEnd) {
  if (config.configObj[configName][fileEnd]) {
    // 单独文件的配置
    return config.configObj[configName][fileEnd]
  } else if (config.configObj[configName]['*']) {
    // 通配符配置
    return config.configObj[configName]['*']
  }
  return undefined
}

module.exports = {
  handleTplFn
}
