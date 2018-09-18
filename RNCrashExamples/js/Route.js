
import SplashPage from './components/splashscreen/';
import Home from './components/home/';
import CrashReport from './components/CrashReport/';
import CrashDetail from './components/CrashReport/CrashDetail';

import { createStackNavigator } from 'react-navigation';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

export const RootStack = createStackNavigator({
    SplashPage: { screen: SplashPage, navigationOptions: { header: null }  },
    Home: { screen: Home, navigationOptions: { header: null } },
    CrashReport: { screen: CrashReport , navigationOptions: { header: null } },
    CrashDetail: { screen: CrashDetail, navigationOptions: { header: null }  },
  },{
    /* The header config from LobbyScreens is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
      },
    },
  }
  );
  
  export const RootStackReducer = createNavigationReducer(RootStack);