/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, Image, Dimensions } from 'react-native';
import { replaceRoute } from '../../actions/route';
import { View } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';

import * as authActions from '../../actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class SplashPage extends Component {

  componentWillMount () {

      setTimeout (() => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
      }, 3100);
  }

    render() {
        return (
        <View style={styles.background}>
          <StatusBar hidden={true} />
            <Image style={[styles.imageBackground, this.getCurrentWidthHeight()]} resizeMode= 'stretch' source={require('../../../assets/logo/bg.png')} />
            <Text style={styles.textLbl}>Crash Reporter</Text>
            <View style={styles.bottomTextLbl}>
                <Text style={styles.textLbl}>Powered by Systango</Text>
            </View>
        </View>

        );
    }

    getCurrentWidthHeight() {
        return { width: Dimensions.get('window').width,height: Dimensions.get('window').height }
      }
}

var styles = StyleSheet.create({
  background: {
    marginBottom:0,
    marginTop:0,
    marginLeft:0,
    marginRight:0,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    flex:1
  },
  imageBackground: {
    position: 'absolute'
  },
  textLbl: {
    fontSize:20,
    color: '#fbb534'
  },
  bottomTextLbl: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      alignItems:'center',
      justifyContent:'center',
  }
});

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
