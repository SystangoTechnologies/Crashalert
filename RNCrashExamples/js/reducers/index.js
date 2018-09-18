
'use strict';

import { combineReducers } from 'redux';
import { RootStackReducer } from '../Route';

import user from './user';

export default combineReducers({
  RootStackReducer,
  user
})
