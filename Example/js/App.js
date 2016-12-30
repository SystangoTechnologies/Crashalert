'use strict';

import AppNavigator from './AppNavigator';
import React,{ Component } from "react";
import { StyleSheet, AppState, Dimensions, Image } from 'react-native';

import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, View } from 'native-base';
import theme from './themes/base-theme';

import * as authActions from './actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

var height = Dimensions.get('window').height;
let styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    box: {
        padding: 10,
        backgroundColor: 'transparent',
        flex: 1,
        height: height-70
    },
    space: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal1: {
        height: 300

    },
    modal2: {
        height: height-78,
        position: 'relative',
        justifyContent: 'center',
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDownloadingModal: false,
            showInstalling: false,
            downloadProgress: 0
        }
    }

    render() {
      return(
          <AppNavigator store={this.props.store} />
      );
    }
}

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

/**
 * Connect the properties
 */
export default connect(null, mapDispatchToProps)(App)
