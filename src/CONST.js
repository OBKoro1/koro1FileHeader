/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-05-14 15:41:59
 * LastEditors: OBKoro1
 * LastEditTime: 2019-09-29 17:51:46
 * @Description: 常量文件
 */

// 中间的注释符号，用以生成单行
const middleAnnotation = {
    javascript: ' * ',
    python: '',
    vb: "' ",
    html: '* ',
    shellscript: ' # '
}

// 插件上下文
let context = ''

let fileEnd = ''

// pre commit 执行node的字符串
const handleNodeString = 'node ./.git/hooks/fileHeader-checkChange.js # koroFileHeader的commit hooks，判断文件只改变时间，就不进行操作'

module.exports = {
    middleAnnotation,
    context,
    handleNodeString,
};