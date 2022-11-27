/*
 * Author       : OBKoro1
 * CreateDate   : 2020-08-16 16:06:55
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-05-15 10:47:35
 * File         : \fileHead\function-params\function.java
 * Description  : 11111
 */
public class TestMax {
   /** 主方法 */
   /**
    * @description: 
    * @param {String[]} args:
    * @param {String} message:
    * @param {int} n:
    * @return {type}
    */
   public static void main (String[]  args, String message, int n) {
      int i = 5;
      int j = 2;
      int k = max(i, j);
      System.out.println( i + " 和 " + j + " 比较，最大值是34323555111133332221：" + k);
   }

   /**
    * @description: 
    * @param {list<int[],map<string,int>>} num1:
    * @param {list2<int[],map<string,int>>} num2:
    * @return {type}
    */
   public static int max(list<    int[]         , map<string, int>> num1, list2<int[],map<string,int>> num2) {
      int result;
      if (num1 > num2)
         result = num1;
      else
         result = num2;
 
      return result; 
   }
      /**
       * @description: 
       * @param {double...} numbers:
       * @param {int} num2:
       * @return {type}
       */
      public static int max2(double... numbers, int num2) {
          
   }

   public String runtimeException(Exception e) {
   }
   
}

// 一个简单的构造函数
class MyClass {
  int x;
 
  // 以下是构造函数
  MyClass(int i ) {
    x = i;
  }
}