# koroFileHeader 



<a href="https://github.com/OBKoro1/koro1FileHeader">
    <img alt="koro1FileHeader Repo stars" src="https://img.shields.io/github/stars/OBKoro1/koro1FileHeader">
</a>
<a href="https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5">
    <img alt="wiki文档详细" src="https://img.shields.io/badge/wiki文档-齐全详细-blue">
</a>
<a href="https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97">
    <img alt="持续维护" src="https://img.shields.io/badge/2018年开源-持续维护-blue">
</a>
<a href="https://github.com/OBKoro1/koro1FileHeader/releases">
    <img alt="cicd" src="https://img.shields.io/badge/版本打包-release-blue">
</a>
<a href="https://github.com/OBKoro1/koro1FileHeader/blob/master/LICENSE">
    <img alt="开源协议-MIT" src="https://img.shields.io/badge/license-MIT-blue">
</a>

在vscode中用于生成文件头部注释和函数注释的插件，经过多版迭代后，插件：支持所有主流语言,灵活方便，文档齐全，食用简单！觉得插件不错的话，就给个[Star](https://github.com/OBKoro1/koro1FileHeader)⭐️吧~
### 使用效果：

**头部注释和注释图案**

![example.gif](https://raw.githubusercontent.com/OBKoro1/koro1FileHeader/master/images/example.gif)

**函数注释: 自动提取函数参数**

![koroFileHeader函数参数提取](https://github.com/OBKoro1/koro1FileHeader/blob/master/images/function-params.gif?raw=true)

## 简介

1. **文件头部添加注释**:
   
   *  在文件开头添加注释，记录文件信息/文件的传参/出参等
   *  支持用户高度自定义注释选项, 适配各种需求和注释。
   *  保存文件的时候，自动更新最后的编辑时间和编辑人
   *  快捷键：`window`：`ctrl+alt+i`,`mac`：`ctrl+cmd+i`, `linux`: `ctrl+meta+i`

2. **在光标处添加函数注释**:

    * 在光标处自动生成一个注释模板, 自动解析函数参数，生成函数参数注释。
    * 支持用户高度自定义注释选项
    * 快捷键：`window`：`ctrl+alt+t`,`mac`：`ctrl+cmd+t`,`linux`: `ctrl+meta+t`
    * 快捷键不可用很可能是被占用了,[参考这里](https://github.com/OBKoro1/koro1FileHeader/issues/5)

3. [支持一键添加佛祖保佑永无BUG、神兽护体等注释图案](https://github.com/OBKoro1/koro1FileHeader/wiki/%E4%BD%9B%E7%A5%96%E4%BF%9D%E4%BD%91%E6%B0%B8%E6%97%A0BUG%E3%80%81%E7%A5%9E%E5%85%BD%E6%8A%A4%E4%BD%93%E3%80%81%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88)

    ![](https://github.com/OBKoro1/koro1FileHeader/raw/master/images/codeDesign.gif?raw=true)

4. 查看更多[功能](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE),以及有更多需求可以给我提[issue](https://github.com/OBKoro1/koro1FileHeader/issues)。

## 安装

在 Vscode 扩展商店中搜索`koroFileHeader`,点击安装即可。

## 使用

1. 文件头部注释：

    在当前编辑文件中使用快捷键:`window`：`ctrl+alt+i`/`mac`：`ctrl+cmd+i`,即可生成文件头部注释。
    
2. 函数注释：
   
    * 将光标放在函数行或者将光标放在函数上方的空白行
    * 使用快捷键`window`：`ctrl+alt+t`,`mac`：`ctrl+cmd+t`，即可生成函数注释。
    * 事实上，函数注释在文件的任意位置都可生成，这里需要自己控制。

## 注释模板的设置


### 快速查看插件功能与配置方法

[配置字段](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)

## wiki文档

[更新日志](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97)

[支持语言](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)

[插件设置/配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE)

[配置字段](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)

[常见问题](https://github.com/OBKoro1/koro1FileHeader/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)

### 支持功能：

* [支持一键添加佛祖保佑永无BUG、神兽护体等注释图案](https://github.com/OBKoro1/koro1FileHeader/wiki/%E4%BD%9B%E7%A5%96%E4%BF%9D%E4%BD%91%E6%B0%B8%E6%97%A0BUG%E3%80%81%E7%A5%9E%E5%85%BD%E6%8A%A4%E4%BD%93%E3%80%81%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88): 写代码不骚是不行的 ^_^

* [自定义注释模板信息](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%B3%A8%E9%87%8A%E6%A8%A1%E6%9D%BF%E7%9A%84%E8%AE%BE%E7%BD%AE),自动更新最后编辑时间，最后编辑人。 
* [支持几乎所有语言的注释形式](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)
* [自定义注释符号](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#1-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E9%87%8A%E7%AC%A6%E5%8F%B7%E5%8F%AF%E9%80%89%E9%A1%B9)：即使插件不支持的语言，也可以自己定制。
* 检测文件头部没有注释, [自动添加头部注释功能](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#2-%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E6%96%87%E4%BB%B6%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A)，配合[自动添加头部注释黑名单](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E6%96%87%E4%BB%B6%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E9%99%90%E5%88%B6)，麻麻再也不用担心我忘记加注释了.
* 生成头部注释时，自动添加[文件相对于当前项目的文件路径](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#filepath%E6%96%87%E4%BB%B6%E7%9B%B8%E5%AF%B9%E4%BA%8E%E9%A1%B9%E7%9B%AE%E7%9A%84%E8%B7%AF%E5%BE%84)

* [头部注释等宽](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E7%AD%89%E5%AE%BD%E8%AE%BE%E7%BD%AEwidesame)功能，提高文件头部注释的颜值。

* [头部注释第几行插入](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#3-%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E7%AC%AC%E5%87%A0%E8%A1%8C%E6%8F%92%E5%85%A5),类似`PHP`第一行被占用了，通过设置，可以在第二行里面插入。
* 在[头部注释之前、之后插入一段内容](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#5-%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E5%89%8D%E9%9D%A2%E6%8F%92%E5%85%A5%E5%86%85%E5%AE%B9)，类似`python`的环境声明: `#!/usr/bin/env python`
* [特殊字段自定义](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#6-%E7%89%B9%E6%AE%8A%E5%AD%97%E6%AE%B5%E5%85%81%E8%AE%B8%E8%87%AA%E5%AE%9A%E4%B9%89)，类似博客的时间字段有特殊要求。
* 在头部注释/函数注释中[输出一段自定义信息](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#7-%E5%9C%A8%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E4%B8%AD%E8%BE%93%E5%87%BA%E4%B8%80%E6%AE%B5%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BF%A1%E6%81%AF)，可以是版权声明、个性签名、空行等。
* [注释时间格式化](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%97%B6%E9%97%B4%E6%A0%BC%E5%BC%8F%E5%8C%96)
* [匹配到换行自动添加注释符号](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#8--%E9%81%87%E5%88%B0%E6%8D%A2%E8%A1%8C%E6%B7%BB%E5%8A%A0%E6%B3%A8%E9%87%8A%E7%AC%A6%E5%8F%B7)

* 生成头部注释/函数注释时[自动移动光标到`Description`所在行](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87%E5%88%B0description-%E6%89%80%E5%9C%A8%E8%A1%8C).

* [文件diff检查](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6%E4%BF%9D%E5%AD%98%E6%97%B6%E8%BF%9B%E8%A1%8Cdiff%E6%A3%80%E6%9F%A5)：检测只变更`LastEditors`和`LastEditTime`，将回滚该文件，减少无意义的提交。

* [新建文件自动添加头部注释](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A)

* [自动添加头部注释-项目黑名单](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E9%A1%B9%E7%9B%AE%E9%BB%91%E5%90%8D%E5%8D%95)

### 我的其他开源推荐
#### [stop-mess-around](https://github.com/OBKoro1/stop-mess-around)

chrome插件**通过强制的手段禁止大家浪费时间摸鱼**，在上班/学习期间下意识的打开摸鱼网站, 自动检测摸鱼网站, 提示激励信息后, 关闭摸鱼网站。

![](https://github.com/OBKoro1/stop-mess-around/raw/dev/static/start.gif?raw=true)
#### [AutoCommit](https://github.com/OBKoro1/autoCommit)

这是一个用于Git自动commit的VSCode插件，它可以用来补充之前忘记提交commit，帮助你把首页的绿色格子填满。

![](https://github.com/OBKoro1/autoCommit/raw/master/images/autoCommit.gif?raw=true)

### 欢迎赞助

如果觉得插件还不错，对你有所帮助的话，就请我喝杯水吧~

十块八块不嫌多，三块五块也是爱 😘

![](https://github.com/OBKoro1/koro1FileHeader/raw/master/images/money1.jpg?raw=true)

## 最后

如果觉得还不错的话，就给个 [Star](https://github.com/OBKoro1/koro1FileHeader) ⭐️ 鼓励一下我吧~

[掘金](https://juejin.im/user/78820536236951)、[前端进阶积累](http://obkoro1.com/web_accumulate/)、[公众号](https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&h=344&f=jpeg&s=8317)、[GitHub](https://github.com/OBKoro1)、[微信](https://raw.githubusercontent.com/OBKoro1/articleImg_src/master/weibo_img_move/005Y4rCogy1fsnslyz5pnj309j0cdgm6.jpg):OBkoro1、邮箱：obkoro1@foxmail.com