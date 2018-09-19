/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';
import { getHostURL } from './Configuration';


  export function sendReport(error_data, user_id = 0, successCallBackManager, errorCallBackManager){


    //  if (Platform.OS=='android')
    //  {
    //    url = encodeURI(url);
    //  }

    var contentType = 'application/json';



    var data = {}
    data['error_type'] = 'Crash';
    data['report_data'] = error_data;
    data['user_id'] = user_id;

    if(__DEV__)
    console.log("Error Reporting URL: ", data);

    var bodyParam = JSON.stringify(data);

    var url = getHostURL()+'/report';

    var final_bodyParam = bodyParam.replace(/[&\/\\#$~%'*?<>]/g, '');

    if(__DEV__)
    console.log("Error Reporting URL: ", url, final_bodyParam);


      //*> XML Http request
       var request = new XMLHttpRequest();

       request.onreadystatechange = (error) => {

         if (request.readyState !== 4) {
           return;
         }

          if(__DEV__)
          console.log('Error Reporting Success: ', request.responseText);

         if (request.responseText && request.status > 0) {

           if (request.responseText !== 'The network connection was lost.' && request.responseText !== 'recvfrom failed: ETIMEDOUT (Connection timed out)') {
             successCallBackManager(request.responseText);
           }
         } else {

           if (request.status !== 0 ) { // when cancel current request
             errorCallBackManager(request.responseText);
           }
         }
       };

       request.open('POST', url);
       request.setRequestHeader("Accept", "application/json");
       request.setRequestHeader("Content-Type", contentType);
       request.send(final_bodyParam);

  }
