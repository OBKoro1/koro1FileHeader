/**
 * @file main.cpp
 *@mainpage  Test Application
 * @author PeripateticWind (zhangzhihong@stu.xjtu.edu.cn)
 * @brief the main node file of the application
 * @version 1.0.0
 * @date 2020-02-12 11:19:22
 * @lasteditor PeripateticWind
 * @lastedittime 2020-02-12 11:19:22
 * @email zhangzhihong@stu.xjtu.edu.cn
 * @company test company
 * @todo To Do List
 * -# todo item1
 * @section introduction_ection Introduction
 * this is just a test project
 * @section dependencies_section Dependencies
 * c++11 CMake
 * @section note_section Note Items
 * no todo items
 * @section install_section Installation
 * @subsection step1 Step 1: pre-install the application
 * -# just need c++11 and CMake
 * @subsection step2 Step 2: install the application
 * @code
 * cd commitizen_test
 * mkdir build
 * cmake ..
 * make
 * ./test_node
 * @endcode
 * @copyright Copyright (c) 2020 PeripateticWind.   All rights reserved.
 * @license Licensed under the MIT License.
 * @par Changelog
 * <table>
 * <caption>Change Log</caption>
 * <tr><th>Date       <th>Version <th>Author  <th>Description
 * <tr><td>2020-02-12 11:19:22 <td>1.0.0     <td>PeripateticWind     <td>change log
 * </table>
 *
 **/

#include "test.h"

// STL
#include <algorithm>
#include <iostream>

namespace youibot
{
int testValue;
class Name
{
private:
    int _name;

public:
        Name(int name):_name(name{}
};
Name n;
}  // namespace youibot

int main(int argc, char** argv)
{

    Test t(5);
    t.showInfo();
    std::cout << "The value of object t is " << t.getValue() << std::endl;
    return 0;
}
