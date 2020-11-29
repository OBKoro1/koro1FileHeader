<!--
 * Author       : OBKoro1
 * Date         : 2020-02-17 13:24:54
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-11-29 15:31:35
 * FilePath     : \koro1FileHeader\CHANGELOG.md
 * Description  : 
 * https://github.com/OBKoro1
 -->


# 更新日志

### 如果觉得本插件还不错的话，给个[Star](https://github.com/OBKoro1/koro1FileHeader)吧~

### [V4.7.12]

* add: 增加在函数内生成函数注释的功能，[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E5%87%BD%E6%95%B0%E5%86%85%E7%94%9F%E6%88%90%E5%87%BD%E6%95%B0%E6%B3%A8%E9%87%8A)。

设为true开启：

```js
"fileheader.configObj": {
  "cursorModeInternal": false // 默认关闭
}
```

示例：

```js
/**
 * @description: 未开启：注释在函数外
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
function test(a, b) {

}
// 某些语言的注释是写在函数内的
function test(a, b) {
/**
 * @description: 开启后：注释在函数内
 * @param {*} a
 * @param {*} b
 * @return {*}
 */

} 
```

* 废弃`typeParam`: 函数注释默认生成type
```js
/**
 * description: 多了{*}
 * param {*} 
 * return {*} 
 */
```

### [V4.7.11]

* fix: 修复版权声明和时间字段的bug

### [V4.7.10]

* fix: 创建文件自动添加头部注释问题修复

### [V4.7.9]

* fix: 修复获取冒号和感叹号没有做兼容的问题

### [V4.7.8]

* fix: 修复自定义语言冒号未修改成数组形式的问题

### [V4.7.7]

* add: `js`、`html`、`vue`、`ts` 、`go`、`java`、`python`文件后缀的[函数参数自动提取](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E5%87%BD%E6%95%B0%E6%B3%A8%E9%87%8A%E8%87%AA%E5%8A%A8%E6%8F%90%E5%8F%96%E5%87%BD%E6%95%B0%E7%9A%84%E5%8F%82%E6%95%B0)。
* add: [@符号`atSymbol`和冒号`colon`在函数注释和头部注释中可以分别设置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E9%87%8A%E4%B8%AD%E7%9A%84%E8%89%BE%E7%89%B9%E5%92%8C%E5%86%92%E5%8F%B7)，现在值改为数组形式:第一个元素是头部注释的设置,第二个元素。ps: 原先字符串模式也做了兼容。
* fix: [修复linux文件创建时间错误的问题](https://github.com/OBKoro1/koro1FileHeader/issues/223)。
### [V4.7.6]

* 随机注释图案：[命令行随机注释图案](https://github.com/OBKoro1/koro1FileHeader/wiki/%E4%BD%9B%E7%A5%96%E4%BF%9D%E4%BD%91%E6%B0%B8%E6%97%A0BUG%E3%80%81%E7%A5%9E%E5%85%BD%E6%8A%A4%E4%BD%93%E3%80%81%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88#%E9%9A%8F%E6%9C%BA%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88)、[快捷键默认随机图案注释](https://github.com/OBKoro1/koro1FileHeader/wiki/%E4%BD%9B%E7%A5%96%E4%BF%9D%E4%BD%91%E6%B0%B8%E6%97%A0BUG%E3%80%81%E7%A5%9E%E5%85%BD%E6%8A%A4%E4%BD%93%E3%80%81%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88#%E9%87%87%E7%94%A8%E5%93%AA%E4%B8%AA%E5%9B%BE%E6%A1%88%E6%B3%A8%E9%87%8A)
* 新增快捷键window：`ctrl+alt+j`, mac：`ctrl+cmd+j`: [快速添加图案注释](https://github.com/OBKoro1/koro1FileHeader/wiki/%E4%BD%9B%E7%A5%96%E4%BF%9D%E4%BD%91%E6%B0%B8%E6%97%A0BUG%E3%80%81%E7%A5%9E%E5%85%BD%E6%8A%A4%E4%BD%93%E3%80%81%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88#%E5%BF%AB%E6%8D%B7%E9%94%AE%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88)。
* 功能: [所有生成头部注释的场景都会生成图案注释](https://github.com/OBKoro1/koro1FileHeader/wiki/%E4%BD%9B%E7%A5%96%E4%BF%9D%E4%BD%91%E6%B0%B8%E6%97%A0BUG%E3%80%81%E7%A5%9E%E5%85%BD%E6%8A%A4%E4%BD%93%E3%80%81%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88#%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E5%B8%A6%E4%B8%8A%E5%9B%BE%E6%A1%88%E6%B3%A8%E9%87%8A)

### [V4.7.5]

* 新增`typeParam`，该选项用于控制是否需要`{type}`, 默认为`true`。
* 修复`specialOptions`特殊字段修改后，值为`Do not edit`的情况

### [V4.7.4]

* 新增[自动添加头部注释白名单](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E6%96%87%E4%BB%B6%E7%99%BD%E5%90%8D%E5%8D%95)`supportAutoLanguage`, 设置后只允许指定的文件自动添加文件头部注释。
* 新增[支持语言](https://github.com/OBKoro1/koro1FileHeader/wiki/%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)`lua`: `--[[--]]`
* 新增支持[输出多个自定义信息](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#7-%E5%9C%A8%E6%B3%A8%E9%87%8A%E4%B8%AD%E8%BE%93%E5%87%BA%E4%B8%80%E6%AE%B5%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BF%A1%E6%81%AF)(`custom_string_obkoro1`~`custom_string_obkoro100`)。
* 新增版权(`custom_string_obkoro1_copyright`)和时间(`custom_string_obkoro1_date`)自定义信息字段

多个自定义信息和版权、时间自定义信息字段设置与输出： 

```js
 "fileheader.customMade": {
     "custom_string_obkoro1_date": "Do not edit", // 不带Date前缀的时间
    "Github": "https://github.com/OBKoro1",
    "custom_string_obkoro2": "custom_string_obkoro1~custom_string_obkoro100都可以输出自定义信息",
    "Author": "OBKoro1",
    "custom_string_obkoro1_copyright": "Copyright ${now_year} OBKoro1", // 版权声明 自动替换年份
    "custom_string_obkoro1": "可以输入预定的版权声明、个性签名、空行等"
  }
```

```js
/** 
 * 2020-07-03 14:50:17 // 不带Date字段的时间
 * @Github: https://github.com/OBKoro1
 * custom_string_obkoro1~custom_string_obkoro100都可以输出自定义信息
 * @Author: OBKoro1
 * Copyright 2020 OBKoro1 // 版权字段
 * 可以输入预定的版权声明、个性签名、空行等 // 使用atSymbol字段可以去掉@
 */
```

* 修复了linux无法获取文件创建时间的问题，如果无法获取该值则默认设为当前时间。
* 新增草泥马、甩葱少女、全键盘、小键盘、草泥马2多种注释图案，查看所有[注释图案](https://github.com/OBKoro1/koro1FileHeader/wiki/%E4%BD%9B%E7%A5%96%E4%BF%9D%E4%BD%91%E6%B0%B8%E6%97%A0BUG%E3%80%81%E7%A5%9E%E5%85%BD%E6%8A%A4%E4%BD%93%E3%80%81%E6%B3%A8%E9%87%8A%E5%9B%BE%E6%A1%88)。

**甩葱少女**

```js
/*
 * _______________#########_______________________ 
 * ______________############_____________________ 
 * ______________#############____________________ 
 * _____________##__###########___________________ 
 * ____________###__######_#####__________________ 
 * ____________###_#######___####_________________ 
 * ___________###__##########_####________________ 
 * __________####__###########_####_______________ 
 * ________#####___###########__#####_____________ 
 * _______######___###_########___#####___________ 
 * _______#####___###___########___######_________ 
 * ______######___###__###########___######_______ 
 * _____######___####_##############__######______ 
 * ____#######__#####################_#######_____ 
 * ____#######__##############################____ 
 * ___#######__######_#################_#######___ 
 * ___#######__######_######_#########___######___ 
 * ___#######____##__######___######_____######___ 
 * ___#######________######____#####_____#####____ 
 * ____######________#####_____#####_____####_____ 
 * _____#####________####______#####_____###______ 
 * ______#####______;###________###______#________ 
 * ________##_______####________####______________ 
 */
```

**草泥马2**

```js
/*
 * 
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃　
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug　　
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 */
```

**全键盘**

```js
/*
 *  ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐
 *  │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐
 *  └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘
 *  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐
 *  │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │
 *  ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤
 *  │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │
 *  ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │
 *  │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │
 *  ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤
 *  │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │
 *  ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││
 *  │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│
 *  └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘
 */
```


### [V4.7.2]

* 设置`linux`下的注释快捷键为: `ctrl+meta+i`、`ctrl+meta+t`

### [V4.7.1]

* 修复`headInsertLine`结合注释图案无效的问题。

### [V4.7.0]


* 新增一键添加佛祖保佑永无BUG、神兽护体等注释图案 支持插件提供的多种注释，支持自定义语言的注释形式。

    ![](https://github.com/OBKoro1/koro1FileHeader/raw/master/images/codeDesign.gif?raw=true)
* `designAddHead`: 提供注释图案和头部注释结合的形式。 示例

```js
/* 
 *                   江城子 . 程序员之歌
 * 
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 * 
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 * 
 * 
 * Author       : OBKoro1
 * Date         : 2020-04-30 15:51:08
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-05-13 13:48:01
 * FilePath     : \fileHead\test.js
 * Description  : 注释图案和头部注释结合
 * https://github.com/OBKoro1
 */
```

### [V4.6.2]

* 新增使用工作区注释模板：[`useWorker`, 用以区分工作区配置模板](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#useworker-%E5%8C%BA%E5%88%86%E5%B7%A5%E4%BD%9C%E5%8C%BA%E9%85%8D%E7%BD%AE%E6%A8%A1%E6%9D%BF)。
* 新建文件黑名单文件不再自动添加头部注释。
* 插件新增支持`dart`注释。
* 修复`CheckFileChange`diff检查的精准度以及将`FilePath`字段也加入diff检查。
* 修复`filePathColon`在window系统下的问题以及无法全部转换的问题。
* 修复包含特殊字段的变量自动转化为注释的问题。
* 修复自定义语言注释等宽失效的问题。
* 修复特殊文件自定义注释失效的问题。


### [V4.6.1]

* 修复更新字段问题

### [V4.6.0]

* 新增[新建文件自动添加头部注释](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A)，默认开启，配置项为`createHeader`。
* 新增[自动添加头部注释项目黑名单](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E9%A1%B9%E7%9B%AE%E9%BB%91%E5%90%8D%E5%8D%95)(`prohibitItemAutoAdd`)，场景: 某些项目没有推广头部注释，然后leader/团队成员反感这种行为时，使用该功能。
* 新增保存时更新`FilePath`, 防止因文件迁移导致路径没有更新的情况。
* 新增自定义语言注释，一次匹配多种文件, 比如c语言的`h/hpp/cpp/cxx/cc`统一修改。
* 新增通配符`*`, 如果设置了通配符当没有匹配到文件时，会自动使用通配符设置，目前支持`headInsertLine`(第几行插入)、`beforeAnnotation`(注释之前添加)、`afterAnnotation`(注释之后添加)
* 新增默认配置中的一些说明。
* 修复更新LastEditors/LastEditTime时没有开启`wideSame`, 没有限制等宽的问题.
* 修复因`wideSame`功能，导致光标无法移动到`Description`的bug。

### [V4.5.2]

* 推荐一个新开源的插件：[Auto Commit](https://github.com/OBKoro1/autoCommit)

  **这是一个用于Git自动commit的VSCode插件，它可以用来补充之前忘记提交commit，帮助你把首页的绿色格子填满**。

![](https://github.com/OBKoro1/autoCommit/blob/master/images/autoCommit.gif?raw=true)

### [V4.5.0]

* [文件diff检查](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6%E4%BF%9D%E5%AD%98%E6%97%B6%E8%BF%9B%E8%A1%8Cdiff%E6%A3%80%E6%9F%A5): 检测文件只变更`LastEditors`和`LastEditTime`字段，将回滚该文件，减少无意义的提交。


功能配置以及说明：

```js
"fileheader.configObj": {
  "CheckFileChange": false // 默认关闭
}
```

**使用场景**: 

对文件进行修改之后又撤销，但是`LastEditors`和`LastEditTime`已经变更了，在提交代码的时候很容易忘记恢复它，导致无意义的提交，反正我很经常遇到这个问题。

**运行逻辑**：

1. 检测VSCode当前打开的文件夹的根目录是够有`.git`文件夹, 没有的话，则退出
2. 获取触发保存文件的diff，进行diff检查。
3. 检测当只有`LastEditors`和`LastEditTime`变更，其他任何变更都没有的情况下。
4. 将该文件回滚到本地仓库的最新版本。

#### 关于功能的安全性：

鉴于之前该功能采用`pre-commit`的方案，造成过[严重的BUG](https://github.com/OBKoro1/koro1FileHeader/issues/84)，新功能的破坏性会小很多，并且文件很容易就可以恢复：

**目前该功能只针对单个文件进行操作，影响范围会比较小，并且挽回方式也比较简单快捷**。

**假如，我是说假如，再有出现文件被回滚的情况，因为这个操作是即时的，并且在每次保存都会触发，如果误将文件回滚了，在该文件上撤销一次即可将文件内容恢复恢复**。


### [V4.4.1]

* `configObj.wideSame`: 新增支持头部注释等宽, 点击查看[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A%E7%AD%89%E5%AE%BD%E8%AE%BE%E7%BD%AEwidesame)，效果如下


```js
/*
 * Author       : OBKoro1
 * Date         : 2019-09-24 20:25:33
 * LastEditors  : OBKoro1
 * LastEditTime : 2019-12-16 21:16:08
 * FilePath     : /fileHead/test.js
 */
```

* 修复`php`文件无法自动添加注释的问题。
* 修复`shell`头部注释第一行没有对齐的问题。

### [V4.3.2]

* 修复`filePathColon`。
* 关闭报错信息展示，设置`showErrorMessage`为`true`重新开启。

### [V4.3.1]

* `filePathColon`: [修改`FilePath`的路径分隔符](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#filepathcolon-%E4%BF%AE%E6%94%B9%E8%B7%AF%E5%BE%84%E5%88%86%E9%9A%94%E7%AC%A6)
* [隐藏插件抛出的错误通知](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E9%9A%90%E8%97%8F%E6%8F%92%E4%BB%B6%E6%8A%9B%E5%87%BA%E7%9A%84%E9%94%99%E8%AF%AF%E9%80%9A%E7%9F%A5)

### [V4.3.0]

* [文件超过一定行数不再自动添加头部注释](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#%E6%96%87%E4%BB%B6%E8%B6%85%E8%BF%87%E4%B8%80%E5%AE%9A%E8%A1%8C%E6%95%B0%E4%B8%8D%E5%86%8D%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0%E5%A4%B4%E9%83%A8%E6%B3%A8%E9%87%8A)(默认为100行)。
* 只允许文件自动添加头部注释一次:

  **如果某个文件曾经自动添加过头部注释，那么插件会记录该文件的路径，在这次VsCode编辑器关闭前，都将不再允许该文件自动添加头部注释**。

  有时候我们并不希望该文件自动添加头部注释，删除也没有用，它会一直手动添加，该功能就是为了用于防止这种情况的。
  
* 通过`showErrorMessage`抛出错误到用户界面。

### [V4.2.3]

* 新增`FilePath`去掉项目名称的[配置](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#filepath%E6%96%87%E4%BB%B6%E7%9B%B8%E5%AF%B9%E4%BA%8E%E9%A1%B9%E7%9B%AE%E7%9A%84%E8%B7%AF%E5%BE%84)
* 修复`FilePath`在window下的路径问题。

### [V4.2.2]

* 修复`FilePath`在window下面的问题

### [V4.2.1]

* 新增`FilePath`字段: 生成头部注释时，自动添加[文件相对于当前项目的文件路径](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#filepath%E6%96%87%E4%BB%B6%E7%9B%B8%E5%AF%B9%E4%BA%8E%E9%A1%B9%E7%9B%AE%E7%9A%84%E8%B7%AF%E5%BE%84)
* [有特殊要求的文件注释](https://github.com/OBKoro1/koro1FileHeader/wiki/配置#有特殊要求的文件注释): 特殊文件头部注释, 以及配套的在注释之前/之后添加内容、指定行数前添加注释
* 支持[移动光标](https://github.com/OBKoro1/koro1FileHeader/wiki/配置#移动光标到description-所在行)到函数注释的`Description`上。
* 新增函数注释输出[自定义信息](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#7-%E5%9C%A8%E6%B3%A8%E9%87%8A%E4%B8%AD%E8%BE%93%E5%87%BA%E4%B8%80%E6%AE%B5%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BF%A1%E6%81%AF)(`custom_string_obkoro1`)。
* 修复函数注释`Date`字段默认为字段顺序问题。
* 修复自动添加注释, 插入顺序混乱的问题。
* 修复readme文档中的快捷键错误

### [V4.1.4]

* 测试`command 'extension.fileheader' not found`的问题


### [V4.1.3]

* 修复已知问题

### [V4.1.0]

* **`pre-commit hooks`**:对改动的文件进行diff检查。

    * 用于检测文件只有最后编辑人/最后编辑时间变更的情况下，将其恢复，并取消`commit`。
    * 功能配置完整的`.git`文件夹检查，详细的控制台日志输出等。
    * [配置、运行流程以及检测规则](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#commithooks)。

* 更新最后编辑人、最后编辑时间以及自动添加注释的触发机制更改：

    *  文件变更并且触发保存事件的情况下，才会触发以上事件。
    *  之前是监听`vscode`保存事件，只要按`command`+`s`就会触发以上事件。

* wiki新增[配置字段](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)，方便更快速查找配置
    
* 使用`process.on('uncaughtException',fn)`拦截错误, 弹窗显示，方便反馈问题

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

* 修复多个换行符，导致换行不彻底的问题。


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