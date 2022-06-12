/*
 * @Author: IronLu233 lrironsora@gmail.com
 * @Date: 2022-06-11 20:24:09
 * @LastEditors: IronLu233 lrironsora@gmail.com
 * @LastEditTime: 2022-06-12 10:02:18
 * @FilePath: \koro1FileHeader\scripts\prepareIntegrationTest.js
 */
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const testWorkspace = path.join(__dirname, '..', 'node_modules', 'testWorkspace')
rimraf.sync(testWorkspace)
fs.mkdirSync(testWorkspace)
