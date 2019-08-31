/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-08-31 15:01:52
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-31 20:39:24
 * @Description: 当没有commit文件时创建git拦截
 */

const preCommitString = `#!/bin/sh
###
 # @Author: OBKoro1
 # @Github: https://github.com/OBKoro1
 # @Date: 2019-05-08 14:28:42
 # @LastEditors: OBKoro1
 # @LastEditTime: 2019-08-31 15:39:03
 # koroFileHeader的commit hooks，判断文件只改变时间，就不进行操作。
 # 插件：koroFileHeader: https://github.com/OBKoro1/koro1FileHeader
###
echo "执行commit hooks --- koroFileHeader"
node ./.git/hooks/fileHeader-checkChange.js # koroFileHeader的commit hooks，判断文件只改变时间，就不进行操作`
// TODO: 退出0

module.exports = preCommitString
