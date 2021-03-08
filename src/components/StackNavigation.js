//Import libraries
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

//Importing the components

import TabNavigation from "components/TabNavigation";
import Signin from "screens/Signin"
import CowDetails from "screens/CowDetails"
import CreateAccount from "screens/CreateAccount" 
import AddMilkRecording from "screens/AddMilkRecording";
import AddCow from "screens/AddCow";
import AddCalvingData from "screens/AddCalvingData";
import CalvingCalendar from "screens/CalvingCalendar";
import CowArchive from "screens/CowArchive"
import CalvingArchive from "screens/CalvingArchive"

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
            <Stack.Screen name="Calving Calendar" options={{headerShown: true}} component={CalvingCalendar} />
            <Stack.Screen name="Cow Archive" options={{headerShown: true}} component={CowArchive} />
            <Stack.Screen name="Calving Archive" options={{headerShown: true}} component={CalvingArchive} />
        </Stack.Navigator>
    )

}
//allows me to import this elsewhere if require. can be used as component.
export default StackNavigation;