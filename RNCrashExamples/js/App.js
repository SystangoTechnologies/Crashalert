
'use strict';

import React, { Component } from 'React';
import { Provider, connect } from 'react-redux';
import { configureStore, AppNavigator } from './configureStore'
import { CrashReporter } from 'rn-crash-reporter'

export default class App extends Component {

    componentWillMount(){

        CrashReporter.setConfiguration({
            hostURL: 'http://192.168.1.76:8000', // Replace this URL with your Server base url, in my case I have setup the node server using docker on my maching
            enableReporter: true  // pass false here if you don't want to enable crash reporting
        });
    }

    render() {
        return (
            <Provider store={configureStore}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

function mapStateToProps (state) {
    return {
      state: state.RootStackReducer
    }
}

const AppWithNavigationState = connect(mapStateToProps)(AppNavigator)
