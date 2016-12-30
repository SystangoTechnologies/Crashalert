/**
 * Powered by Systango
 * http://www.systango.com
 */

 'use strict';

 import React, { Component } from 'react';
 import { Platform, Dimensions, Image, ScrollView, TouchableHighlight, View, ListView, Text, Alert, StyleSheet} from 'react-native';
 import { Container, Content, InputGroup, Input, Button, Icon, List, ListItem, Title } from 'native-base';
 import ScreenService from '../Screen/screenService.js'

var _this;

class PlayerCell extends Component {

  constructor(props){
     super(props);
  }

   render(){
     console.log('player name = ', this.props.playerData.playerName);
     return (
      <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <View style={{width:this.props.width, height:50, backgroundColor:'#d1fcc9'}}>
          <Text style={{fontSize: 13, color:'black', marginLeft: 20}}>{this.props.playerData.playerName}</Text>
          <Text style={{fontSize: 10, color:'black', marginTop:8, marginLeft: 20}}>{this.props.playerData.year}</Text>
      </View>
      <View style={{backgroundColor: '#c0c0c0', height:1, width:this.props.width, marginBottom:0}}/>
      </View>
     );
   }

 }

 var styles = StyleSheet.create({

    cellCenterContainer: {
        alignItems:'center',
        justifyContent: 'center'
    },

  });


module.exports=PlayerCell;
