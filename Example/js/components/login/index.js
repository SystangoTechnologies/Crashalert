/**
 * Powered by Systango
 * http://www.systango.com
 */

 'use strict';

 import React, { Component, PropTypes, version, defaultProps } from 'react';
 import { DeviceEventEmitter, Dimensions, Image, ScrollView, Text, Alert, StatusBar, Platform} from 'react-native';
 import { Container, Content, InputGroup, Input, Icon, View, List, ListItem } from 'native-base';
 import styles from './styles';
 import SpinLoader from '../loaders/SpinLoader';
 import myTheme from '../../themes/base-theme';
 import ScreenService from '../Screen/screenService.js'
 import {reduxForm} from 'redux-form'
 import dismissKeyboard from 'dismissKeyboard'
 import {Keyboard} from 'react-native';
 import { navObj } from '../../AppNavigator';

 import { bindActionCreators } from 'redux'
 import * as authActions from '../../actions/user';
 import { connect } from 'react-redux';
 import * as routeActions from '../../actions/route';
 import { Hoshi } from 'react-native-textinput-effects';

 import { Button, TouchableOpacity } from 'rn-crash-reporter'
 import Orientation from 'react-native-orientation';


 var _this;
 var _keyboardWillShowSubscription, _keyboardWillHideSubscription;


 class LoginPage extends Component {
//osVersion, platform, releaseVersion, manufacturer, model
  /*
  * Lifecycle - Methods
  */
  constructor(props) {
    super(props);
    this.state = { email: '',
                   password: '',
                   width:ScreenService.getScreenSize().width,
                   height:ScreenService.getScreenSize().height,
                   extraHeight:0
                 };

    _this = this;



  }

  componentWillMount() {
    Orientation.lockToPortrait();

    _keyboardWillShowSubscription = Keyboard.addListener((Platform.OS === "android") ? 'keyboardDidShow' : 'keyboardWillShow', this.keyboardWillShow.bind(this))
    _keyboardWillHideSubscription = Keyboard.addListener((Platform.OS === "android") ? 'keyboardDidHide' : 'keyboardWillHide', this.keyboardWillHide.bind(this))

  }

  componentWillUnmount() {
    _keyboardWillShowSubscription.remove();
    _keyboardWillHideSubscription.remove();
  }

  render() {
    return (

      <View>
      <StatusBar hidden={true} />
        <Image style={[styles.container, this.getCurrentWidthHeight()]} source={require('../../../assets/logo/bg.png')} />

        <ScrollView contentInset={{top: 0, bottom: this.state.extraHeight}} ref='scrollView' keyboardShouldPersistTaps={true} contentContainerStyle={[styles.container, this.getNewCurrentWidthHeight()]} scrollEnabled={!this.props.isFetching} >
          <View style={[styles.logoContainer, this.getCurrentWidthHeight()]}>
            <View style={[styles.bg, {width:this.state.width - 60}]}>
              <Hoshi
                 label={'Email'}
                 borderColor={'#F57B20'}
                 style={[styles.input]}
                 inputStyle = {{color:'white'}}
                 labelStyle = {{fontWeight:'bold'}}
                 autoCorrect={false}
                 onChangeText={(text) => this.setState({email:text})}

              />
              <Hoshi
                 label={'Password'}
                 borderColor={'#F57B20'}
                 style={[styles.input]}
                 inputStyle = {{color:'white'}}
                 labelStyle = {{fontWeight:'bold'}}
                 autoCorrect={false}
                 secureTextEntry={true}
                 onChangeText={(text) => this.setState({password:text})}

              />
            </View>

            <View style={[styles.btnContainer, { width: ScreenService.getScreenSize().width}]}>
            <Button style={[styles.btn, {width:this.state.width - 70}]} onPress={ ()=> this.pressLogin()}>
                LOG IN
            </Button>

            <Button style={[styles.ButtonBGViewStyle, {width:this.state.width - 70}]} textStyle={styles.text} onPress={ ()=> this.forgotPassword()} isBorder={false}>
                  Forgot your password?
            </Button>
            </View>
          </View>
            <SpinLoader superObject={this} width={this.state.width} height={this.state.height}/>
        </ScrollView>
        </View>
      )
    }

    /*
    * Private Methods
    */
    keyboardWillShow (e) {
      console.log('component did show keyboard');
      this.setState({extraHeight:170})

      setTimeout (() => {
          this.refs.scrollView.scrollTo({x: 0, y: 100, animated:true})
      }, 5);
    }

    keyboardWillHide (e) {
      this.setState({extraHeight:0})
      setTimeout (() => {
        this.refs.scrollView.scrollTo({x: 0, y: 0, animated:true})
      }, 5);
    }

    pressLogin(event){


      dismissKeyboard();

      if (this.validateInput()) {
          this.props.actions.login(this.state.email, this.state.password);
      }
    }

    forgotPassword() {
    }

    validateInput() {

      if (this.state.email == "") {

        Alert.alert(
          'Alert',
          'Please verify the input and try again.', [{ text: 'Ok', onPress: ()=> {} }]
         );

        return false
      }

      if (this.state.password == "") {

        Alert.alert(
          'Alert',
          'Please verify the input and try again.', [{ text: 'Ok', onPress: ()=> {} }]
         );
        return false
      }

      return true
    }

    getCurrentWidthHeight() {
      return { width:this.state.width,height:this.state.height + 1 }
    }

    getNewCurrentWidthHeight() {
      return { width:this.state.width,height:this.state.height + this.state.extraHeight }
    }

}

function mapStateToProps (state) {
  return {
    response: state.user.response,
    error:state.user.error,
    isFetching:state.user.isFetching,
    isLoggedIn:state.user.isLoggedIn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
    route: bindActionCreators(routeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
