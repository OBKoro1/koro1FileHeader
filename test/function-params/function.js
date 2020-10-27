 
/*
 * Author       : OBKoro1
 * CreateDate   : 2020-10-19 18:06:18
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-10-21 20:46:39
 * FilePath     : \koro1FileHeader\test\function-params\function.js
 * Description  : 文件描述
 */

/**
 * @description: 一键生成函数注释 自动解析函数参数
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {array} params
 * @return {*}
 */
function test(a, b, c = '参数默认值', ...params) {

}


class {
  /**
   * description: 
   * param {*} a
   * param {*} b
   * param {*} c
   * return {*}
   */  
  constructor (a,b,c){

  }
  test() {

  }
}

let obj = {
  /**
   * @description: 
   * @param {*} c
   * @param {*} d
   * @param {array} a
   * @return {*}
   */  
  test(c, d = 2, ...a){
    console.log('test111')
  },
  a: () => {

  },
  b: function (a,b,v) {

  }
}


/**
 * description: 
 * param {array} c
 * return {*}
 */
let a = (...c) => c

let b = c => c

/**
 * description: 
 * param {*} c
 * param {*} d
 * return {*}
 */
let b1 = ( c = test(), d) => {}

let a1 = ( c) => {
  console.log('啦啦啦')
}

let a2 = ( c, ...d) => {}
