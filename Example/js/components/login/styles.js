
'use strict';

import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import ScreenService from '../Screen/screenService.js'


import { getCorrectFontSizeForScreen } from '../../multiresolutionfont/multiResolution';

var fontSize = getCorrectFontSizeForScreen(PixelRatio, ScreenService.getScreenSize().width,ScreenService.getScreenSize().height,20, 320, 640);

module.exports = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top:0,
        left:0,
        flex:1
    },

    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },

    bg: {
        height: 120,
        marginTop: 60,
    },

    input: {
      marginTop:10
    },

    title: {
        marginTop: 15,
        fontSize: fontSize,
        color: '#59636C',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    btn: {
        height:35,
        backgroundColor: '#F57B20',
        alignSelf:'center',
        marginTop:10
    },
    btnContainer: {
        marginTop: 36,
        justifyContent:'center',
        alignItems:'center'
    },

    text: {
      color: '#F57B20',
      fontSize: fontSize - 8,
    },

    ButtonBGViewStyle:{
     marginTop: 10,
     marginBottom:50,
     alignSelf:'center'
   },

});
