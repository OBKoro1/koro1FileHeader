# CHANGELOG

### [V2.7.0]

New [WiKi](https://github.com/OBKoro1/koro1FileHeader/wiki), about plug-in every thing.

* support ` vb ` suffix file annotation, press the shortcut key detection for ` vb ` file suffix, results are as follows

        // header notes  
        '
        ' @Description: 
        ' @Author: OBKoro1
        ' @Github: https://github.com/OBKoro1
        ' @Date: 2018-11-08 11:09:02
        ' @LastEditTime: 2018-11-08 13:49:26
        '
        // function notes
        '
        ' description: 
        ' param {type} 
        ' return: 
        '
* must repair ` LastEditors ` and ` LastEditTime ` fields exist at the same time will update the last edit time bug

  Exist at the same time or used separately ` LastEditors `, ` LastEditTime ` field support to update the last edit time and final editing

* new [supports annotation format] (https://github.com/OBKoro1/koro1FileHeader/blob/master/document/supportNotes-en.md)

### [V2.6.0]

* new [FAQ readme] (https://github.com/OBKoro1/koro1FileHeader/blob/master/commonProblems-en.md)
* the last edit time under fixed part of the scenario is not updated
* for a single file, the last edit time is 6666 milliseconds from the last edit time before it is updated

### [V2.5.0]

  * Support python annotation, press the shortcut key detection in py extension file, generate ` "' ` forms of comments and function annotations file head.
  * The header comment Date field (file creation time) is changed from the current time to the file creation time

### [V2.0.0]

  * Add comment function at cursor output (usually used for function/method annotations), the same support for user-defined annotation options
  * The default configuration of the fix file header annotation is not removable, and the configuration order is not removable
  * New MAC shortcuts