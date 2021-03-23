//import libraries
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from "react-native-elements"
import { LogBox } from "react-native"

import StackNavigation from "components/StackNavigation"

// You can set default colors and component attributes here. https://reactnavigation.org/docs/themes/*/
const theme = {
    colors: {
      primary: "#2EA043",
      secondary: "orange",
      background: "lightgrey"
    },
    Card: {
      containerStyle: {
        borderColor: "#2EA043",
        borderWidth: 1,
      },
      style: {
        borderRadius: 5,
        elevation: 5
      },
    },
    Input: {
      labelStyle: {
        color: "#1c1c1c"
      },
      inputStyle: {
        color: "#1c1c1c"
      },
      disabledInputStyle: {
        color: "#1c1c1c"
      }
    }
};

export default function Main() {
  LogBox.ignoreLogs(['Setting a timer', 'VirtualizedLists', 'RNDatePickerAndroid.dismiss'])

  return (
    // https://reactnativeelements.com/docs/customization/
    <ThemeProvider theme={theme}>   
      <NavigationContainer theme={theme}>
        <StackNavigation />
      </NavigationContainer>
      <StatusBar style="light" translucent={false}/> 
    </ThemeProvider>
  )
}

