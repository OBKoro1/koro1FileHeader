function test(a, b) {}

function test2(a, ...b) {

  function test3(a = 'ssss', ...b) {} 
  function(a = 'ssss', ...  b) {}

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
