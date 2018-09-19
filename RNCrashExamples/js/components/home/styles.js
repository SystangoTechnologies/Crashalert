
'use strict';


import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { getCorrectFontSizeForScreen } from '../../multiresolutionfont/multiResolution';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var fontSize = getCorrectFontSizeForScreen(PixelRatio, deviceWidth,deviceHeight,19, 320, 640);

module.exports = StyleSheet.create({

    container: {
        backgroundColor: '#59636C',
        alignItems: 'center',
        justifyContent:'center',
        flex: 1
    },
    nameContainer: {
      backgroundColor: '#59636C',
      alignItems: 'center',
      justifyContent:'center',
      marginTop: 20
    },
    btn: {
        height:35,
        backgroundColor: '#F57B20',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    image: {
        margin: 30,
        width: Dimensions.get("window").width - 100,
        height: 365 * (Dimensions.get("window").width - 100) / 651,
      },
      messages: {
        marginTop: 30,
        textAlign: "center",
      },
      restartToggleButton: {
        color: "blue",
        fontSize: 17
      },
      syncButton: {
        color: "green",
        fontSize: 17
      },
      welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 20
      },
});
