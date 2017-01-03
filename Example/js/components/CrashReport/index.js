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
 import {SRNView, Button} from 'rn-crash-reporter'
 import ScreenService from '../Screen/screenService.js'
 import {SQLiteManager} from 'rn-crash-reporter'

 import { bindActionCreators } from 'redux'
 import * as authActions from '../../actions/user';
 import * as fetchRoute from '../../actions/route';
 import { connect } from 'react-redux';

 import CrashCell from './CrashCell'

 var _this;
 var ds;
 var playerArray = [];

class CrashReport extends Component {

  /*
  * Home - Lifecycle
  */
  constructor(props){
     super(props);

     _this = this;

     //*> Setup state
     this.initialStateSetup()

     //*> Get error data
     var obj = new SQLiteManager()
     obj.getDeviceInfo((crashReport) => {
       playerArray = crashReport;
       this.setState({dataSource:ds.cloneWithRows(playerArray)})
     })

   }

   render(){

     return (
       <Container  theme={myTheme}>
       <View style={[styles.container, {width:this.state.width,height:this.state.height}]} >
       <Image source={require('../../../assets/home/navigationBG.png')} style={{position:'absolute', left:0, top:0, width:this.state.width}}/>

       <View style={{flexDirection:'row', height:(Platform.OS === "android") ? 50 : 64, alignItems:'center', paddingTop:5}}>
           {this.backButtonView()}
             <View style={{flex:1, marginRight:50, flexDirection:'row', justifyContent:'center', paddingTop:5, alignItems:'center',height:(Platform.OS === "android") ? 50 : 64}}>
                <Text style={{color:'#fff', backgroundColor:'transparent'}}>Crash Report</Text>
             </View>
       </View>

         <Content keyboardShouldPersistTaps={true} style={[styles.container, {marginTop:10}]} scrollEnabled={!this.props.isFetching}>
           <ListView
             dataSource = {this.state.dataSource}
             renderRow = {this.renderRow.bind(this)}
             enableEmptySections={true}>
           </ListView>
         </Content>

        </View>
       </Container>
     );
   }

   /*
   * List - Private Method
   */
   initialStateSetup() {
     ds = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 != r2
     });
     this.state = {
       dataSource:ds.cloneWithRows(playerArray),
       width:ScreenService.getScreenSize().width,
       height:ScreenService.getScreenSize().height
     }
   }

   renderRow(rowData:any, sectionID: number, rowID: number){
       return (
         <SRNView style={styles.ListViewBG} onPress={()=> this.pressRowItem(rowData, sectionID, rowID)} actionOn= {rowData.Crash_Point.error_msg}>
          <CrashCell  width={this.state.width} height={this.state.height} crashData={rowData}/>
         </SRNView>
     )
   }

   pressRowItem(rowData, sectionID, rowID){
     var abcData = rowData;
     this.props.actions.crashData(abcData)
     this.props.route.pushNewRoute('crashDetail')
   }

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
     userData: state.user.response,
   }
 }

function bindActions(dispatch){
    return {
      route: bindActionCreators(fetchRoute, dispatch),
      actions: bindActionCreators(authActions, dispatch),
    }
}

export default connect(mapStateToProps, bindActions)(CrashReport);
