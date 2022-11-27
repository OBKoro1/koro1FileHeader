/*
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-12-13 17:53:45
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-12-23 19:56:11
 * @Description:  c 语言
 */

/**
 * @description: 函数返回两个数中较大的那个数
 * @param {*}
 * @return {*}
 */
int max(int num1, int num2) {
   /* 局部变量声明 */
   int result;
 
   if (num1 > num2)
      result = num1;
   else
      result = num2;
 
   return result; 
}