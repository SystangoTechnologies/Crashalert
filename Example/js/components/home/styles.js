
'use strict';


import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { getCorrectFontSizeForScreen } from '../../multiresolutionfont/multiResolution';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var fontSize = getCorrectFontSizeForScreen(PixelRatio, deviceWidth,deviceHeight,19, 320, 640);

module.exports = StyleSheet.create({

    container: {
        backgroundColor: '#59636C'
    },

    viewContainer: {
      width:deviceWidth,
      height:deviceHeight
    },

    nameContainer: {
      backgroundColor: '#59636C',
      alignItems: 'center',
      justifyContent:'center',
      marginTop:50

    },

    ListViewBG: {
      marginTop: 0
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
        fontSize: fontSize,
        color: '#fff',
        marginLeft:5
    },

    setUseImageBGCircleStyle:{
          backgroundColor:'#59636C',
          marginTop: 3,
          marginLeft: 18,
          width: 84,
          height: 84,
          borderRadius: 84/2,
    },

    setUserImageViewStyle: {
          marginTop: 1,
          marginLeft: 1,
          width: 82,
          height: 82,
          borderRadius: 82/2,
    },
    btn: {
        height:35,
        backgroundColor: '#F57B20',
        alignSelf:'center',
        marginTop:70
    }
});
