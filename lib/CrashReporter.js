/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import { Platform } from 'react-native'
import stacktraceParser from 'stacktrace-parser';
var SQLiteManager = require('./SQLiteManager').default
import { sendReport } from  './SendReportOnRemote'
var i = 0;
let instance = null;

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
  constructor(isCrashReportEnabled) {

    //*> Creating singleton
    if(!instance){
      if (isCrashReportEnabled) {

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

    const stack = parseErrorStack(error);

    var stackTrace = stack.length > 0 ? JSON.stringify(stack[0]) : '';
    stackTrace = stackTrace.replace(/[&\/\\#$~%'*?<>"{}]/g, '');
    stackTrace = stackTrace.replace(/[,]/g, ',  ');

      instance.sqlMngrObj.addCrashReport(
        {
          errorMsg: error.message,
          errorStack: stackTrace
        }
      )

      //*> Finish activity
      setTimeout (() => {
        instance.defaultHandler(error, isFatal);  //after you're finished, call the defaultHandler so that react-native also gets the error
      }, 1000);
  }


  initializeDBIncetance() {
    instance.sqlMngrObj = new SQLiteManager()
  }

  sendCrashReport(user_id) {

    instance.sqlMngrObj.getDeviceInfo((crashReport) => {
      

      if (crashReport.length > 0 && i == 0) {
        i++;
        var data = crashReport[0];

        sendReport(data, user_id, this.successCB, this.errorCB)

      } else {
        //*> Delete all crash report
        instance.sqlMngrObj.deleteAllReportData()
      }

    })
  }

  successCB() {
    //*> Delete all crash report
    instance.sqlMngrObj.deleteAllReportData()
  }

  errorCB(){
    console.log("error=", errorMsg);
  }

};
