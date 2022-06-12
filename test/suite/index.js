/*
 * @Author: IronLu233 lrironsora@gmail.com
 * @Date: 2022-06-10 21:34:14
 * @LastEditors: IronLu233 lrironsora@gmail.com
 * @LastEditTime: 2022-06-12 10:04:40
 * @FilePath: \koro1FileHeader\test\suite\index.js
 */
const path = require('path')
const Mocha = require('mocha')
const glob = require('glob')
const fs = require('fs')
const rimraf = require('rimraf')
const { execSync } = require('child_process')
const vscode = require('vscode')

async function run () {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
    timeout: 10000
  })

  const testsRoot = path.resolve(__dirname, '..')
  const testDir = process.env.TEST_WORKSPACE_DIR
  rimraf.sync(testDir)
  rimraf.sync(path.resolve(testsRoot, 'user-data'))

  fs.mkdirSync(testDir)
  execSync('git init', { cwd: testDir })
  execSync('git config user.name Klee', { cwd: testDir })
  execSync('git config user.email klee@ordo-favonius.hoyo', { cwd: testDir })

  await vscode.workspace.getConfiguration().update('files.eol', '\n')

  return new Promise((resolve, reject) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return reject(err)
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)))

      try {
        // Run the mocha test
        mocha.run((failures) => {
          if (failures > 0) {
            reject(new Error(`${failures} tests failed.`))
          } else {
            resolve()
          }
        })
      } catch (err) {
        console.error(err)
        reject(err)
      }
    })
  })
}

module.exports = {
  run
}
