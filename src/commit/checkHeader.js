module.exports = `
/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-08-31 15:01:52
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-31 20:59:13
 * @Description: 检查commit
 * @version: 0.1.0
 */
process.on('uncaughtException', function (e) {
    /*处理异常*/
    console.log('process', e.message)
});

// let domain = require('domain')
// let d = domain.create()
// d.on('error', function (e) {
//     /*处理异常*/
//     console.log('处理异常', e.message)
// })
const execSync = require('child_process').execSync
class checkCommit {
    constructor() {
        this.init()
        process.exit(0)
    }
    init() {
        console.log('init')
        this.myExecSync('git diff --cached')
        this.myExecSync('git diff --staged')
        this.myExecSync('git diff --cached --name-status HEAD') // 获取修改的文件列表
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
            console.log('cmd', cmd)
            console.log('res', res)
        } catch (err) {
            console.log("执行命令出错:" + cmd)
            throw err
        }
    }

}
new checkCommit()
    `
