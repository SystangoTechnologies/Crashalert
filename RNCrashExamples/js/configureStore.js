/**
 * Powered by Systango
 * http://www.systango.com
 */

 'use strict';

 import { createStore, applyMiddleware } from 'redux'
 import reducer from './reducers'
 import { RootStack } from './Route'

import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
	
const reduxMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.RootStackReducer,
);

export const AppNavigator = reduxifyNavigator(RootStack, 'root')

export const configureStore = createStore(reducer, applyMiddleware(reduxMiddleware));

