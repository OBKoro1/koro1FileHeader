/**
 * Author       : OBKoro1
 * Date         : 2020-02-15 00:11:39
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-05-11 19:42:25
 * FilePath     : \koro1FileHeader\src\utile\CONST.js
 * Description  : 常量文件
 * https://github.com/OBKoro1
 */

//  不同语言的注释符号
const annotationSymbol = {
  javascript: {
    head: '/*',
    middle: ' * ',
    end: ' */',
  },
  python: {
    head: `'''`,
    middle: '',
    end: `'''`,
  },
  lua: {
    head: `--[[`,
    middle: '',
    end: `--]]`, 
  },
  vb: {
    head: `'`,
    middle: `' `,
    end: `'`,
  },
  html: {
    head: `<!--`,
    middle: ' * ',
    end: ` -->`,
  },
  shellscript: {
    head: `###`,
    middle: ' # ',
    end: `###`,
  },
}

// 插件上下文
let context = ''
let autoAddFiles = [] // 自动添加的文件
const lineNum = 70 // 检测头部注释的行数 需要检测注释图案

// pre commit 执行node的字符串
const handleNodeString =
  'node ./.git/hooks/fileHeader-checkChange.js # koroFileHeader的commit hooks，判断文件只改变时间，就不进行操作'

// 特殊字符串
const specialString = `custom_string_obkoro`

// 自定义模板字符串
const customStringConst = 'symbol_custom_string_obkoro'

// 时间字段
const customStringTime = 'symbol_custom_string_obkoro10000'

// 版本字段
const customStringCopyRight = 'symbol_custom_string_obkoro10001'

module.exports = {
  lineNum,
  autoAddFiles,
  annotationSymbol,
  context,
  customStringConst,
  customStringTime,
  customStringCopyRight,
  handleNodeString,
  specialString
}
