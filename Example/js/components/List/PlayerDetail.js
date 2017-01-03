/**
 * Powered by Systango
 * http://www.systango.com
 */

 'use strict';

 import React, { Component } from 'react';
 import { Platform,  DeviceEventEmitter, Dimensions, Image, ScrollView, TouchableHighlight, View, ListView, Text, Alert} from 'react-native';
 import myTheme from '../../themes/base-theme';
 import { Container, Content, InputGroup, Input, Icon,  List, ListItem, Footer, Title, Header } from 'native-base';
 import styles from './styles';
 import {Button} from 'rn-crash-reporter'
 import ScreenService from '../Screen/screenService.js'

 import { bindActionCreators } from 'redux'
 import * as fetchRoute from '../../actions/route';
 import { connect } from 'react-redux';

 var _this;

class PlayerDetail extends Component {

  /*
  * Home - Lifecycle
  */
  constructor(props){
     super(props);

     _this = this;
     this.state = {
       width:ScreenService.getScreenSize().width,
       height:ScreenService.getScreenSize().height
     }

   }

   render(){

     return (
       <Container  theme={myTheme}>
       <View style={[styles.container, {width:this.state.width,height:this.state.height}]} >
       <Image source={require('../../../assets/home/navigationBG.png')} style={{position:'absolute', left:0, top:0, width:this.state.width}}/>

       <View style={{flexDirection:'row', height:(Platform.OS === "android") ? 50 : 64, alignItems:'center', paddingTop:5}}>
           {this.backButtonView()}
             <View style={{flex:1, marginRight:50, flexDirection:'row', justifyContent:'center', paddingTop:5, alignItems:'center',height:(Platform.OS === "android") ? 50 : 64}}>
              <Text style={{color:'#fff', backgroundColor:'transparent'}}>Player Detail</Text>
             </View>
       </View>

         <Content keyboardShouldPersistTaps={true} style={[styles.container, {marginTop:10}]} scrollEnabled={!this.props.isFetching}>
           <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', height:this.state.height - 50}}>
           <Text>{this.props.playerData.playerName}</Text>
           <Text>{this.props.playerData.year}</Text>
           </View>
         </Content>

        </View>
       </Container>
     );
   }

   /*
   * Player Detail - Private Method
   */

   backButtonView() {
       return(
         <Button isBorder={false} transparent onPress={() => this.handleBackPress() } style={{marginLeft:10, width:50, alignItems:'center', justifyContent:'center', height:(Platform.OS === "android") ? 50 : 64}}>
          <Image source={require('../../../assets/home/arrow.png')} ref='Back Button'/>
        </Button>
      )
   }

   handleBackPress() {
      this.props.route.popRoute()
   }
 }

 function mapStateToProps (state) {
   return {
     playerData: state.user.playerData,
   }
 }

function bindActions(dispatch){
    return {
      route: bindActionCreators(fetchRoute, dispatch)
    }
}

export default connect(mapStateToProps, bindActions)(PlayerDetail);
