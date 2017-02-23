/**
 * Powered by Systango
 * http://www.systango.com
 */

 'use strict';

 import { AsyncStorage } from 'react-native'
 import { createStore, applyMiddleware, compose } from 'redux'
 import devTools from 'remote-redux-devtools'
 import { persistStore } from 'redux-persist'
 import thunk from 'redux-thunk'
 import reducer from './reducers'
 import promise from './Promise';
import reduxCatch from 'redux-catch';

function errorHandler(error, getState, lastAction, dispatch) {
  console.error(error);
  console.debug('current state', getState());
  console.debug('last action was', lastAction);
  // optionally dispatch an action due to the error using the dispatch parameter
}

 export default function configureStore(onCompletion:()=>void):any {
 	const enhancer = compose(
 		applyMiddleware(thunk, promise),
 		devTools({
 	     	name: 'RNCrashExample', realtime: true
 	    }),
 	);

 	let store = createStore(reducer, enhancer);
 	persistStore(store, {storage: AsyncStorage}, onCompletion);
  reduxCatch(errorHandler)
 	return store
 }
