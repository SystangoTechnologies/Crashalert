/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var Constants = require('react-native');
var {
  AsyncStorage,
} = React;
var Constants = function (){

};

Constants.prototype.getBaseURL = function() {
  var baseURL= "http://sysdev.strat-o-matic.com"; //AWS
  //var baseURL= "http://103.9.12.69:8081/mobile-universe-api/public/index.php"; //RedMine
   //var baseURL= "http://192.168.1.12/mobile-universe-api/public/index.php"; //Local_Dev_Machine
  return baseURL;
}
Constants.prototype.increase_index = function() {
  var count;
  AsyncStorage.getItem("count").then((value) => {
      count = value;
      count = parseInt(count) +1;
      AsyncStorage.setItem("count", count.toString());
  }).done();
}
Constants.prototype.reset_index = function() {
AsyncStorage.setItem("count", "0");
}

module.exports = Constants;
