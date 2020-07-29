/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-27 11:33:33
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-02-05 12:44:22
 * Description: git commit 拦截
 */

const fs = require('fs')
const vscode = require('vscode')
const execSync = require('child_process').execSync
const CONST = require('../utile/CONST')
const preCommitString = require('./pre-commit-shell.js')
const checkHeaderString = require('./checkHeader')


class PreCommit {
    /**
     * public object config 项目配置
     * public string itemPath 项目路径
     * public string preCommitSrc  commit shell文件路径
     * public string checkChangeSrc commit hooks的js文件路径
     * param {boolean} hasGit 是否存在git
     * Date: 2019-08-27 14:57:36
     */
    constructor() {
        this.config = vscode.workspace.getConfiguration('fileheader').configObj // 配置项默认值
        this.itemPath = vscode.workspace.rootPath
        this.preCommitSrc = `${this.itemPath}/.git/hooks/pre-commit`
        this.checkChangeSrc = `${this.itemPath}/.git/hooks/fileHeader-checkChange.js`
        // const pathArr = this.itemPath.split('/');
        // const itemName = pathArr[pathArr.length - 1]; // 取/最后一位
        // let tip = `console.log('本项目(${itemName})不进行commit hooks检查 -- koroFileHeaders')`
        // fs.writeFileSync(this.checkChangeSrc, tip, 'utf-8')
        // return
        // TODO: 暂时关闭
        // this.init()
    }
    init() {
        try {
            let hasGit = this.gitHas()
            if (hasGit) {
                this.handlePreCommitFn()
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
        let url = `${this.itemPath}/.git` // 文件路径
        let isDirectory = fs.statSync(url).isDirectory() // 判断是否为文件夹 返回布尔值
        if (isDirectory) {
            return this.allowHooks()
        } else {
            return false
        }
    }
    // 是否允许使用hooks
    allowHooks() {
        if (!this.config.commitHooks.allowHooks) {
            const pathArr = this.itemPath.split('/')
            const itemName = pathArr[pathArr.length - 1] // 取/最后一位
            let tip = `console.log('本项目(${itemName})不进行commit hooks检查 -- koroFileHeaders')`
            fs.writeFileSync(this.checkChangeSrc, tip, 'utf-8')
            return false
        }
        return true
    }
    /**
     * 文件是否存在
     * @param {string} file 文件路径
     */
    hasFile(file) {
        let isFile = fs.existsSync(file) // 判断文件 是否存在
        return isFile
    }
    // 钩子文件存在，添加precommit命令
    addPreCommit() {
        let res = fs.readFileSync(this.preCommitSrc, 'utf-8')
        let resArr = res.split(/\r\n|\r|\n/)
        let orderString = CONST.handleNodeString
        // 文件存在，避免重复添加
        if (res.indexOf(orderString) === -1) {
            resArr.splice(1, 0, orderString)
            res = resArr.join('\n')
            fs.writeFileSync(this.preCommitSrc, res, 'utf-8')
        }
    }
    // 克隆脚本
    cloneFile() {
        fs.writeFileSync(this.checkChangeSrc, checkHeaderString, 'utf-8')
    }
    // 检查是否不允许hooks
    checkBlacklist() {
        const pathArr = this.itemPath.split('/')
        const itemName = pathArr[pathArr.length - 1] // 取/最后一位
        if (!this.config.commitHooks.noHooks.includes(itemName)) {
            // 不在黑名单中
            return true
        }
        let tip = `console.log('本项目(${itemName})不进行commit hooks检查 -- koroFileHeaders')`
        fs.writeFileSync(this.checkChangeSrc, tip, 'utf-8')
        return false
    }
    handlePreCommitFn() {
        if (!this.checkBlacklist()) return
        if (this.hasFile(this.preCommitSrc)) {
            this.addPreCommit()
        } else {
            // 创建文件
            fs.writeFileSync(this.preCommitSrc, preCommitString, 'utf-8')
            // 更改文件的权限 否则钩子不执行
            fs.chmodSync(this.preCommitSrc, 0o0755)
        }
        // 克隆脚本
        this.cloneFile()
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
            )
        } catch (err) {
            console.log(`执行命令出错:${cmd}`)
            throw err
        }
    }
}
module.exports = PreCommit