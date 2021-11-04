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
   *  快捷键：`window`：`ctrl+alt+i`,`mac`：`ctrl+cmd+i`, `linux`: `ctrl+meta+i`,`Ubuntu`: `ctrl+super+i`

2. **在光标处添加函数注释**:

    * 在光标处自动生成一个注释模板, 自动解析函数参数，生成函数参数注释。
    * 支持用户高度自定义注释选项
    * 快捷键：`window`：`ctrl+alt+t`,`mac`：`ctrl+cmd+t`,`linux`: `ctrl+meta+t`, `Ubuntu`: `ctrl+super+t`
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

### 设置注释模板

* 默认配置:
  
  在用户首选项中搜索`fileheader`，默认配置为：

        "fileheader.customMade": {} // 头部注释
        "fileheader.cursorMode": {} // 函数注释 

 * 自定义模板：
    
   * 在用户设置中，搜索`fileheader`  
   * **复制默认配置+修改配置**
   * **重启编辑器生效**
    
      ![](https://github.com/OBKoro1/koro1FileHeader/raw/master/images/seting-muba.jpg?raw=true)

    如上设置，生成注释：
```js
// 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
// 在注释之前添加内容
/*
/*
 * Author       : OBKoro1 // 提供自动对齐注释FilePath字段的功能:`wideSame`
 * Date         : 2019-09-24 20:25:33
 * LastEditors  : OBKoro1 // 自动更新最后编辑人
 * LastEditTime : 2019-12-16 21:16:08 // 自动更新最后编辑时间
 * FilePath     : /fileHead/test.js // 自动添加项目路径
 * 自定义信息, 自动移动光标到Description上
 * 遇到换行符自动换行
 */
// 在注释之后添加内容
// 函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
/**
 * @description: 
 * @param {type} 
 * @return: 
 */
```


### 快速查看插件功能与配置方法

[配置字段](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)

## wiki文档

[更新日志](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97)

[支持语言](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)

[插件设置/配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE)

[配置字段](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)

[常见问题](https://github.com/OBKoro1/koro1FileHeader/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)

### 快速查看插件功能与配置方法

**功能目录**：查看[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE)右侧自动生成的markdown目录，浏览所有最新最全的功能。

**配置简介**：[配置字段](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)


### 我的其他开源推荐
#### [stop-mess-around](https://github.com/OBKoro1/stop-mess-around)

chrome插件**通过强制的手段禁止大家浪费时间摸鱼**，在上班/学习期间下意识的打开摸鱼网站, 自动检测摸鱼网站, 提示激励信息后, 关闭摸鱼网站。

![](https://github.com/OBKoro1/stop-mess-around/raw/dev/static/start.gif?raw=true)
#### [AutoCommit](https://github.com/OBKoro1/autoCommit)

这是一个用于Git自动commit的VSCode插件，它可以用来补充之前忘记提交commit，帮助你把首页的绿色格子填满。

![](https://github.com/OBKoro1/autoCommit/raw/master/images/autoCommit.gif?raw=true)

### [web-basics](https://github.com/OBKoro1/web-basics)

收集和整理了一个大厂前端需要掌握能力的仓库。

其中分为JS基础能力，大厂场景题、大厂面试真题。

希望能够帮助大家提升自己的能力，在面试的时候能够游刃有余，轻松拿到高薪offer。

![大厂前端需要掌握的能力](https://github.com/OBKoro1/web-basics/blob/main/static/web-basic-example.gif?raw=true)

### 欢迎赞助

如果觉得插件还不错，对你有所帮助的话，就请我喝杯水吧~

十块八块不嫌多，三块五块也是爱 😘

![](https://github.com/OBKoro1/koro1FileHeader/raw/master/images/money1.jpg?raw=true)

### License

[MIT](http://opensource.org/licenses/MIT)

### 求Star

如果觉得还不错的话，就给个 [Star](https://github.com/OBKoro1/koro1FileHeader) ⭐️ 鼓励一下我吧~

## 联系我

[掘金](https://juejin.im/user/78820536236951)、[前端进阶积累](http://obkoro1.com/web_accumulate/)、[公众号](https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&h=344&f=jpeg&s=8317)、[GitHub](https://github.com/OBKoro1)、[微信](https://raw.githubusercontent.com/OBKoro1/articleImg_src/master/weibo_img_move/005Y4rCogy1fsnslyz5pnj309j0cdgm6.jpg):OBkoro1、邮箱：obkoro1@foxmail.com

