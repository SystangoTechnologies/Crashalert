/**
 * Powered by Systango
 * http://www.systango.com
 */

 'use strict';

 import React, { Component } from 'react';
 import { Platform, DeviceEventEmitter, Dimensions, Image, ScrollView, TouchableHighlight, View, ListView, Text, Alert} from 'react-native';
 import myTheme from '../../themes/base-theme';
 import { Container, Content, InputGroup, Input,  List, ListItem, Footer, Title } from 'native-base';
 import styles from './styles';
 import SpinLoader from '../loaders/SpinLoader';
 import ScreenService from '../Screen/screenService.js'
 import { bindActionCreators } from 'redux'
 import * as authActions from '../../actions/user';
 import * as fetchRoute from '../../actions/route';
 import { connect } from 'react-redux';

 import {Button} from 'rn-crash-reporter'


var _this;


class Home extends Component {

  /*
  * Home - Lifecycle
  */
  constructor(props){
     super(props);

     _this = this;

     this.state = {
                    width:ScreenService.getScreenSize().width,
                    height:ScreenService.getScreenSize().height
                  };

   }

   reportExceptionCallBack(data) {
      console.log("data akhi= ", data);
   }

   render(){

     return (
       <Container  theme={myTheme}>
       <View style={{width:this.state.width,height:this.state.height}} >
         <Content keyboardShouldPersistTaps={true} style={styles.container} scrollEnabled={!this.props.isFetching}>
         <View style={styles.nameContainer}>
             <Image source={require('../../../assets/home/user.png')} />
             </View>
             <Button style={[styles.btn, {width:this.state.width - 70}]} onPress={ ()=> this.pressPlayerList()}>
                 View Player List
             </Button>
             <Button style={[styles.btn, {width:this.state.width - 70, marginTop: 30}]} onPress={ ()=> this.pressViewCrashReport()}>
                 View Crash Report
             </Button>
             <Button style={[styles.btn, {width:this.state.width - 70, marginTop: 30}]} onPress={ ()=>
               {throw new Error("Javascript error test successful!")}
             } >
                 To Crash Click Here
             </Button>
             <Button style={[styles.btn, {width:this.state.width - 70, marginTop: 30}]} onPress={ ()=>
               this.divideCrash()
             }>
                 Random Crash
             </Button>
             <Button style={[styles.btn, {width:this.state.width - 70, marginTop: 30}]} onPress={ ()=> this.pressLogout()}>
                 LOG OUT
             </Button>
         </Content>
           <SpinLoader superObject={this} width={this.state.width} height={this.state.height}/>
          </View>
       </Container>
     );
   }

   /*
   * Home - Private Method
   */

   handleMenu() {
      const {menuOpen} = this.state
      this.setState({
        menuOpen: !menuOpen
      })
}


pressLogout(event){

  this.props.actions.logout();

}
pressPlayerList(event){
  this.props.route.pushNewRoute('playerList')
}
pressViewCrashReport(event){
  this.props.route.pushNewRoute('crashReport')
}

divideCrash(){
  txt = "a";
while(1){
    txt = txt += "a";    //add as much as the browser can handle
}
  console.log('divideCrash');
}


 }

 function mapStateToProps (state) {
   return {
     user: state.user.response,
     profileImage: state.user.profileImage,
     isFetching:state.user.isFetching,
     isLogout: state.user.isLogout,

   }
 }

function bindActions(dispatch){
    return {
      actions: bindActionCreators(authActions, dispatch),
      route: bindActionCreators(fetchRoute, dispatch)
    }
}

export default connect(mapStateToProps, bindActions)(Home);
