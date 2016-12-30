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
 import {SRNView} from 'systango-bug-reporter'
 import PlayerCell from './PlayerCell'
 import ScreenService from '../Screen/screenService.js'


 import { bindActionCreators } from 'redux'
 import * as authActions from '../../actions/user';
 import * as fetchRoute from '../../actions/route';
 import { connect } from 'react-redux';

 var _this;
 var ds;
 var playerArray = [];

class PlayerList extends Component {

  /*
  * Home - Lifecycle
  */
  constructor(props){
     super(props);

     _this = this;

     playerArray = [];
     //*> Create Player default Array
     var element1 = {
         playerName:'John Anderson',
         year:'2010',
     }
     playerArray.push(element1)
     var element2 = {
         playerName:'Peter Williamson',
         year:'2011',
     }
     playerArray.push(element2)
     var element3 = {
         playerName:'Denial Harny',
         year:'2007',
     }
     playerArray.push(element3)
     var element4 = {
         playerName:'Tim Howard',
         year:'2014',
     }
     playerArray.push(element4)
     var element5 = {
         playerName:'Michael Bradley',
         year:'2013',
     }
     playerArray.push(element5)
     var element6 = {
         playerName:'Bobby Wood',
         year:'2015',
     }
     playerArray.push(element6)
     var element7 = {
         playerName:'DeAndre Yadlin',
         year:'2016',
     }
     playerArray.push(element7)
     var element8 = {
         playerName:'Brad Guzan',
         year:'2009',
     }
     playerArray.push(element8)
     var element9 = {
         playerName:'Clint Dempsey',
         year:'2008',
     }
     playerArray.push(element9)
     var element10 = {
         playerName:'Matt Besler',
         year:'2005',
     }
     playerArray.push(element10)

     //*> Setup state
     this.initialStateSetup()


   }

   render(){

     return (
       <Container  theme={myTheme}>
       <View style={[styles.container, {width:this.state.width,height:this.state.height}]} >
       <Image source={require('../../../assets/home/navigationBG.png')} style={{position:'absolute', left:0, top:0, width:this.state.width}}/>

       <View style={{flexDirection:'row', height:(Platform.OS === "android") ? 50 : 64, alignItems:'center', paddingTop:5}}>
           {this.backButtonView()}
             <View style={{flex:1, marginRight:50, flexDirection:'row', justifyContent:'center', paddingTop:5, alignItems:'center',height:(Platform.OS === "android") ? 50 : 64}}>
              <Text style={{color:'#fff', backgroundColor:'transparent'}}>Players</Text>
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
         <SRNView style={styles.ListViewBG} onPress={()=> this.pressRowItem(rowData, sectionID, rowID)}  actionOn={rowData.playerName}>
           <PlayerCell  width={this.state.width} height={this.state.height} playerData={rowData}/>
         </SRNView>
     )
   }

   pressRowItem(rowData, sectionID, rowID){
     this.props.actions.playerData({playerName: rowData.playerName, year: rowData.year})
     this.props.route.pushNewRoute('playerDetail')
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

export default connect(mapStateToProps, bindActions)(PlayerList);
