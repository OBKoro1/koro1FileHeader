/*
 * @Author: IronLu233 lrironsora@gmail.com
 * @Date: 2022-06-09 10:18:41
 * @LastEditors: IronLu233 lrironsora@gmail.com
 * @LastEditTime: 2022-06-12 09:59:16
 * @FilePath: \koro1FileHeader\test\suite\extension.test.js
 * @Description: 文件头部版权修改日期等信息的测试
 */

const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const delay = require('delay')
const { expect } = require('chai')
const moment = require('moment')

suite('Fileheader', function () {
  test('it can works well', async function () {
    const testFilePath = path.join(process.env.TEST_WORKSPACE_DIR, 'test.js')
    fs.writeFileSync(testFilePath, 'const a = 114514')
    const textDocument = await vscode.workspace.openTextDocument(testFilePath)
    const annotationCreateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    await vscode.window.showTextDocument(textDocument)
    await vscode.commands.executeCommand('extension.fileheader')
    await delay(3000)
    const testFileStat = fs.statSync(testFilePath)
    const modifyTime = moment(testFileStat.mtime).format('YYYY-MM-DD HH:mm:ss')
    const expected = `/*
 * @Author: Klee klee@ordo-favonius.hoyo
 * @Date: ${annotationCreateTime}
 * @LastEditors: Klee klee@ordo-favonius.hoyo
 * @LastEditTime: ${modifyTime}
 * @FilePath: \\testWorkspace\\test.js
 * @Description: 这是默认设置,请设置\`customMade\`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */`
    const text = textDocument.getText()
    expect(text).to.have.string(
      expected
    )
  })
})
