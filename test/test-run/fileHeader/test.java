/** 
 * @Author: OBKoro1
 * @Date: 2019-09-24 20:25:33
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-02-05 10:19:02
 * @FilePath: /fileHead/test.java
 * @Description: 
 * @https://github.com/OBKoro1
 */

public class Solution {
    /*
     * @param nums: A list of integers.222
     * @return: A list of permutations.
     */
    public List<List<Integer>> permute(int[] nums) {
        // write your code here
    }
}

/** 返回两个整型变量数据的较大值 */
public static int max(int num1, int num2) {
   int result;
   if (num1 > num2)
      result = num1;
   else
      result = num2;
 
   return result; 
}


public class CommandLine {
   public static void main(String args[]){ 
      for(int i=0; i<args.length; i++){
         System.out.println("args[" + i + "]: " + args[i]);
      }
   }
}