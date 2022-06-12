/*
 * Author       : OBKoro1
 * Date         : 2021-11-01 22:27:20
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-04 00:07:57
 * FilePath     : /fileHead/function-params/function.sol
 * description  :
 * koroFileheader VSCode插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
 */

/**
 * description: 
 * param x [uint256]
 * param y [uint256]
 * return [type]
*/
function multiply(uint256 x, uint256 y) returns (uint256 z) {
    // 这只是个普通的注释，不会被 natspec 解释
    z = x * y;
}

/**
 * description: 
 * param [type]
 * return [type]
 */
function g() returns (uint256, uint256) {
    //任意顺序的通过变量名来指定参数值
    return f({value: 2, key: 1}); //2,1
}

/**
 * description: 
 * param a [uint256]
 * param b [uint256]
 * return [type]
 */
function output4(uint256 a, uint256 b) returns (uint256 mul) {
    mul = a * b;
    //不能混合使用两种定义方式
    //使用`return`时要返回所有定义
    //Untitled3:18:9: Error: Different number of arguments in return statement than in returns declaration.
    return 1; //1
}
