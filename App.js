import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from "react-native-elements"
import StackNavigation from "./components/StackNavigation"

/*This is the colour scheme behind the project with primary being the colour of the buttons
 reference = https://reactnavigation.org/docs/themes/*/

 const theme = {
  colors: {
    primary: "#8a91a5",
    secondary: "orange"
  },
  button: {
    type: "outline",
  },
};


export default function App() {
  return (
    // https://reactnativeelements.com/docs/customization/
    <ThemeProvider theme={theme}>
      <Button title="Hello" type="outline"/>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      <StatusBar style="light" translucent={false}/>
    </ThemeProvider>
  )
}

