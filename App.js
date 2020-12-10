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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

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
    <Tab.Navigator>
      <Tab.Screen name="Add Cow" component={AddCow} options={{
        tabBarIcon: ({ color, size }) => (<AntDesign name="plussquareo" size={24} color="black" />)
      }} />
      <Tab.Screen name="Cows" component={CowList} options={{
        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cow" size={24} color="black" />)
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: true}} >
          <Stack.Screen name="Main" options={{headerShown: false}} component={TabNavigation} />
          <Stack.Screen name="Cow Details" component={CowDetails} />
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
  },
})
