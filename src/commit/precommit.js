/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-27 11:33:33
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-30 13:22:19
 * Description: git commit 拦截
 */

// TODO: 拷贝一个文件放到.git中
const fs = require('fs');
const path = require('path')
const vscode = require('vscode');
const execSync = require('child_process').execSync
const CONST = require('../CONST')
const preCommitString = require('./pre-commit.js')

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
                let commitSrc = `${this.itemPath}/.git/hooks/pre-commit`; // 文件路径
                if (this.hasFile(commitSrc)) {
                    // do something
                    this.addPreCommit()
                } else {

                }
                // 克隆脚本放在最后面
                this.cloneFile()
            } else {
                // 没有git管理代码
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
    // 字符串化
    hasFile(file) {
        let isFile = fs.existsSync(file); // 判断文件 是否存在
        return isFile
    }
    // 添加 precommit
    addPreCommit() {
        this.preCommitSrc = `${this.itemPath}/.git/hooks/pre-commit`
        let res = fs.readFileSync(`${this.itemPath}/.git/hooks/pre-commit`, 'utf-8')
        let resArr = res.split(/\r\n|\r|\n/)
        // TODO: 需要有node
        let orderString = 'node ./fileHeader-checkChange.js # koroFileHead 检测文件是否变化'
        // 文件存在，避免重复添加
        if (res.indexOf(orderString) === -1) {
            resArr.splice(1, 0, orderString)
            res = resArr.join(`\n`)
            fs.writeFileSync(this.preCommitSrc, res, 'utf-8')
        }
    }
    // 克隆脚本
    cloneFile() {
        let checkChangeSrc = `${this.itemPath}/.git/hooks/fileHeader-checkChange.js`
        // 检查版本更新
        if (!this.hasFile(checkChangeSrc)) {
            // TODO: 检查commit的逻辑
            // TODO: 写一个js 检查commit

        } else {

        }
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