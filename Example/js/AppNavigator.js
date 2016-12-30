
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import { BackAndroid, Platform, StatusBar, NetInfo, Alert, View } from 'react-native';
import { popRoute } from './actions/route';
import Navigator from 'Navigator';

import Login from './components/login/';
import PlayerList from './components/List/';
import PlayerDetail from './components/List/PlayerDetail';
import SplashPage from './components/splashscreen/';
import Home from './components/home/';
import CrashReport from './components/CrashReport/';
import CrashDetail from './components/CrashReport/CrashDetail';


import {Configuration, BugReporter} from 'systango-bug-reporter'

import { statusBarColor } from "./themes/base-theme";

var _this;
Navigator.prototype.replaceWithAnimation = function (route) {
    const activeLength = this.state.presentedIndex + 1;
    const activeStack = this.state.routeStack.slice(0, activeLength);
    const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
    const nextStack = activeStack.concat([route]);
    const destIndex = nextStack.length - 1;
    const nextSceneConfig = this.props.configureScene(route, nextStack);
    const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

    const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
    this._emitWillFocus(nextStack[destIndex]);
    this.setState({
        routeStack: nextStack,
        sceneConfigStack: nextAnimationConfigStack,
    }, () => {
        this._enableScene(destIndex);
        this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
            this.immediatelyResetRouteStack(replacedStack);
        });
    });
};

export var globalNav = {};
export var navObj = {};

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        var currentState = state;

        if(currentState){
            while (currentState.children){
                currentState = currentState.children[currentState.index]
            }
        }
        return defaultReducer(state, action);
    }
};


class AppNavigator extends Component {

    constructor(props){
        super(props);
        _this=this;
        navObj = this;



    }

    componentDidMount() {

      //*> Configure BugReporter
      new BugReporter()
      Configuration.setIsReportCrash(true)
      Configuration.setIsSendOnRemote(false)


        globalNav.navigator = this._navigator;

        this.props.store.subscribe(() => {
        });

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes();

            if(routes[routes.length - 1].id == 'home' || routes[routes.length - 1].id == 'login') {
                return false;
            }
            else {
                this.popRoute();
                return true;
            }
        });



    }

    popRoute() {
        this.props.popRoute();
    }

    render() {
        return (
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    initialRoute={{id: (Platform.OS === "android") ? 'splashscreen' : 'login', statusBarHidden: true}}
                    renderScene={this.renderScene}
                  />
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'splashscreen':
                return <SplashPage navigator={navigator} />;
            case 'login':
                return <Login navigator={navigator} />;
            case 'home':
                return <Home navigator={navigator} />;
            case 'playerList':
                  return <PlayerList navigator={navigator} />;
            case 'playerDetail':
                  return <PlayerDetail navigator={navigator} />;
            case 'crashReport':
                  return <CrashReport navigator={navigator} />;
            case 'crashDetail':
                  return <CrashDetail navigator={navigator} />;
            default :
                return <Login navigator={navigator}  />;


        }
    }

  }


  function bindAction(dispatch) {
      return {
          popRoute: () => dispatch(popRoute()),
          networkStatus: (status) => dispatch({type:NETWORK_AVAILABILITY, networkStatus:status})
      }
  }


export default connect(null, bindAction) (AppNavigator);
