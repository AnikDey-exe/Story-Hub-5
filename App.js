import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ReadStoryScreen from "./screens/ReadStoryScreen";
import WriteStoryScreen from "./screens/WriteStoryScreen";
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

const TabNavigator = createBottomTabNavigator({
  Write: { screen: WriteStoryScreen },
  Read: { screen: ReadStoryScreen }
},
{
defaultNavigationOptions:({navigation})=>({
  tabBarIcon:({})=>{
    const routeName = navigation.state.routeName;

    if(routeName === 'Write'){
      return(
        <Image
         source={require('./assets/write.png')}
         style={{width: 30, height: 30}}/>
      )
    }
    else if(routeName === 'Read'){
      return(
        <Image
         source={require('./assets/read.png')}
         style={{width: 30, height: 30}}/>
      )
    }
  }
})
});

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: {screen: LoginScreen},
  TabNavigator: {screen: TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  }
});
