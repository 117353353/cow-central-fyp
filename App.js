import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Header, ThemeProvider } from "react-native-elements"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddCow from "./components/AddCow"
import CowList from "./components/CowList"

const theme = {
  Button: {
    type: "outline",
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Cow Central', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Tab.Navigator>
          <Tab.Screen name="Add Cow" component={AddCow} />
          <Tab.Screen name="Cows" component={CowList} />
        </Tab.Navigator>
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
