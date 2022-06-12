/**
 * @description: 
 * @param {*} a
 * @param {*} b
 * @param {array} d
 * @return {*}
 */
function test<T>(a, b = '111', ...d: string[]) {}

/**
 *
 * @param b
 * @param c
 */
function test2(b: string = '2', c?: number[][]) {}

/**
 *
 * @param s
 * @param param1
 * @param k
 * @param param3
 */
function test2(
  s,
  [first, second]: [number, number],
  k,
  { a, b = 0 } = { a: '' }
) {}

const a3: number = (
  [first, second]: [number, number],
  b: string = '2',
  c?: number[][],
  k,
  ...d: string[]
) => {
  return b
}

const a = ({ a, x = 0 } : { a: '' }, b): number => {
  console.log('b')
  return 0
}

/**
 *
 * @param x
 */
function pickCard(x: { suit: string; card: number }[]): number {}

class testClass {
  // * param {number} c
  //  readonly name3: string, public scale: number,
  /**
   * description: 
   * param {number} dd
   * param {*} cc
   * param {string} bb
   * param {*} name1
   * param {*} name
   * param {object} x
   * param {*} readonly
   * param {*} public
   * param {array} param10
   * param {*} k
   * param {*} param12
   * param {array} d
   * return {*}
   */
  constructor(dd: number, cc = test2([ 1, 2 ], { a: 'ccc', d: 'ddd' }),bb: string = '2', name1, name = '2', x: { suit: string, card: number }[], [first, second]: [number, number], k, { a, b = 0 } = { a: '' }, ...d: string[]) {}
  /**
   * description: 
   * param {*} s
   * param {*} first
   * param {*} second
   * param {*} number
   * param {*} k
   * param {*} a
   * param {*} b
   * return {*}
   */  
  test(s, [first, second]: [number, number], k, { a, b = 0 } = { a: '' }) {}
  /**
   * description: 
   * param {*} a
   * param {*} b
   * param {array} d
   * return {*}
   */  
  test333<T>(a, b = '111', ...d: string[]): void{

  }
}

const obj = {
  /**
   * description: 
   * param {*} a
   * param {*} b
   * param {array} d
   * return {*}
   */  
  a: function test333<T>(a, b = '111', ...d: string[]):number{
      return
  },

  /**
   * description: 
   * param {*} a
   * param {*} b
   * param {array} d
   * return {*}
   */  
  b: function ss<T>(a, b = '111', ...d: string[]): T{

  },
  /**
   * description: 
   * param {*} a
   * param {*} b
   * param {array} d
   * return {*}
   */  
  test333<T>(a, b = '111', ...d: string[]){

  }
  d(){

  }
}
