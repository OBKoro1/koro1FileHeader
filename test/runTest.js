/*
 * @Author: IronLu233 lrironsora@gmail.com
 * @Date: 2022-06-10 21:29:47
 * @LastEditors: IronLu233 lrironsora@gmail.com
 * @LastEditTime: 2022-06-12 10:02:24
 * @FilePath: \koro1FileHeader\test\runTest.js
 */
const path = require('path')

const { runTests } = require('@vscode/test-electron')

async function main () {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../')

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index')

    const testWorkspaceDir = path.join(extensionDevelopmentPath, 'node_modules', 'testWorkspace')
    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [testWorkspaceDir, '--disable-workspace-trust', '--disable-workspace-trust'],
      extensionTestsEnv: {
        TEST_WORKSPACE_DIR: testWorkspaceDir
      }
    })
  } catch (err) {
    console.error('Failed to run tests')
    process.exit(1)
  }
}

main()
