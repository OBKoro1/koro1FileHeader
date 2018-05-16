# koroFileHeader 

[koroFileHeader](https://github.com/OBKoro1/koro1FileHeader)是为Vscode开发的插件，在 VsCode 中通过快捷键`ctrl+alt+i`在文件头部添加注释。

插件是参照 [vscode-fileheader](https://github.com/zhaopengme/vscode-fileheader.git)扩展并增加了用户自定义注释功能。


## language

[English](https://github.com/OBKoro1/koro1FileHeader/blob/master/README.md) | 简体中文

## 简介

* vscode扩展插件
* 在文件头中添加注释
* 支持用户自定义文件注释模板
* 在你保存文件的时候 自动更新编辑时间

## 安装

在 Vscode 扩展商店中搜索 `koroFileHeader`

## 使用

1. 在 Vscode 中打开文件
2. 按 `ctrl+alt+i`

成功在文件头部插入文件注释

## 注释模板

### 默认注释模板

* 默认配置:

        "fileheader.customMade": {
            "Author": "OBKoro1",
            "Date": "Do not edit",
            "Email": "obkoro1@foxmail.com",
            "LastEditors": "OBKoro1",
            "LastEditTime": "Do not edit",
            "Description": "file information",
            "Company": "your company"
        }

* 文件注释生成:

        /*
         * @Author:OBKoro1
         * @Date:2018-05-15 16:20:04
         * @Email:obkoro1@foxmail.com
         * @LastEditors:OBKoro1
         * @LastEditTime:Do not edit
         * @Description:file information
         * @Company:your company
         */

### 自定义注释模板

1. 在 VsCode 设置中搜索`fileheader.customMade`
2. 复制默认配置+修改配置
3. 重启 VsCode 生效


#### Example

* 设置：

![](https://user-gold-cdn.xitu.io/2018/5/15/16363b5fe692715c?w=783&h=369&f=jpeg&s=212840)

* 文件注释生成:

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

## 自动更新编辑时间 示例:

![](https://ww1.sinaimg.cn/large/005Y4rCogy1frcys5ftdfg30bh07igmo.gif)

## 微信公众号

关注我的微信公众号，每月会发几篇[技术博客](http://obkoro1.com/)，有问题可以一起交流，相互学习，共同进步。

[](https://ww1.sinaimg.cn/large/005Y4rCogy1fr8oubn0d3j309k09k3yg.jpg)

## LICENSE

MIT