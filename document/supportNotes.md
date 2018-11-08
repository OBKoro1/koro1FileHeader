# 支持注释格式：

### 支持语言：

* `/**/`形式：`Javascript`/`Java`/`go`/`C++`/`C`

* `'''`形式：`python`

* `'`形式： `vba`

### 示例设置：

    "fileheader.customMade": {
        "Description": "",
        "Author": "OBKoro1",
        "Github": "https://github.com/OBKoro1",
        "Date": "Do not edit",
        "LastEditors": "OBKoro1",
        "LastEditTime": "Do not edit"
    },
    "fileheader.cursorMode": {
        "description": "",
        "param": "",
        "return": ""
    },

### `/**/`形式


默认情况下，将生成`/**/`形式的注释，**此形式注释支持`Javascript`/`Java`/`go`/`C++`/`C`语言**：

* 头部注释

        /*
         * @Description: 
         * @Author: OBKoro1
         * @Github: https://github.com/OBKoro1
         * @Date: 2018-09-27 13:55:00
         * @LastEditors: OBKoro1
         * @LastEditTime: 2018-11-08 16:10:19
         */

* 函数注释

        /**
         * @description: 
         * @param {type} 
         * @return: 
         */

### `'''`形式:

* 头部注释

        '''
        @Description: 
        @Author: OBKoro1
        @Github: https://github.com/OBKoro1
        @Date: 2018-10-24 21:57:52
        @LastEditors: OBKoro1
        @LastEditTime: 2018-11-08 16:15:14
        '''

* 函数注释

        '''
        @description: 
        @param {type} 
        @return: 
        '''

### `'`形式：

* 头部注释

        '
        ' @Description: 
        ' @Author: OBKoro1
        ' @Github: https://github.com/OBKoro1
        ' @Date: 2018-11-08 11:09:02
        ' @LastEditors: OBKoro1
        ' @LastEditTime: 2018-11-08 16:39:03
        '

* 函数注释

        '
        ' description: 
        ' param {type} 
        ' return: 
        '