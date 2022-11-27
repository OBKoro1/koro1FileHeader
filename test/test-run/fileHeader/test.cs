/*
 * Author       : OBKoro1 obkoro1@foxmail.com
 * Date         : 2022-05-15 10:52:39
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-05-21 17:56:27
 * FilePath     : /fileHead/fileHeader/test.cs
 * description  : c#
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1 email: obkoro1@foxmail.com, All Rights Reserved. 
 */


private static string GetText(string path, string filename)
{
     var reader = File.OpenText($"{AppendPathSeparator(path)}{filename}");
     var text = reader.ReadToEnd();
     return text;

     string AppendPathSeparator(string filepath)
     {
        return filepath.EndsWith(@"\") ? filepath : filepath + @"\";
     }
}

public class C
{
    public void M()
    {
        int result = add(100, 200);
        // 本地函数 add
        int add(int a, int b) { return a + b; }
    }
}

/// <summary>
/// 
/// </summary>
/// <param name="a"></param>
/// <param name="b"></param>
public void DoSomething(float a,string b){
    
}


    /// <summary>
    /// 自定义类
    /// </summary>
    public class MyClass
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int MyCode { get; set; }

        /// <summary>
        /// 设置编号
        /// </summary>
        /// <param name="myCode">编号</param>
        public void SetMyCode(int myCode)
        {
            this.MyCode = myCode;
        }
    }