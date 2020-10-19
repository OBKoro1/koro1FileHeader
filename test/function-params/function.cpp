// C语言和 c++一样
int max(int num1, int num2) 
{
   // 局部变量声明
   int result;
 
   if (num1 > num2)
      result = num1;
   else
      result = num2;
 
   return result; 
}


// TODO: 参数都在第二个 识别到逗号隔开

int sum(int a, int b=20)
{
  int result;
 
  result = a + b;
  
  return (result);
}