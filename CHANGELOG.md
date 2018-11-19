# 更新日志

## language

简体中文 | [English](https://github.com/OBKoro1/koro1FileHeader/wiki/change-log)

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