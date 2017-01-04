/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React from 'react-native';

export default class SendReportOnRemote {

  sendReport(){
    xAuthorizationKey = this.request.params.api_key;
    if (xAuthorizationKey == null) {
      xAuthorizationKey = '';
    }

    var url = baseURL + this.request.url;
     if (Platform.OS=='android')
     {
       url = encodeURI(url);
     }
    var contentType = 'application/json';
    var bodyParam = JSON.stringify(this.request.params);

    if (this.request.verbose == 'PATCH') {
      contentType = 'application/x-www-form-urlencoded';
    }
    console.log("======url ", url);
    if (this.request.verbose == 'GET') {
      bodyParam = null;
    }
    else{
    //console.log("======bodyParam ", bodyParam);
    }

      //*> XML Http request
       var request = new XMLHttpRequest();

       request.onreadystatechange = (error) => {
         if (request.readyState !== 4) {
           return;
         }

         //console.log('status code ', request.status);

         if (request.responseText && request.status > 0) {
          //console.log('success ', request.responseText);
           if (request.responseText !== 'The network connection was lost.' && request.responseText !== 'recvfrom failed: ETIMEDOUT (Connection timed out)') {
             this.obj.successCallBackManager(request.responseText);
           }
         } else {

           console.log('error ', request.responseText);
           if (request.status !== 0 ) { // when cancel current request
             this.obj.errorCallBackManager(request.responseText);
           }
         }
       };

       request.open(this.request.verbose, url);
       request.setRequestHeader("Accept", "application/json");
       request.setRequestHeader("Content-Type", contentType);
       request.setRequestHeader("X-Authorization", xAuthorizationKey);
       request.send(bodyParam);

  }
}
