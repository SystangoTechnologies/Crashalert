/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React from 'react';
import { Platform, Alert } from 'react-native'
import stacktraceParser from 'stacktrace-parser';
var SQLiteManager = require('./SQLiteManager').default
var Configuration = require('./Configuration')
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
var Database =require('../../../js/Database.js');
var SendReportOnRemote = require('./SendReportOnRemote').default

var RNSystangoBugReporter = require('react-native').NativeModules.RNCrashReporter;
var sqlMngrObj;


// import _ from 'underscore';
/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let instance = null;
var defaultHandler;

const parseErrorStack = (error)=>{
  if (!error || !error.stack) {
    return [];
  }
  return Array.isArray(error.stack) ? error.stack :
    stacktraceParser.parse(error.stack);
}

export default class CrashReporter {

  /**
   * ## Constructor
   */
  constructor() {

    //*> Creating singleton
    if(!instance){
      if (Configuration.getIsReportCrash()) {

      //Initializing singleton instance
      instance = this;

      this.initializeDBIncetance();

        if (ErrorUtils._globalHandler) {
            instance.defaultHandler = ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler() || ErrorUtils._globalHandler;
            ErrorUtils.setGlobalHandler(instance.wrapGlobalHandler);  //feed errors directly to our wrapGlobalHandler function
        }
    }
  }
    return instance;
  }

  initializeDBIncetance() {
    instance.sqlMngrObj = new SQLiteManager()
  }

  async wrapGlobalHandler(error, isFatal){

      const stack = parseErrorStack(error);
      instance.sqlMngrObj.addCrashReport(
        {
          errorMsg: error.message,
          errorStack: stack.length > 0 ? JSON.stringify(stack[0]) : ''
        }
      )

      //*> Finish activity
      setTimeout (() => {
        instance.defaultHandler(error, isFatal);  //after you're finished, call the defaultHandler so that react-native also gets the error
        if (Platform.OS == 'android') {
          RNSystangoBugReporter.reload()
        }
      }, 2000);
  }

  /*
  * ReportCrash Manually
  */

  async reportHandledCrashes(superClassName, _methodName, actionON, errorMessage, stackTraceMessage){

    instance.sqlMngrObj.addUserStep(
    {
      className: superClassName,
      methodName: _methodName,
      actionOn: actionON
    });

    instance.sqlMngrObj.addCrashReport(
    {
      errorMsg: errorMessage,
      errorStack: stackTraceMessage
    });

    instance.getUserID()

  }

  getUserID() {

  var db = Database.getDBInstance();

    //Fetch User Details from DB
    var selectUserSql = "SELECT * from User";
    db.transaction((tx) => {

      tx.executeSql(selectUserSql, [], (tx, results) =>
      {

        var len = results.rows.length;
        var user_id = null;
        for (var i = 0; i < len; i++) {
          var row = results.rows.item(i);
          user_id = row.user_id;
        }

        //*> Report crash
        instance.sendCrashReport(user_id);

      }, (error) =>
      {
        instance.sendCrashReport(null);
      });
    });
  }

  sendCrashReport(user_id) {
    //*>Check if have any error
    //*> Get error data

    var objSendReport = new SendReportOnRemote()
    instance.sqlMngrObj.getDeviceInfo((crashReport) => {

      var m = ''+crashReport.length
      if (crashReport.length > 0) {

        var data = crashReport[0];
        objSendReport.sendReport(data, user_id, instance.successCB, instance.errorCB)

      } else {
        //*> Delete all crash report
        instance.sqlMngrObj.deleteAllReportData()
      }
    })
  }

  successCB(msg) {
        //*> Delete all crash report
         instance.sqlMngrObj.deleteAllReportData()
  }

  errorCB(msg){
    console.log("###### error=", errorMsg);
  }

};
