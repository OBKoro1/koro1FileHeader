/*
 * Author       : OBKoro1 obkoro1@foxmail.com
 * Date         : 2022-05-01 15:35:12
 * Last Author  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-06-04 11:29:13
 * FilePath     : /fileHead/fileHeader/test.go
 * description  : 
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1 email: obkoro1@foxmail.com, All Rights Reserved. 
 */


 /* 函数返回两个数的最大值 */
func max(num1, num2 int) int {
	/* 声明局部变量 */
	var result int
 
	if (num1 > num2) {
	   result = num1
	} else {
	   result = num2
	}
	return result 
 }

 package main

import "fmt"

/**
 * @description: 
 * @param x [type]
 * @param y [string]
 * @return [type]
 */
func swap(x, y string) (string, string) {
   return y, x
}

func main() {
   a, b := swap("Google", "Runoob")
   fmt.Println(a, b)
}