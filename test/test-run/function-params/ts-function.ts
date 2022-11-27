/*
 * Author       : OBKoro1
 * Date         : 2020-08-15 17:30:38
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-07-26 11:57:36
 * FilePath     : ts-function.ts
 * description  : 
 * koroFileheader VSCode插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved. 
 */
// 当文件中出现了 import 会导致该问题
import * as Koa from "koa"
// mysql222
import './configs/mysqlConfig'

const app = new Koa(333332)


/**
 * @description: 
 * @param {*} a
 * @param {*} b
 * @param {array} d
 * @return {*}
 */
function test<T>(a, b = '222', ...d: string[]) {}


/**
 * @description normal
 * @param {number} c
 * @param {string} b
 * @return {*}
 */
/**
 * @description "no type" 没有类型
 * @param c
 * @param b
 * @return {*}
 */
/**
 * @description "no bracket" 没有方括号
 * @param number c
 * @param string b
 * @return {*}
 */
/**
 * @description: 
 * @param [number] c
 * @param [string] b
 * @return [type]
 */

/**
 * @description: 
 * @param [number] c
 * @param [string] b
 * @return [type]
 */
function test2(c: number, b: string = '2') {
}

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


/**
 * @description async
 * @param string axiosMethods
 * @param number apiLink
 * @param Boolean opts
 * @param array fileName
 * @return {*}
 */
const a = async (axiosMethods: string, apiLink: number, opts: Boolean, ...fileName): number => { }

/**
 * @description 
 * @param string axiosMethods
 * @param number apiLink
 * @param Boolean opts
 * @param array fileName
 * @return {*}
 */
const a = (axiosMethods: string, apiLink: number, opts: Boolean, ...fileName): number => { }


/**
 * @description 
 * @param object param1
 * @param * b
 * @return {*}
 */
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
  //  * TODO: c readonly public还没好
  /**
   * @description: 
   * @param {number} dd
   * @param {*} cc
   * @param {string} bb
   * @param {*} name1
   * @param {*} name
   * @param {number} c
   * @param {object} x
   * @param {*} readonly
   * @param {*} public
   * @param {array} param10
   * @param {*} k
   * @param {*} param12
   * @param {array} d
   * @return {*}
   */  
  constructor(dd: number, cc = test2([ 1, 2 ], { a: 'ccc', d: 'ddd' }),bb: string = '2', name1, name = '2', c?: number[][], x: { suit: string, card: number }[], readonly name3: string, public scale: number, [first, second]: [number, number], k, { a, b = 0 } = { a: '' }, ...d: string[]) {}

  /**
   * @description: 
   * @param {*} s
   * @param {array} param2
   * @param {*} k
   * @param {*} param4
   * @return {*}
   */  
  static readonly test(s, [first, second]: [number, number], k, { a, b = 0 } = { a: '' }) {}
  
  /**
   * @description: 
   * @param {*} a
   * @param {*} b
   * @param {array} d
   * @return {*}
   */  
  async test333<T>(a, b = '111', ...d: string[]): void{

  }
}

const obj = {
  /**
   * @description: 
   * @param {*} a
   * @param {*} b
   * @param {array} d
   * @return {*}
   */  
  a: function test333<T>(a, b = '111', ...d: string[]):number{
      return
  },

  /**
   * @description: 
   * @param {*} a
   * @param {*} b
   * @param {array} d
   * @return {*}
   */  
  b: function ss<T>(a, b = '111', ...d: string[]): T{

  },
 
  /**
   * @description: 
   * @param {*} a
   * @param {*} b
   * @param {array} d
   * @return {*}
   */  
  test333<T>(a, b = '111', ...d: string[]){

  }
  d(){

  }
}
