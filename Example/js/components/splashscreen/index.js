/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text } from 'react-native';
import { replaceRoute } from '../../actions/route';
import { View } from 'native-base';

import * as authActions from '../../actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class SplashPage extends Component {

  componentWillMount () {

  var navigator = this.props.navigator;

      setTimeout (() => {
          navigator.replace({
              id: 'login',
          });
      }, 3100);
  }

    render() {
        return (
          <View style={styles.backgroundVideo}>
          <StatusBar hidden={true} />
            <Text style={{fontSize:20}}>Systango Bug Reporter</Text>
            </View>

        );
    }
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    marginBottom:0,
    marginTop:0,
    marginLeft:0,
    marginRight:0,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    flex:1
  },
});

/**
 *  Save that state
 */
function mapStateToProps (state) {
  return {
    user: state.user.response,
    session: state.user.sessionToken
  }
};

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        actions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, bindActions)(SplashPage);
