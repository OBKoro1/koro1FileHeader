/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-09-04 11:50:04
 * LastEditors: OBKoro1
 * LastEditTime: 2019-09-10 16:33:29
 * Description: 检查commit文件规范的js，通过字符串写入文件
 */
const languageDiff = require('../languageOutPut/languageDifferent')
languageDiff.tplJudge.prototype.initConfig()
let lastEditorName = languageDiff.tplJudge.prototype.LastEditorsName
let lastTimeName = languageDiff.tplJudge.prototype.LastEditTimeName
let showLog = languageDiff.tplJudge.prototype.config.configObj.commitHooks.showLog

module.exports = `
/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-08-31 15:01:52
 * LastEditors: OBKoro1
 * LastEditTime: 2019-09-04 19:55:29
 * @Description: 检测文件只有最后编辑人/最后编辑时间变更的情况下，将其恢复，并取消commit
 * @version: 1.0.0
 */
process.on('uncaughtException', function (e) {
    /*处理异常*/
    console.log('报错信息：', e.message)
});
const execSync = require('child_process').execSync

class checkCommit {
    constructor() {
        this.init()
        process.exit(0) // 成功退出
    }
    init() {
        this.fileList = this.fileListFn()
        this.showLogFn('文件列表', this.fileList)
        if (this.fileList.length > 0) {
            this.fileListHandle()
        } else {
            console.log('没有获取到要commit的文件')
        }
    }
    showLogFn(...arr) {
        if (${showLog}) {
            console.log(...arr)
        }
    }
    fileListHandle() {
        for (let item of this.fileList.values()) {
            let res = this.myExecSync('git diff --cached -- ' + item)
            let isHandle = this.checkDiff(res, item)
            if (isHandle) {
                this.myExecSync('git reset HEAD ' + item)
                this.myExecSync('git checkout -- ' + item)
                this.showLogFn(item, '放弃修改')
            }
        }
    }

    /**
     * 检测单个文件的diff字符串是否只有最后编辑人/最后编辑时间有变更
     * @param {string} diffString 单个文件的diff string
     */
    checkDiff(diffString, fileName) {
        console.log('diffString',diffString)
        return false
        // 切割diff字符串
        let splitReg = /@@.*@@/m
        let splitArr = diffString.split(splitReg)
        diffString = splitArr[1]
        let regString = /\\r\\n|\\r|\\n/ // 切割换行字符串 转义\\
        let stringArr = diffString.split(regString) // 切割换行字符串
        // 检测每行字符串
        let reg = /^[-+]/ // 必须以 - 或者 + 开头
        for (let item of stringArr.values()) {
            // 检测有变更的字符串
            if (item.match(reg) !== null) {
                if (item.indexOf('${lastEditorName}') !== -1) {
                } else if (item.indexOf('${lastTimeName}') !== -1) {
                } else {
                    this.showLogFn(fileName + \`有${lastEditorName}/${lastTimeName}之外的变更,正常commit:\`, item)
                    return false
                }
            }
        }
        this.showLogFn(fileName + \`文件只有${lastEditorName}/${lastTimeName}有变更取消commit，恢复文件\`, stringArr)
        return true
    }
    /**
     * @description: 获取文件此次要commit的文件列表
     * @Created_time: 2019-09-01 18:33:54
     */
    fileListFn() {
        let string = this.myExecSync('git diff --cached --name-status HEAD') // 获取修改的文件列表
        let reg = /^M\\s+(.+)$/m // 获取文件 转义\\
        let match;
        let resArray = []
        while ((match = reg.exec(string)) !== null) {
            let splitArr = string.split(match[0])
            string = splitArr[1] // 剩下的字符串
            resArray.push(match[1]) // 获取文件名
        }
        return resArray
    }
    // 运行命令行
    myExecSync(cmd) {
        // 除了该方法直到子进程完全关闭后才返回 执行完毕 返回
        try {
            const res = execSync(
                cmd,
                {
                    encoding: 'utf8',
                    timeout: 0,
                    maxBuffer: 200 * 1024,
                    killSignal: 'SIGTERM',
                    cwd: undefined,
                    env: undefined
                }
            );
            return res
        } catch (err) {
            console.log("执行命令出错:" + cmd)
            throw err
        }
    }

}
new checkCommit()
    `
