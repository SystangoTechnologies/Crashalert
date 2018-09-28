
'use strict';


import { StyleSheet, Dimensions } from 'react-native';

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
      marginTop: 80
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
        color:'white'
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
      text: {
        color:'white',
        fontSize: 16
      }
});
