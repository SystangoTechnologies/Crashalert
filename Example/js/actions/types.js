
'use strict';

export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string, title: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'LOGIN_REQUEST', source: string }
    | { type: 'LOGIN_SUCCESS', payload: any }

export type Dispatch = (action:Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch:Dispatch, getState:GetState) => any;
export type PromiseAction = Promise<Action>;
