/*
 * Author       : OBKoro1
 * CreateDate   : 2020-12-24 14:33:48
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-12-24 15:01:59
 * File         : \fileHead\function-params\rust-function.rs
 * Description  : rust 语言
 * 2020-12-24 14:33:48
 * Copyright 2020 OBKoro1
 */

 /**
  * @description: 
  * @param {*} x
  * @param {*} y
  * @return {*}
  */ 
 fn print_sum(x, y) {
    println!("sum is: {}", x + y);
 } 

/**
 * @description: 
 * @param {i32} a
 * @param {i32} b
 * @return {*}
 */
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}