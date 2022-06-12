<?php
function sayHi($fname) {
  echo "$fname Zhang";
}

function sayHi2($fname = '默认值') {
    echo "$fname Zhang";
  }
  
sayhi(); // 调用函数
?>