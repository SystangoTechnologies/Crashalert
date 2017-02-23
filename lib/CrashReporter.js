/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React from 'react-native';
import { Platform, Alert } from 'react-native'
import stacktraceParser from 'stacktrace-parser';
var SQLiteManager = require('./SQLiteManager').default
var Configuration = require('./Configuration')
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

        if (ErrorUtils.getGlobalHandler()) {
            instance.defaultHandler = ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler() || ErrorUtils._globalHandler;
            ErrorUtils.setGlobalHandler(instance.wrapGlobalHandler);  //feed errors directly to our wrapGlobalHandler function
        }

            //*> Report crash
            this.sendCrashReport();
    }


  }



    return instance;
  }

  async wrapGlobalHandler(error, isFatal){

      instance.sqlMngrObj.addCrashReport(
        {
          errorMsg: error.message,
          errorStack: ''
        }
      )

      //*> Finish activity
      setTimeout (() => {
        instance.defaultHandler(error, isFatal);  //after you're finished, call the defaultHandler so that react-native also gets the error
        if (Platform.OS == 'android') {
          RNSystangoBugReporter.reload()
        }
      }, 1000);
  }


  initializeDBIncetance() {
    instance.sqlMngrObj = new SQLiteManager()
  }

  sendCrashReport() {
    //*>Check if have any error
    //*> Get error data
    var obj = new SQLiteManager()
    var objSendReport = new SendReportOnRemote()
    obj.getDeviceInfo((crashReport) => {

      var m = ''+crashReport.length

      if (crashReport.length > 0) {

        var data = crashReport[0];
        objSendReport.sendReport(data, 0, this.successCB, this.errorCB)

      } else {
        //*> Delete all crash report
        obj.deleteAllReportData()
      }

    })
  }

  successCB(msg) {
        //*> Get error data
        var obj = new SQLiteManager()

        //*> Delete all crash report
         obj.deleteAllReportData()
  }

  errorCB(msg){
    console.log("error=", errorMsg);
  }

};
