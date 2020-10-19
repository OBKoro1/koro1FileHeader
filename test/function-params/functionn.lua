--[[
Author       : OBKoro1
CreateDate   : 2020-07-26 15:04:38
LastEditors  : OBKoro1
Copyright 2020 OBKoro1 https://github.com/OBKoro1
LastEditTime : 2020-08-18 17:29:07
输出自定义信息
FilePath     : \fileHead\function-params\functionn.lua
Description  : 
--]]
print("line:")


--[[ 函数返回两个值的最大值 --]]
function max(num1, num2)

    if (num1 > num2) then
       result = num1;
    else
       result = num2;
    end
 
    return result;
 end

-- 多个参数
function average(...)
    result = 0
    local arg={...}    --> arg 为一个表，局部变量
end