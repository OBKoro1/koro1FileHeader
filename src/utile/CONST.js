/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-05-14 15:41:59
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-02-05 17:59:00
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
let autoAddFiles = [] // 自动添加的文件

let fileEnd = ''

const lineNum = 25; // 检测头部注释的行数

// pre commit 执行node的字符串
const handleNodeString = 'node ./.git/hooks/fileHeader-checkChange.js # koroFileHeader的commit hooks，判断文件只改变时间，就不进行操作'

module.exports = {
    lineNum,
    autoAddFiles,
    middleAnnotation,
    context,
    handleNodeString,
};