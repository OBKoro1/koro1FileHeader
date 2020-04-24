/** 
 * Author       : OBKoro1
 * Date         : 2020-02-15 00:11:39
 * LastEditors: OBKoro1
 * LastEditTime: 2020-04-24 19:19:13
 * FilePath     : /koro1FileHeader/src/utile/CONST.js
 * Description  : 常量文件
 * https://github.com/OBKoro1
 */

// 中间的注释符号，用以生成单行
const middleAnnotation = {
  javascript: ' * ',
  python: '',
  vb: "' ",
  html: '* ',
  shellscript: ' # ',
}

// 插件上下文
let context = ''
let autoAddFiles = [] // 自动添加的文件
const lineNum = 25 // 检测头部注释的行数

// pre commit 执行node的字符串
const handleNodeString =
  'node ./.git/hooks/fileHeader-checkChange.js # koroFileHeader的commit hooks，判断文件只改变时间，就不进行操作'

module.exports = {
  lineNum,
  autoAddFiles,
  middleAnnotation,
  context,
  handleNodeString,
}
