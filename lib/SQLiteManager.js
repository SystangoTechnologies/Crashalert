/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React from 'react-native';
var SQLite = require('react-native-sqlite-storage')
import  {Alert, Platform} from 'react-native'
var AddDeviceInfo = require('./AddDeviceInfo').default

var RNSystangoBugReporter = require('react-native').NativeModules.RNCrashReporter;


let instance = null;

var database_name = "Bugs.db";
var database_version = "1.2";
var database_displayname = "SQLite Bugs Database";
var database_size = 200000;
let db;
let that;
var _deviceInfo;

let deviceID;

var reportDeviceInfo;
var reportUserSteps;
var reportCrash;

let finalCrashReportArray = []

let reportCrashCallBack;
let arrayLength = 0;
let arrayCount = 0;

export default class SQLiteManager {

  /**
   * ## Constructor
   */
   constructor() {

       //Initializing singleton instance
       if(!instance){

         instance = this;

         //*> Open Database
         instance.openDatabase()
     }

     return instance;
   }

  openDatabase(){
      that = this;
      // console.log('Opening database ...');
      instance.db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, that.openCB, that.errorCB);
      instance.populateDatabase(db);
  }

  populateDatabase(db){

      instance.db.executeSql('SELECT version_id FROM Version LIMIT 1', [],
          function () {
            console.log('Database is ready ... executing query ...');
            that.callAddDeviceInfo()

          },
          function (error) {

              console.log("received version error:", error);
              console.log('Database not yet ready ... populating data');

              instance.db.transaction(that.populateDB, that.errorCB, function () {
                console.log("Database populated ... executing query ...");
                instance.callAddDeviceInfo()
              });
          });
  }

  callAddDeviceInfo() {
    //*> Get Device Info
   var deviceInfo =  new AddDeviceInfo().getDeviceInfo();

   //*> Add device info to local DB
   instance.addDeviceInfo(deviceInfo)
  }

  populateDB(tx) {

      console.log("Executing DROP stmts");

      tx.executeSql('DROP TABLE IF EXISTS Version;');
      tx.executeSql('DROP TABLE IF EXISTS User_steps;');
      tx.executeSql('DROP TABLE IF EXISTS User_device_configuration;');

      console.log("Executing CREATE stmts");

      tx.executeSql('CREATE TABLE IF NOT EXISTS Version(version_id INTEGER PRIMARY KEY NOT NULL); ', [], that.successCB, that.errorCB);
      tx.executeSql('CREATE TABLE IF NOT EXISTS User_steps(u_s_id INTEGER PRIMARY KEY AUTOINCREMENT, u_d_c_id INTEGER, class TEXT, methodName TEXT, actionOn TEXT, date INTEGER, description TEXT); ', [], that.successCB, that.errorCB);
      tx.executeSql('CREATE TABLE User_device_configuration(u_d_c_id INTEGER PRIMARY KEY AUTOINCREMENT, os_version TEXT, platform TEXT, release_version TEXT, manufacturer TEXT, model TEXT, date INTEGER); ', [], that.successCB, that.errorCB);
      tx.executeSql('CREATE TABLE Crash_report(c_id INTEGER PRIMARY KEY AUTOINCREMENT, u_d_c_id INTEGER, error_msg TEXT, error_stacktrace TEXT); ', [], that.successCB, that.errorCB);

      console.log("Executing INSERT stmts");
      tx.executeSql('INSERT INTO Version (version_id) VALUES (1);', []);

      console.log("all config SQL done");
  }


  //---------------------------------------------------------------------------------

  /*
  ******** Add Device Info  *******
  */
  addDeviceInfo(deviceInfo) {

    _deviceInfo = deviceInfo;

    //*> Add device info
      instance.deviceInfoErrorCB()
  }

  async getDeviceInfo(callBack) {

    instance.reportCrashCallBack = callBack
    instance.finalCrashReportArray = [];
    instance.arrayLength = 0;
    instance.arrayCount = 0;


    instance.db.transaction(that.queryDeviceInfo,that.errorCB, function () {
        console.log("Transaction is now finished device info");
        //that.closeDatabase();
    });
  }

  queryDeviceInfo(tx) {
      console.log("Executing sql...");
      tx.executeSql('SELECT * FROM User_device_configuration order by date DESC', [],
          that.queryDeviceInfoSuccess,that.errorCB);
  }

  queryDeviceInfoSuccess(tx,results) {
    console.log("Query completed device info");


    var len = results.rows.length;
    instance.arrayLength = len;
    for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        instance.getUserSteps(row)
    }

  }

  deviceInfoErrorCB() { //*> if this device not inserted already then store it

    var deviceInfo = _deviceInfo;

   instance.db.transaction((tx) => {

    var sql = "INSERT INTO User_device_configuration (os_version, platform, release_version, manufacturer, model, date) VALUES ('"+deviceInfo.osVersion+"', '"+deviceInfo.platform+"', '"+deviceInfo.releaseVersion+"', '"+deviceInfo.menufacturer+"', '"+deviceInfo.model+"', CURRENT_TIMESTAMP);"
    console.log("sql=", sql);
    tx.executeSql(sql, [], (tx, results) => {
      var selectQuery = "SELECT * FROM User_device_configuration where os_version='"+deviceInfo.osVersion+"' and platform='"+deviceInfo.platform+"' and release_version='"+deviceInfo.releaseVersion+"' and manufacturer='"+deviceInfo.menufacturer+"' and model='"+deviceInfo.model+"'"

      tx.executeSql(selectQuery, [],
          (tx, results) => {

            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                instance.deviceID = row.u_d_c_id
            }
          },that.errorCB);
        }, that.errorCB);
    });
}


//---------------------------------------------------------------------------------

/*
******** Add user steps  *******
*/
addUserStep(userStep) {
  instance.db.transaction((tx) => {

    var description='';

    if (userStep.actionOn.length > 0) {
      description = 'User clicked on '+ userStep.methodName +' in class '+userStep.className +' with action on '+userStep.actionOn
    } else {
      description = 'User clicked on '+ userStep.methodName +' in class '+userStep.className
    }

    var sql = "INSERT INTO User_steps (u_d_c_id, class, methodName, actionOn, date, description) VALUES ("+instance.deviceID+", '"+userStep.className+"', \""+userStep.methodName+"\", \""+userStep.actionOn+"\", CURRENT_TIMESTAMP, \""+description+"\");";
    console.log("sql=", sql);
    tx.executeSql(sql, [], (tx,results) => {

      var device_Id = ''+instance.deviceID

    });
  });


}

 async getUserSteps(row) {

  instance.db.transaction((tx) => {

      console.log("Executing sql...");
      var sql = "SELECT * FROM User_steps where u_d_c_id = "+row.u_d_c_id+"";
      tx.executeSql(sql, [],
        (tx,results) => {
          console.log("Query completed user steps");

          var len = results.rows.length;
          var userStepArray = []
          for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              userStepArray.push(row)
          }

          //console.log("user steps length = ", userStepArray.length);


          if (userStepArray.length > 0) {
            instance.getCrashReport(row, userStepArray)
          }
        }
        ,that.errorCB);

  }, that.errorCB, function () {
      console.log("Transaction is now finished");
      //that.closeDatabase();
  });
}

//---------------------------------------------------------------------------------

/*
******** Add Crash Report  *******
*/
addCrashReport(crashReport) {

  console.log('Opening database ... 1');
  instance.db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, that.openCB, that.errorCB);

  instance.db.transaction((tx) => {
    //var sql = "INSERT INTO Crash_report (u_d_c_id, error_msg, error_stacktrace) VALUES ("+instance.deviceID+", \""+crashReport.errorMsg+"\", '');";

    var sql = "INSERT INTO Crash_report (u_d_c_id, error_msg, error_stacktrace) VALUES (?,?,?);";
    console.log("sql=", sql);
    tx.executeSql(sql, [instance.deviceID, crashReport.errorMsg, '']);
  });
}

 async getCrashReport(rowDeviceInfo, userStepsArray ) {

  instance.db.transaction((tx) => {
      console.log("Executing sql...");
      var sql = "SELECT * FROM  Crash_report where u_d_c_id="+rowDeviceInfo.u_d_c_id+"";
      tx.executeSql(sql, [],
        (tx,results) => {

          var len = results.rows.length;
          console.log("Query completed get crash query completed=", len);

          var crashValue;
          for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              crashValue = row;

              var finalReport = {
                User_Device_Information : rowDeviceInfo,
                User_Steps: userStepsArray,
                Crash_Point: crashValue
              }

              //var strReport = JSON.stringify(finalReport);

              instance.finalCrashReportArray.push(finalReport)

              break;
          }

          instance.arrayCount = instance.arrayCount + 1;


            instance.reportCrashCallBack(instance.finalCrashReportArray)


        },that.errorCB);

  },that.errorCB, function () {
      console.log("Transaction is now finished");
      //that.closeDatabase();
  });
}

/*
******** Delete all data from local  *******
*/
deleteAllReportData() {
  instance.db.transaction((tx) => {
    var sql_crash = "DELETE from Crash_report;";
    var sql_steps = "DELETE from User_steps;";
    var sql_device = "DELETE from User_device_configuration;";


      tx.executeSql(sql_crash, [], (tx,results) => {
        tx.executeSql(sql_steps, [], (tx,results) => {
          tx.executeSql(sql_device, [], (tx,results) => {
              instance.callAddDeviceInfo()
          });
        });
      });






  });
}

//---------------------------------------------------------------------------------

  errorCB(err) {
      console.log("error: ",err);
      return false;
  }

  successCB() {
      console.log("SQL executed ...");
  }

  openCB() {
    console.log("Database OPEN");

  }

  closeCB() {
    console.log("Database CLOSED");

  }

  deleteCB() {
      console.log("Database DELETED");
  }

}
