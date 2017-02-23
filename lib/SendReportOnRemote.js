/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React from 'react-native';
import { Platform } from 'react-native'

var Configuration = require('./Configuration')

export default class SendReportOnRemote {

  sendReport(error_data, user_id, successCallBackManager, errorCallBackManager){



     if (Platform.OS=='android')
     {
       url = encodeURI(url);
     }

    var contentType = 'application/json';


    var data = {}
    data['error_type'] = 'Crash';
    data['report_data'] = error_data;
    data['user_id'] = user_id;

    var bodyParam = JSON.stringify(data);

    var url = Configuration.getHostURL()+'/generateCrash?data='+bodyParam;



    //var final_bodyParam = bodyParam.replace(/[&\/\\#$~%'*?<>]/g, '');

    console.log("Error reporting url=", url);


      //*> XML Http request
       var request = new XMLHttpRequest();

       request.onreadystatechange = (error) => {
         if (request.readyState !== 4) {
           return;
         }

         console.log('status code ', request.status);
         console.log('success ', request.responseText);

         if (request.responseText && request.status > 0) {

           if (request.responseText !== 'The network connection was lost.' && request.responseText !== 'recvfrom failed: ETIMEDOUT (Connection timed out)') {
             successCallBackManager(request.responseText);
           }
         } else {

           console.log('error ', request.responseText);
           if (request.status !== 0 ) { // when cancel current request
             errorCallBackManager(request.responseText);
           }
         }
       };

       request.open('GET', url);
       request.setRequestHeader("Accept", "application/json");
       request.setRequestHeader("Content-Type", contentType);
       request.send(bodyParam);

  }
}
