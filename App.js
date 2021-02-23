//import libraries
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, Button } from "react-native-elements"
import StackNavigation from "./components/StackNavigation"
import { LogBox, SafeAreaView } from "react-native"
/*This is the colour scheme behind the project with primary being the colour of the buttons
 reference = https://reactnavigation.org/docs/themes/*/

 const theme = {
    colors: {
      primary: "#2b96d9",
      secondary: "orange"
    },
    button: {
      
    },
  };

export default function App() {
  LogBox.ignoreLogs(['Setting a timer', 'VirtualizedLists'])

  return (
    // https://reactnativeelements.com/docs/customization/
    <ThemeProvider theme={theme}>   
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      <StatusBar style="light" translucent={false}/>
    </ThemeProvider>
  )
}

