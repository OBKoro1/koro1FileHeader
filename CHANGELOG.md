<!--
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-10-31 14:18:17
 * @LastAuthor: Wayne_zhy
 * @lastTime: 2019-08-08 14:33:15
 -->

# 更新日志

### 如果觉得本插件还不错的话，给个[Star](https://github.com/OBKoro1/koro1FileHeader)吧~


### [V4.0.0]

* **自定义注释中的`@`和`: `**：允许全局修改`@`和`: `，和单独为某些文件修改它们，[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E9%87%8A%E4%B8%AD%E7%9A%84%E8%89%BE%E7%89%B9%E5%92%8C%E5%86%92%E5%8F%B7)。

* **自动添加注释，现在改为默认打开**：自动添加头部注释功能现在比较稳定，应该很多同学不知道这个能力，反正我非常喜欢用！不喜欢的话也可以这样关闭它：

```js
"fileheader.configObj": {
  "autoAdd": false, // 关闭它
}
````

* **破坏性修改**：由于配置选项对象会被覆盖，导致默认配置不生效，**将`fileheader.configObj.config`移除，并将以下三个选项移动到`fileheader.configObj`中**

    * `prohibitAutoAdd`：[自动添加头部注释黑名单](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E9%BB%91%E5%90%8D%E5%8D%95)
    * `dateFormat`：[时间格式化](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%97%B6%E9%97%B4%E6%A0%BC%E5%BC%8F%E5%8C%96), 使用`moment `的format方法
    * `moveCursor`：[移动光标到`Description`](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87%E5%88%B0description-%E6%89%80%E5%9C%A8%E8%A1%8C)

```js
// 以前
"fileheader.configObj": {
  "config": {
    "prohibitAutoAdd": [
      "json",
      "md",
      "js"
    ],
    "moveCursor": true,
    "dateFormat": "YYYY-MM-DD HH:mm:ss",
  }
}
// 现在
"fileheader.configObj": {
  "prohibitAutoAdd": [
    "json",
    "md",
    "js"
  ],
  "moveCursor": true,
  "dateFormat": "YYYY-MM-DD HH:mm:ss",
}
```


### [V3.9.4]

* 将typescript加入默认支持语言,以使用自动添加注释的功能

### [V3.9.3]

* 新增：生成头部注释后，移动光标到`Description`所在行,具体规则，[点这里](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87%E5%88%B0description-%E6%89%80%E5%9C%A8%E8%A1%8C)
* 近期在开发函数注释的列出参数的功能，遇到了一个正则问题，开了个[issue](https://github.com/OBKoro1/koro1FileHeader/issues/58)，正则大佬感兴趣可以帮忙看一下。

### [V3.9.2]

* 修复`xxx.component.html`匹配不到`html`类型的bug

### [V3.9.1]

* 修复`afterAnnotation`添加在前面的bug

### [V3.9.0]

* 新增功能：[自动添加头部注释黑名单](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E9%BB%91%E5%90%8D%E5%8D%95)：禁用特殊某些文件类型下的自动添加。
* 新增功能：[时间格式化](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%97%B6%E9%97%B4%E6%A0%BC%E5%BC%8F%E5%8C%96)：用户可以自行设定要修改的时间格式，时间格式化使用[moment](http://momentjs.cn/docs/#/displaying/format/)库，同时`configObj.timeNoDetail`配置删除。

### [V3.8.0]

* 新增支持`a.sh`[类型注释](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80#%E5%BD%A2%E5%BC%8F-2)。
* 新增功能：在`customMade`(文件头部注释)中，遇到回车、换行情况时，自动在下一行开头添加对应的注释标识符，插件提供了一个开关来关闭它，[详情](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#8--%E9%81%87%E5%88%B0%E6%8D%A2%E8%A1%8C%E6%B7%BB%E5%8A%A0%E6%B3%A8%E9%87%8A%E7%AC%A6%E5%8F%B7)。
* 新增功能：在`customMade`配置中，使用`custom_string_obkoro1`属性,允许输出一段自定义的字段，[配置信息](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#7-%E5%9C%A8%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E4%B8%AD%E8%BE%93%E5%87%BA%E4%B8%80%E6%AE%B5%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BF%A1%E6%81%AF)。
* 修复了`---aaaa`、`===aaaa`、`for test`这类~~乱七八糟的~~配置，插件模板不能工作的问题。
* 修改了自定义语言匹配逻辑，匹配不到语言，将会匹配一次文件名后缀.类似这个[issue](https://github.com/OBKoro1/koro1FileHeader/issues/39)提的。
  * 还有一种情况是，比如`a.sh`文件，实际上，vscode中的语言为：`shellscript`不是`shell`，**但是用户不知道该语言的名字，导致配置无法生效**，所以会在匹配不到语言的时候会再去匹配一下后缀，用户食用起来比较简单。



### [V3.7.0]

* 新增[afterAnnotation配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E5%90%8E%E9%9D%A2%E6%8F%92%E5%85%A5%E5%86%85%E5%AE%B9)，用于在注释后方添加配置，场景类似于[issue](https://github.com/OBKoro1/koro1FileHeader/issues/32)
* 修复`Date`和`LastEditTime`字段的顺序与配置中的[顺序不同](https://github.com/OBKoro1/koro1FileHeader/issues/38)(总是插入到最后)
* 修复自定义注释有多余空格时，无法自动更新时间的[bug](https://github.com/OBKoro1/koro1FileHeader/issues/27)
* 默认在`py`文件头部注释前面增加内容去掉，有需要的[自行添加](https://github.com/OBKoro1/koro1FileHeader/issues/21)。

### [V3.6.0]

* [修复bug](https://github.com/OBKoro1/koro1FileHeader/issues/23)

### [V3.5.0]

* [文件头部注释前面增加内容](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#5-%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E5%89%8D%E9%9D%A2%E6%8F%92%E5%85%A5%E5%86%85%E5%AE%B9),`py`文件前面一般要加两行内容，如：

```
#!/usr/bin/env python
# coding=UTF-8
'''
@Author: TavisD
@Date: 2017-10-16 13:03:37
@LastEditors: TavisD
@LastEditTime: 2019-01-11 12:26:24
@Description: file content
'''
```

* 特殊字段：`Date`、`LastEditTime`、`LastEditors`,[允许用户自定义](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#6-%E7%89%B9%E6%AE%8A%E5%AD%97%E6%AE%B5%E5%85%81%E8%AE%B8%E8%87%AA%E5%AE%9A%E4%B9%89) 。

### [V3.4.0]

* 自定义语言注释，更多详情，参见[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E7%94%A8%E6%88%B7%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E9%87%8A%E7%AC%A6%E5%8F%B7),以下是一些须知：
   1. **此项配置是最高级别的，会覆盖插件的[语言注释格式](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)** 
   2. 任何语言/文件(新的语言、特殊的文件)，用户都可以设置对应的注释符号
   3. 还有一种场景：像[issue](https://github.com/OBKoro1/koro1FileHeader/issues/18)中提到的，**某些库会对注释格式有特殊要求，库会对其识别、处理**。插件标准的注释格式并不能满足需求，此时在`config.language`里添加一项配置即可。
  
* [时间格式自定义](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E7%B2%BE%E7%A1%AE%E5%88%B0%E6%97%A5%E6%9C%9F)，两种形式:
  1.  `2019-01-19 21:29:11`
  2.  `2019-01-19`


### [V3.3.0]

  * 新增配置[autoAlready](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#autoalready%E5%8F%AA%E8%AE%A9%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%AD%E8%A8%80%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A)：开启了[自动添加头部注释功能](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#2-%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E6%96%87%E4%BB%B6%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E5%8F%AF%E9%80%89%E9%A1%B9)后,默认只给[支持语言](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)的文件自动添加头部注释。
    
    这是非常必要的，因为发现存在一些问题，了解[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#autoalready%E5%8F%AA%E8%AE%A9%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%AD%E8%A8%80%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A)

### [V3.2.0]

  * 插件[支持根据文件后缀，头部注释插入到不同行](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#3-%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E7%AC%AC%E5%87%A0%E8%A1%8C%E6%8F%92%E5%85%A5)，比如`php`:

        <?php
        // 第一行需要为`<?php`否则注释不生效
        /*
         * @Author: OBKoro1
         * @Github: https://github.com/OBKoro1
         * @Date: 2018-12-21 10:49:35
         * @LastEditors: OBKoro1
         * @LastEditTime: 2018-12-21 13:12:37
         * @Description: 
         */
        ?>

  * 插件新增支持`md`后缀文件的头部注释，效果如下:

        <!--
        * @Author: OBKoro1
        * @Github: https://github.com/OBKoro1
        * @Date: 2018-12-20 13:43:44
        * @LastEditors: OBKoro1
        * @LastEditTime: 2018-12-20 13:48:36
        * @Description: 
        -->
    我平常写`markdown`比较多，可以用于记录`md`的创建日期和修改日期。

  * 插件支持在线修改配置中的数据，修改配置，再也不用重启VsCode了！

  * 更新函数注释的默认配置,`msg`替换为`description`，这样`description`在VsCode中也会高亮：

        /**
         * @description: 
         * @param {type} 
         * @return: 
         */


### [V3.1.0]

  * 新增自动添加头部注释功能，再也不用担心忘记给文件添加头部注释了！前往[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#2-%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E6%96%87%E4%BB%B6%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E5%8F%AF%E9%80%89%E9%A1%B9)了解详情.

### [V3.0.0]

  * 新增自定义注释的符号，注释生成的样子，全部由你掌控，详情请看[插件配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE)。

  * 头部注释和函数注释现在**支持中文做为注释属性了**,比如：

        "fileheader.cursorMode": {
          "Date": "Do not edit",
          "作者": "your name",
          "功能": ""
        }

  * 函数注释新增Date字段，设置该字段可生成函数注释的时间

  * 修复文件行数不够20行时，无法更新最后编辑时间的bug

  * 修复函数注释在最后一行无法生成的bug

### [V2.9.0]

  * 插件新增支持`vue`后缀文件的头部注释，效果如下:

        <!--
        * @Description: 
        * @Author: OBKoro1
        * @Github: https://github.com/OBKoro1
        * @Date: 2018-11-16 14:38:05
        * @LastEditors: OBKoro1
        * @LastEditTime: 2018-11-19 14:32:45
        -->

### [V2.8.0]

  * 插件新增支持`html`后缀文件的头部注释，效果如下:

        <!--
        * @Description: 
        * @Author: OBKoro1
        * @Github: https://github.com/OBKoro1
        * @Date: 2018-11-16 14:38:05
        * @LastEditors: OBKoro1
        * @LastEditTime: 2018-11-19 14:32:45
        -->

### [V2.7.0]
  
  * 新增[WiKi](https://github.com/OBKoro1/koro1FileHeader/wiki),关于插件的文档都在这里!

  * 插件新增支持`vb`后缀文件注释,按下快捷键检测为`vb`后缀的文件,效果如下
    
        // 头部注释  
        '
        ' @Description: 
        ' @Author: OBKoro1
        ' @Github: https://github.com/OBKoro1
        ' @Date: 2018-11-08 11:09:02
        ' @LastEditTime: 2018-11-08 13:49:26
        '
        // 函数注释
        '
        ' description: 
        ' param {type} 
        ' return: 
        '
  * 修复必须`LastEditors`和`LastEditTime`字段同时存在才会更新最后编辑时间的bug
    
    同时存在或者单独使用`LastEditors`、`LastEditTime`字段都支持更新最后编辑时间和最后编辑人

  * 新增[支持注释格式](https://github.com/OBKoro1/koro1FileHeader/blob/master/document/supportNotes.md)

### [V2.6.0]

  * 新增[常见问题readme](https://github.com/OBKoro1/koro1FileHeader/blob/master/document/commonProblems.md)
  * 修复部分场景下最后编辑时间不更新问题
  * 对单个文件连续操作，最后编辑时间与上次的最后编辑时间相差6666毫秒才会更新

### [V2.5.0]

  * 支持python注释，按下快捷键检测为py后缀的文件，生成`'''`形式的文件头部注释和函数注释。
  * 头部注释Date字段(文件创建时间)从当前时间改为文件的创建时间

### [V2.0.0]

  * 新增在光标出添加注释功能(通常用于函数/方法注释)，同样的支持用户自定义注释选项
  * 修复文件头部注释的默认配置不可删除，配置顺序不可移动的问题
  * 新增mac快捷键