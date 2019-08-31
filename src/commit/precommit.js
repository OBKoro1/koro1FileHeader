/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-27 11:33:33
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-31 20:39:56
 * Description: git commit 拦截
 */

// TODO: 拷贝一个文件放到.git中
const fs = require('fs');
const path = require('path')
const vscode = require('vscode');
const execSync = require('child_process').execSync
const CONST = require('../CONST')
const preCommitString = require('./pre-commit.js')
const checkHeaderString = require('./checkHeader')


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
            let hasGit = this.gitHas()
            if (hasGit) {
                this.handlePreCommitFn()
                // 克隆脚本
                this.cloneFile()
            } else {
                // 没有git管理代码
                return
            }
        } catch (err) {
            console.log('err', err)
        }
    }
    // 是否有.git文件
    gitHas() {
        let url = `${this.itemPath}/.git`; // 文件路径
        let isDirectory = fs.statSync(url).isDirectory(); // 判断是否为文件夹 返回布尔值
        return isDirectory
    }
    /**
     * 文件是否存在
     * @param {string} file 文件路径
     */
    hasFile(file) {
        let isFile = fs.existsSync(file); // 判断文件 是否存在
        return isFile
    }
    // 钩子文件存在，添加precommit命令
    addPreCommit() {
        let res = fs.readFileSync(this.preCommitSrc, 'utf-8')
        let resArr = res.split(/\r\n|\r|\n/)
        // TODO: 需要有node
        let orderString = 'node ./.git/hooks/fileHeader-checkChange.js # koroFileHeader的commit hooks，判断文件只改变时间，就不进行操作'
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
        if (this.hasFile(checkChangeSrc)) {
            // 检查版本
            // TODO: 检查commit的逻辑
            // TODO: 写一个js 检查commit
            console.log('checkChangeSrc1',checkChangeSrc)
        } else {
            // TODO: 创建文件 调试 放在下面
            // 创建fileHeader-checkChange.js
            console.log('checkChangeSrc2',checkChangeSrc)
        }
        fs.writeFileSync(checkChangeSrc, checkHeaderString, 'utf-8')

    }
    // 检查版本更新
    checkVersion() {
        let checkChangeSrc = `${this.itemPath}/.git/hooks/fileHeader-checkChange.js`

    }
    handlePreCommitFn() {
        this.preCommitSrc = `${this.itemPath}/.git/hooks/pre-commit`
        if (this.hasFile(this.preCommitSrc)) {
            this.addPreCommit()
        } else {
            // 创建文件
            // TODO: 创建文件放上来
        }
        fs.writeFileSync(this.preCommitSrc, preCommitString, 'utf-8')
        // 更改文件的权限 否则钩子不执行
        fs.chmodSync(this.preCommitSrc, 0o0755)
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