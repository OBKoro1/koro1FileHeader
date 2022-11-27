<?php
/*
 * Author       : OBKoro1
 * CreateDate   : 2020-08-16 17:38:24
 * @LastEditors  : OBKoro1-test
 * @LastEditTime : 2021-08-23 22:24:21
 * File         : \fileHead\function-params\funnction.php
 * Description  : 222111
 * 2020-08-16 17:38:24
 * Copyright 2020 OBKoro1
 */
// TODO: 啊

/**
 * @description: 
 * @param {*} &$string
 * @return {*}
 */
function sayHi(&$string) {
  echo "$fname Zhang";
}


/**
 * @description: 
 * @param {*} $fname
 * @return {*}
 */
function sayHi2($fname = '默认值') {
    echo "$fname Zhang";
}

/**
 * @description: 
 * @param {*} $oneParameter
 * @param {*} $anotherParameter
 * @return {*}
 */
function myFunc( $oneParameter, $anotherParameter) { 
  // (do stuff here) 
} 

/**
 * @description 
 * @param {*} $unit
 * @param {array} $intervals
 * @return {*}
 */
function total_intervals($unit, DateInterval ...$intervals) {
  $time = 0;
  foreach ($intervals as $interval) {
      $time += $interval->$unit;
  }
  return $time;
}

/**
 * @description 
 * @param {array} $numbers
 * @return {*}
 */
function sum(...$numbers) {
  $acc = 0;
  foreach ($numbers as $n) {
      $acc += $n;
  }
  return $acc;
}

/**
 * @description 
 * @param {string} $message
 * @param {string} $url
 * @param {int} $b
 * @param {bool} $c
 * @return {*}
 */
public function test(string $message, string $url= '', int $b = 3, bool $c = true){

}

/**
 * @description 
 * @param {*} $types
 * @param {*} $coffeeMaker
 * @return {*}
 */
function makecoffee($types = array("cappuccino"), $coffeeMaker = NULL)
{
    $device = is_null($coffeeMaker) ? "hands" : $coffeeMaker;
    return "Making a cup of ".join(", ", $types)." with $device.\n";
}
?>