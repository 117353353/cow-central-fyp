import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from "react-native-elements"
import StackNavigation from "./components/StackNavigation"

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
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      <StatusBar style="light" translucent={false}/>
    </ThemeProvider>
  )
}

