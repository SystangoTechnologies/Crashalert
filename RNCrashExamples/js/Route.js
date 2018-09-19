
import SplashPage from './components/splashscreen/';
import Home from './components/home/';
import Search from './components/search/';

import { createStackNavigator } from 'react-navigation';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

export const RootStack = createStackNavigator({
    SplashPage: { screen: SplashPage, navigationOptions: { header: null }  },
    Home: { screen: Home, navigationOptions: { header: null } },
    Search: { screen: Search , navigationOptions: { header: null } },
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