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
 import {Button} from 'systango-bug-reporter'
 import ScreenService from '../Screen/screenService.js'

 import { bindActionCreators } from 'redux'
 import * as fetchRoute from '../../actions/route';
 import { connect } from 'react-redux';

 var _this;
 var tempArray = []

class CrashDetail extends Component {

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

    //  for (var i = this.props.crashData.User_Steps.length - 1; i >= 0; i--) {
    //    tempArray.push(this.props.crashData.User_Steps[i])
    //  }

   }

   render(){
     _this = this;
     return (
       <Container  theme={myTheme}>
       <View style={[styles.container, {width:this.state.width,height:this.state.height}]} >
       <Image source={require('../../../assets/home/navigationBG.png')} style={{position:'absolute', left:0, top:0, width:this.state.width}}/>

       <View style={{flexDirection:'row', height:(Platform.OS === "android") ? 50 : 64, alignItems:'center', paddingTop:5}}>
           {this.backButtonView()}
             <View style={{flex:1, marginRight:50, flexDirection:'row', justifyContent:'center', paddingTop:5, alignItems:'center',height:(Platform.OS === "android") ? 50 : 64}}>
              <Text style={{color:'#fff', backgroundColor:'transparent'}}>Crash Detail</Text>
             </View>
       </View>

         <Content style={[styles.container]} scrollEnabled={true}>
           <View style={{flex:1, flexDirection:'column', marginTop:10, marginLeft:20}}>
           <Text style={{fontWeight:'bold', fontSize:16}}>{this.props.crashData.Crash_Point.error_msg}{"\n"}</Text>
           <Text>Date: {this.props.crashData.User_Device_Information.date}{"\n"}</Text>
           <Text>Release Version: {this.props.crashData.User_Device_Information.release_version}{"\n"}</Text>
           <Text>OS Version: {this.props.crashData.User_Device_Information.os_version}{"\n"}</Text>
           <Text>Manufacturer: {this.props.crashData.User_Device_Information.manufacturer}{"\n"}</Text>
           <Text>Platform: {this.props.crashData.User_Device_Information.platform}{"\n"}</Text>
           <Text>Model: {this.props.crashData.User_Device_Information.model}{"\n"}{"\n"}</Text>

           <Text style={{fontWeight:'bold'}}>User Steps{"\n"}</Text>
           {this.props.crashData.User_Steps.map(function(object, i){
              return <View style={{flex:1}}>
                        <View style={{flex:1, flexDirection:'row'}}><Text>{i+1}</Text><Text>{"\t"}User Clicked On: {object.methodName}{"\n"}</Text></View>
                       </View>
            })}
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
     crashData: state.user.crashData,
   }
 }

function bindActions(dispatch){
    return {
      route: bindActionCreators(fetchRoute, dispatch)
    }
}

export default connect(mapStateToProps, bindActions)(CrashDetail);
