// cpp

#include <iostream>
using namespace std;
int main( )
{
   // TODO: 会被模仿成函数
   void swap(int,int);  //函数声明
   int i=3,j=5;
   swap(i,j);  //调用函数swap
   cout<<i<<" "<<j<<endl;  //i和j的值未互换
   return 0;
}

/**
 * @brief 111
 * @param {int} a
 * @return {int}
 */
void swap(int a,int b)  //企图通过形参a和b的值互换,实现实参i和j的值互换
{
   int temp;
   temp=a;  //以下3行用来实现a和b的值互换
   a=b;
   b=temp;
}