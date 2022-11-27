/*
 * Author       : OBKoro1
 * CreateDate   : 2020-12-23 19:43:47
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-12-24 14:13:38
 * File         : \fileHead\function-params\c_function.c
 * Description  : c语言 
 * 2020-12-23 19:43:47
 * Copyright 2020 OBKoro1
 * 种一棵树最好的时间是在十年前, 其次就是现在了。
 */
 
// languageId: c

int max(int num1, int num2) {
   /* 局部变量声明 */
   int result;
 
   if (num1 > num2)
      result = num1;
   else
      result = num2;
 
   return result; 
}

/**
 * @description: 
 * @param {int} a
 * @param {int} b
 * @param {array} args
 * @return {*}
 */
int sum(int a, int b=20, ...)
{
  int result;
 
  result = a + b;
  
  return (result);
}

/**
 * @description: 
 * @param {int} *x
 * @param {int} *y
 * @return {*}
 */
void swap(int *x,int *y)
{
    int *tmp= NULL;
    tmp=x;
    x=y;
    y=tmp;
        printf("inside:形参为*x,*y\n*x=%d,x=%d,地址为%d\n*y=%d,y=%d,地址为%d\n\n",*x,x,&x,*y,y,&y);
}

/**
 * @description: 
 * @param {int} &x
 * @param {int} &y
 * @return {*}
 */
void swap2(int &x,int &y)
{
    int tmp;
    tmp=x;
    x=y;
    y=tmp;
        printf("inside:形参为&x,&y\nx=%d,地址为%d\ny=%d,地址为%d\n\n",x,&x,y,&y);
}