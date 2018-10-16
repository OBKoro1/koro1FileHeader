# koroFileHeader 

> 一个读取用户自定义模板，通过快捷键添加文件头部注释、在光标处添加函数注释的`VsCode`插件

## language

简体中文 | [English](https://github.com/OBKoro1/koro1FileHeader/blob/master/README.md)

## 简介

1. **文件头部添加注释**:
   
   *  在文件开头添加注释，记录文件信息
   *  读取用户设置，生成注释模板
   *  保存文件的时候，自动更新最后的编辑时间和编辑人
   *  快捷键：`window`：`ctrl+alt+i`,`mac`：`ctrl+cmd+i`

2. **在光标处添加函数注释**:

    * 在光标处自动生成一个注释模板，下方有栗子
    * 支持用户自定义文件注释模板
    * 快捷键：`window`：`ctrl+alt+t`,`mac`：`ctrl+cmd+t`

## 安装

在 Vscode 扩展商店中搜索`koroFileHeader`,点击安装即可。

## 使用

1. 文件头部注释：

    在当前编辑文件中使用快捷键:`window`：`ctrl+alt+t`/`mac`：`ctrl+cmd+t`,即可生成文件头部注释。
    
2. 函数注释：
   
    1. 将光标放在函数行或者将光标放在函数上方的空白行
    2. 使用快捷键`window`：`ctrl+alt+t`,`mac`：`ctrl+cmd+t`，即可生成函数注释。
    3. 事实上，函数注释在文件的任意位置都可生成，这里需要自己控制。

## 注释模板的设置

* 默认配置:
  
  在用户首选项中搜索`fileheader`，默认配置为：

        "fileheader.customMade": {} // 头部注释
        "fileheader.cursorMode": {} // 函数注释 

  用户未设置的情况下，头部注释和函数注释模板为：

    ![](https://user-gold-cdn.xitu.io/2018/10/15/166779bbd32b2eb8?w=835&h=669&f=gif&s=110037)

 * 自定义模板：
    
   1. 在用户设置中，搜索`fileheader`
   2. 复制默认配置+修改配置,重启生效
    
      ![](https://user-gold-cdn.xitu.io/2018/10/15/16677ca54d2fd641?w=1904&h=1418&f=png&s=483788)
      
    如上设置，生成注释：

        // 文件头部注释
        /*
         * @Description: 
         * @version: 
         * @Company: BAT
         * @Author: OBKoro1
         * @Date: 2018-10-15 20:59:57
         * @LastEditors: OBKoro1
         * @LastEditTime: 2018-10-15 20:59:57
         */
        // 函数注释
        /**
         * @name: 
         * @test: test font
         * @msg: 
         * @param {type} 
         * @return: 
         */

### 自动更新最后编辑时间、编辑人：

要开启这个功能，需要在首选项设置中填写对应的属性：

      "fileheader.customMade": {
        "Date": "Do not edit", // 文件创建时间(不变)
        "LastEditors": "OBKoro1", // 文件最后编辑者
        "LastEditTime": "Do not edit" // 文件最后编辑时间
      }
      // 不填写对应属性即关闭对应功能


## 自动更新编辑时间
 示例:

   ![](https://user-gold-cdn.xitu.io/2018/10/15/16677021413214ca?w=413&h=270&f=gif&s=49647)

## 最后

如果觉得还不错的话，就给个 [Star](https://github.com/OBKoro1/koro1FileHeader) ⭐️ 鼓励一下我吧~

[博客](http://obkoro1.com/)、[前端积累文档](http://obkoro1.com/web_accumulate/accumulate/)、[公众号](https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&h=344&f=jpeg&s=8317)、[GitHub](https://github.com/OBKoro1)