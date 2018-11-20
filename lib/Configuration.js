/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let hostURL = null;
let isReportCrash = null;
let userID = null;
let apiKey = null;
import CrashReporter from './CrashReporter';

module.exports = {

    setAPIKey(key){
      apiKey = key;
    },

    getAPIKey(){
      return apiKey;
    },

    setConfiguration(item){
        hostURL = item.hostURL;
        isReportCrash = item.enableReporter;
        userID = item.userID
        new CrashReporter(isReportCrash, userID)
      },

    

      getUserID(){
        return userID;
      },

    getIsReportCrash(){
     return isReportCrash;
    }

};

export function  getHostURL(){
  return hostURL;
}

