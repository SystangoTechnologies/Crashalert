/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React from 'react-native';
import { Platform} from 'react-native';
var DeviceInfo = require('react-native-device-info');
// import _ from 'underscore';
/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/


export default class AddDeviceInfo {

   getDeviceInfo(){

     var deviceInfo = {
       menufacturer: DeviceInfo.getManufacturer(),
       model: DeviceInfo.getModel(),
       osVersion: DeviceInfo.getSystemVersion(),
       releaseVersion: DeviceInfo.getReadableVersion(),
       platform: Platform.OS
     }

     return deviceInfo;

    }
};
