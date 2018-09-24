
'use strict';


import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

    container: {
        backgroundColor: '#d1fcc9'
    },

    header: {
        backgroundColor: 'transparent',
    },

    viewContainer: {
      width:deviceWidth,
      height:deviceHeight
    },

    nameContainer: {
      backgroundColor: '#59636C',
      flex:1,
      flexDirection:'row',
      alignItems: 'center',
      marginLeft: 30,
      marginTop: 40,
      marginBottom: 20
    },

    ListViewBG: {
      height:70
    },

    row:{
      flex:1,
      flexDirection:'row',
      padding:18,
      borderBottomWidth: 1,
      borderColor: '#d7d7d7',
    },

    selectionText:{
      fontSize:15,
      paddingTop:3,
      color:'#b5b5b5',
      textAlign:'right'
    },

    title: {
        fontSize: 17,
        color: '#fff',
        marginLeft:5
    },

    TextInputStyleClass: {
      color:'#3c5773',
      padding:10,
      width:200,
      height: 40,
      borderWidth: 1,
      borderColor: '#3c5773',
      borderRadius: 7 ,
      backgroundColor : "#FFFFFF",
      margin: 20,	 
    },

    textInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },

    btn: {
      height:35,
      backgroundColor: '#F57B20',
      justifyContent:'center',
      alignItems:'center',
      width:100,
  },


});
