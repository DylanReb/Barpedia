import React from "react";

import Home from "./components/BarMenuClass.js";
import BarPage from "./components/BarPage.js";
import BarFood from "./components/PictureLinkers/BarSpecificMenu.js";
import BarDrinks from "./components/PictureLinkers/BarSpecificDrinks.js";
import LineReporting from "./components/ReportForm.js";
import Map from "./components/Map.js"
import Reviews from "./components/Reviews.js";

import { Icon } from "native-base";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


import styles from "./components/StyleFiles/BarPageStyle.js";

const { Navigator, Screen } = createStackNavigator();

console.disableYellowBox = true;

export default function App() {
  return (
      <NavigationContainer>
        <Navigator>
          <Screen name="Home" component={Home} options={{headerStyle: {backgroundColor: '#0696E9'}, headerTintColor: '#fff'}} />
          <Screen name="Details" component={BarPage} options={{headerStyle: {backgroundColor: '#0696E9'}, headerTintColor: '#fff'}}/>
          <Screen name="Map" component={Map} options={{headerStyle: {backgroundColor: '#0696E9'}, headerTintColor: '#fff'}}/>
          <Screen name="Bar Food" component={BarFood} options={{headerStyle: {backgroundColor: '#0696E9'}, headerTintColor: '#fff'}}/>
          <Screen name="Bar Drinks" component={BarDrinks} options={{headerStyle: {backgroundColor: '#0696E9'}, headerTintColor: '#fff'}}/>
          <Screen name="Line Reporting" component={LineReporting} options={{headerStyle: {backgroundColor: '#0696E9'}, headerTintColor: '#fff'}}/>
          <Screen name="Reviews" component={Reviews} options={{headerStyle: {backgroundColor: '#0696E9'}, headerTintColor: '#fff'}}/>
        </Navigator>
      </NavigationContainer>
  );
}
/*

function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{activeBackgroundColor: "lightgrey"}}
    >
      <Tab.Screen name="Home" component={Home}  options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon type="Feather" name="home" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Maps" component={Map} options={{
          tabBarLabel: 'Maps',
          tabBarIcon: ({ color, size }) => (
            <Icon type="Feather" name="map" color={color} size={size} />
          ),
        }}/>
  </Tab.Navigator>
  );
}
*/
