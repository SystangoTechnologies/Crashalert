import React, { Component } from 'React';
import { Provider, connect } from 'react-redux';
import { CrashReporter } from 'react-native-crashalert';
import { configureStore, AppNavigator } from './configureStore';

export default class App extends Component {
  componentWillMount() {
    CrashReporter.setConfiguration({
      hostURL: 'http://192.168.2.29:8000', // Replace this URL with your Server base url or IP address, in my case I have setup the node server using docker on my machine
      enableReporter: true // pass false here if you don't want to enable crash reporting
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

function mapStateToProps(state) {
  return {
    state: state.RootStackReducer
  };
}

const AppWithNavigationState = connect(mapStateToProps)(AppNavigator);
