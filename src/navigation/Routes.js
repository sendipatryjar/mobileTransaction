import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LandingScreen from './../views/landing/landingScreen';
import DetailScreen from './../views/detail/detailScreen';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../redux/reducers';
import ReduxThunk from 'redux-thunk';
import {ROUTE_CHANGES} from './type';

const RootNavigator = createStackNavigator({
  LandingScreen: {
    screen: LandingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppNavigator = createAppContainer(RootNavigator);
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
export default Root;
