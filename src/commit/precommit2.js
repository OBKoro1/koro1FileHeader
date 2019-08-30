/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-27 11:33:33
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-27 15:29:08
 * Description: git commit 拦截
 */

// TODO: 拷贝一个文件放到.git中
const fs = require('fs');
const vscode = require('vscode');
const execSync = require('child_process').execSync

console.log('执行')

class PreCommit {
    /**
     * param {string} itemPath 项目路径
     * param {boolean} hasGit 是否存在git
     * Date: 2019-08-27 14:57:36
     */
    constructor() {
        this.itemPath = vscode.workspace.rootPath
        this.init()

        // this.myExecSync(`git log --name-only -1`)
        // this.myExecSync(`git diff --name-only HEAD~ HEAD`)
        // this.myExecSync(`git diff`)
    }
    init() {
        try {
            this.hasGit = this.gitHas()
            if (this.hasGit) {
                if (this.hooksHas()) {

                } else {

                }
                // 克隆脚本放在最后面
                // this.cloneFile()
            } else {
                return
            }
        } catch (err) {
            console.log('err', err)
        }

    }
    gitHas() {
        let url = `${this.itemPath}/.git`; // 文件路径
        let isDirectory = fs.statSync(url).isDirectory(); // 判断是否为文件夹 返回布尔值
        console.log('url', url, isDirectory)
        return isDirectory
    }
    hooksHas() {
        let file = `${this.itemPath}/.git/hooks/pre-commit`; // 文件路径
        let isFile = fs.existsSync(file); // 判断文件 是否存在
        console.log('文件存在', isFile)
        return isFile
    }

    // 克隆脚本
    cloneFile(from, to) {
        fs.copyFileSync(
            from,
            to
        );

    }
    cloneShell() {

    }
    createFile() {

    }
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
            console.log('res', res)
        } catch (err) {
            console.log(`执行命令出错:${cmd}`)
            throw err
        }
    }
}
module.exports = PreCommit