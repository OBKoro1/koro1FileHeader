// TODO: 兼容husky

module.exports = `
/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-08-31 15:01:52
 * @LastEditors: Koro
 * @LastEditTime: 2019-09-02 20:45:45
 * @Description: 检查commit
 * @version: 0.1.0
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
        console.log('文件列表', this.fileList)
        if (this.fileList.length > 0) {
            this.fileListHandle()
        } else {
            console.log('没有获取到要commit的文件')
        }
    }
    fileListHandle() {
        for (let item of this.fileList.values()) {
            let res = this.myExecSync('git diff --cached -- ' + item)
            let isHandle = this.checkDiff(res, item)
            if (isHandle) {
                this.myExecSync('git reset HEAD ' + item)
                this.myExecSync('git checkout -- ' + item)
                console.log(item + '放弃修改')
            }
        }
    }

    /**
     * 检测单个文件的diff字符串是否只有最后编辑人/最后编辑时间有变更
     * @param {string} diffString 单个文件的diff string
     */
    checkDiff(diffString, fileName) {
        // 切割diff字符串
        let splitReg = /@@.*@@/m
        let splitArr = diffString.split(splitReg)
        diffString = splitArr[1]
        let regString = /\\r\\n|\\r|\\n/ // 切割换行字符串 转义\\
        let stringArr = diffString.split(regString) // 切割换行字符串
        // 检测每行字符串
        let reg = /^[-+]$/
        for (let item of stringArr.values()) {
            // 检测有变更的字符串
            if (item.match(reg) !== null) {
                // TODO: 字段更改的情况
                // TODO: 在node生成时 检测 并重新输入 权衡一下 或许并不需要检测
                if (item.indexOf('LastEditors') !== -1) {
                } else if (item.indexOf('LastEditTime') !== -1) {
                } else {
                    console.log(fileName + '有LastEditors/LastEditTime之外的变更,正常commit:', item +)
                    return false
                }
            }
        }
        console.log(fileName + '文件只有最后编辑人/最后编辑时间有变更取消commit，恢复文件', stringArr)
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
