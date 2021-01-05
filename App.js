import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Header, ThemeProvider } from "react-native-elements"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AddCow from "./components/AddCow"
import CowList from "./components/CowList"
import CowDetails from "./Components/CowDetails"
import Settings from "./Components/Settings"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import Signin from './Components/Signin';
import CreateAccount from './Components/CreateAccount';

const theme = {
  colors: {
    primary: "#009FB7",
    secondary: "#EFF1F3"
  },
  Button: {
    titleStyle: {
      
    },
  },
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
  return(
    <Tab.Navigator initialRouteName="Cows">
      <Tab.Screen name="Add Cow" component={AddCow} options={{
        tabBarIcon: ({ color, size }) => (<AntDesign name="plussquareo" size={24} color="black" />)
      }} />
      <Tab.Screen name="Cows" component={CowList} options={{
        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cow" size={24} color="black" />)
      }} />
       <Tab.Screen name="Settings" component={Settings} options={{
        tabBarIcon: ({ color, size }) => (<Feather name="settings" size={24} color="black" />)
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>   
        <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={TabNavigation} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Cow Details" options={{headerShown: true}} component={CowDetails} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider> 
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: "50%"
  },
})
