
'use strict';


import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { getCorrectFontSizeForScreen } from '../../multiresolutionfont/multiResolution';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var fontSize = getCorrectFontSizeForScreen(PixelRatio, deviceWidth,deviceHeight,19, 320, 640);

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
      height:50
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


});
