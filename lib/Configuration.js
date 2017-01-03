import React from 'react-native';
var CrashReporter = require('./CrashReporter').default
/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let hostURL = null;
let isReportCrash = null;
let isSendOnRemote = null;

module.exports = {

   setHostURL(url){
      hostURL = url;
      //cofigure reporter
      new CrashReporter()
    },

   getHostURL(){
    return hostURL;
    },

  setIsReportCrash(_isReportCrash){
     isReportCrash = _isReportCrash;
   },

  getIsReportCrash(){
   return isReportCrash;
  }

};
