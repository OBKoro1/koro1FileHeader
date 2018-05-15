# koroFileHeader

## language

English | [简体中文](https://github.com/OBKoro1/koro1FileHeader/blob/master/README_zh-cn.md)



## Introduction

* Vscode extension
* Add notes to the file header
* Support user-defined file annotation template
* Automatically update the edit time when you save the file.

## install

In Vscode extend the shop search `koroFileHeader`

## Use

1. Open the file in vscode 
2. Press `ctrl+alt+i`

Successfully inserted file comment in file header

## Comment template

### Default comment template

* default allocation:

        "fileheader.customMade": {
            "Author": "OBKoro1",
            "Date": "Do not edit",
            "Email": "obkoro1@foxmail.com",
            "LastEditors": "OBKoro1",
            "LastEditTime": "Do not edit",
            "Description": "file information",
            "Company": "your company"
        }

* File annotation eg:

        /*
         * @Author:OBKoro1
         * @Date:2018-05-15 16:20:04
         * @Email:obkoro1@foxmail.com
         * @LastEditors:OBKoro1
         * @LastEditTime:Do not edit
         * @Description:file information
         * @Company:your company
         */

### Custom annotation template

1. Search for `fileheader.customMade` in the VsCode setting
2. Copy the default configuration + modify the configuration
3. Restart VsCode takes effect

#### Example

* Settings：

![](https://user-gold-cdn.xitu.io/2018/5/15/16363b5fe692715c?w=783&h=369&f=jpeg&s=212840)

* File annotation eg

        /*
         * @Author: OBKoro1
         * @Date: 2018-05-15 20:08:15
         * @Email: obkoro1@foxmail.com
         * @LastEditors: OBKoro2
         * @LastEditTime: 2018-05-15 20:08:15
         * @Description: file information
         * @Company: your company
         * @youWant: you want info
         */

## Automatically update editing time eg:

![](https://user-gold-cdn.xitu.io/2018/5/15/16363c1d23874359?w=488&h=304&f=gif&s=66984)

## License

MIT