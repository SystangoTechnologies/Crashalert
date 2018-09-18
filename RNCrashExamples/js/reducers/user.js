/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */

/**
 * ## Auth actions
 */

'use strict';
import type { Action } from '../actions/types';
import {  LOGIN_REQUEST,
          LOGIN_SUCCESS,
          LOGIN_FAILURE,
          LOGOUT_REQUEST,
          LOGOUT_SUCCESS,
          LOGOUT_FAILURE,
          SESSION_TOKEN_SUCCESS,
          GETPROFILEIMAGE_SUCCESS,
          GETPROFILEIMAGE_FAILURE,
          PLAYER_DATA, CRASH_DATA
        } from '../actions/user';

export type State = {
  isLoggedIn: boolean;
  isFetching: boolean;
  response: any;
  error: string;
  sessionToken:string;
  profileImage:any;
  isLogout: boolean;
  playerData:any
};

const initialState = {
  isLoggedIn: false,
  isFetching: false,
  response:null,
  sessionToken:null,
  error:'',
  profileImage:null,
  isLogout: false,
  playerData:null
};


export default function (state:State = initialState, action:Action): State {

  switch (action.type) {

    case LOGIN_SUCCESS:

   // globalNav.navigator.replace({id: 'home'});


      return {
        ...state,
        isFetching:false,
        response:action.payload,
        isLoggedIn:true
        };



    case LOGOUT_SUCCESS:

     // globalNav.navigator.replace({id: 'login'});

      state = undefined
      return {
        state
        };

    case PLAYER_DATA:

      return {
        ...state,
        playerData: action.playerData
        };
    case CRASH_DATA:

      return {
        ...state,
        crashData: action.crashData
        };

  }

    return state;
}
