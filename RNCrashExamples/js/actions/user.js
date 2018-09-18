/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict'

/**
 * ## Imports
 *
 * The actions supported
 */

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const GETPROFILEIMAGE_SUCCESS = "GETPROFILEIMAGE_SUCCESS";
export const GETPROFILEIMAGE_FAILURE = "GETPROFILEIMAGE_FAILURE";
export const SESSION_TOKEN_REQUEST = "SESSION_TOKEN_REQUEST";
export const SESSION_TOKEN_SUCCESS = "SESSION_TOKEN_SUCCESS";
export const SESSION_TOKEN_FAILURE = "SESSION_TOKEN_FAILURE";
export const DELETE_TOKEN_REQUEST = "DELETE_TOKEN_REQUEST";
export const DELETE_TOKEN_SUCCESS = "DELETE_TOKEN_SUCCESS";
export const PLAYER_DATA = "PLAYER_DATA";
export const CRASH_DATA = "CRASH_DATA";


import {REPLACE_ROUTE} from './route';

import type {Action} from './types'


export function replaceRoute(route:string):Action {
    return {
        type: REPLACE_ROUTE,
        route: route
    }
}

export function loginSuccess (json):Action {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  }
}

export function playerDataSuccess (playerData):Action {
  return {
    type: PLAYER_DATA,
    playerData: playerData
  }
}


export function crashDataSuccess (crashData):Action {
  return {
    type: CRASH_DATA,
    crashData: crashData
  }
}



/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */


 export function playerData (playerData) {

   return dispatch => {
       dispatch(playerDataSuccess(playerData))
   }
 }

 export function crashData (crashData) {

   return dispatch => {
       dispatch(crashDataSuccess(crashData))
   }
 }


export function login (email, password) {

  return dispatch => {
      dispatch(loginSuccess({}))
  }
}


export function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logout (user_id) {
  return dispatch => {
      dispatch(logoutSuccess())
  }
}
