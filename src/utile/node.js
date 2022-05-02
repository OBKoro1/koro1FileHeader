const execSync = require('child_process').execSync

function runExecSync (command) {
  return execSync(command, {
    encoding: 'utf8'
  })
}

module.exports = {
  runExecSync
}
