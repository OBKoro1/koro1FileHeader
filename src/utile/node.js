const execSync = require('child_process').execSync
const { getFileRelativeSite } = require('./util')

function runExecSync (command) {
  const { itemPath } = getFileRelativeSite()
  return execSync(command, {
    encoding: 'utf8',
    cwd: itemPath // 在vscode打开的项目中使用
  })
}

module.exports = {
  runExecSync
}
