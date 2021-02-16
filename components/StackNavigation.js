//Import libraries
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

//Importing the components

import TabNavigation from "./TabNavigation";
import Signin from "./Signin"
import CowDetails from "./CowDetails"
import CreateAccount from "./CreateAccount" 
import AddMilkRecording from "./AddMilkRecording";
import AddCow from "./AddCow";
import AddCalvingData from "./AddCalvingData";

const Stack = createStackNavigator()

/*Stack navigation is required in React native as it tells the system how to navigate to the different pages contained in the app. 
Reference = https://reactnavigation.org/docs/stack-navigator/ */

function StackNavigation() {
    return(
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={TabNavigation} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Add Cow"  options={{headerShown: true}} component={AddCow} />
            <Stack.Screen name="Cow Details" options={{headerShown: true}} component={CowDetails} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Add Milk Recording" options={{headerShown: true}} component={AddMilkRecording} />
            <Stack.Screen name="Add Calving Data" options={{headerShown: true}} component={AddCalvingData} />
        </Stack.Navigator>
    )

}
//allows me to import this elsewhere if require. can be used as component.
export default StackNavigation;