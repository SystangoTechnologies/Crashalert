
'use strict';

import type { Action } from '../actions/types';
import { globalNav } from '../AppNavigator';
import { PUSH_NEW_ROUTE, POP_ROUTE, POP_TO_ROUTE, REPLACE_ROUTE, REPLACE_OR_PUSH_ROUTE } from '../actions/route';
import { REHYDRATE } from 'redux-persist/constants'

export type State = {
    routes: Array<string>,
    title: string
}

const initialState = {
    routes: ['login'],
    title:''
};

export default function (state:State = initialState, action:Action): State {

    if (action.type === PUSH_NEW_ROUTE) {
        globalNav.navigator.push({id: action.route});
        return {
            routes: [...state.routes, action.route],
            title:action.title
        };
    }

    if (action.type === REPLACE_ROUTE) {
        globalNav.navigator.replace({id: action.route});
        let routes = state.routes;
        routes.pop();
        return {
            routes: [...routes, action.route]
        };
    }

    if (action.type === REPLACE_OR_PUSH_ROUTE) {
        let routes = state.routes;

        if(routes[routes.length - 1] == 'home') {
            if(action.route != 'home')
                globalNav.navigator.push({id: action.route});
            else
                routes = [];
        }

        else {
            if(action.route == 'home') {
                globalNav.navigator.resetTo({id: 'home'});
                routes = [];
            }
            else {
                globalNav.navigator.replace({id: action.route});
                routes.pop();
            }
        }

        return {
            routes: [...routes, action.route]
        };
    }

    if (action.type === POP_ROUTE) {
        globalNav.navigator.pop();
        let routes = state.routes;
        routes.pop();
        return {
            routes: [...routes, action.route]
        }
    }

    if (action.type === POP_TO_ROUTE) {

        let routes = state.routes;
        var _routes = globalNav.navigator.state.routeStack;
        for (var i = _routes.length - 1; i >= 0; i--) {
          if(_routes[i].id === action.route){
            var destinationRoute = globalNav.navigator.getCurrentRoutes()[i]
              globalNav.navigator.popToRoute(destinationRoute);
          }
        }

        return {
            routes: [...routes, action.route]
        }
    }

    if (action.type === REHYDRATE) {
        const savedData = action['payload']['route'] || state;
        return {
            ...savedData
        }
    }

    return state;
}
