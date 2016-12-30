import React from 'react-native';
import { Platform } from 'react-native'
import stacktraceParser from 'stacktrace-parser';
var SQLiteManager = require('./SQLiteManager').default
var Configuration = require('./Configuration')


var RNSystangoBugReporter = require('react-native').NativeModules.RNSystangoBugReporter;
var sqlMngrObj;


// import _ from 'underscore';
/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let instance = null;


const parseErrorStack = (error)=>{
  if (!error || !error.stack) {
    return [];
  }
  return Array.isArray(error.stack) ? error.stack :
    stacktraceParser.parse(error.stack);
}

export default class BugReporter {

  /**
   * ## Constructor
   */
  constructor() {

    //*> Creating singleton
    if(!instance){
      if (Configuration.getIsReportCrash()) {

        RNSystangoBugReporter.setExceptionHandler((msg,stack) =>{

          instance.sqlMngrObj.addCrashReport(
            {
              errorMsg: msg,
              errorStack: stack
            }
          )
    });

      //Initializing singleton instance
      instance = this;

      this.initializeDBIncetance();

      if (Platform.OS == 'android') {
            ErrorUtils.setGlobalHandler(error => {
            instance.sqlMngrObj.addCrashReport(
              {
                errorMsg: error.message,
                errorStack: instance.parseErrorStack(error)
              }
            )

            //*> Finish activity
            RNSystangoBugReporter.reload()

            });
      }
    }
  }

    return instance;
  }



  initializeDBIncetance() {
    instance.sqlMngrObj = new SQLiteManager()
  }

};
