import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from "./TabNavigation";
import Signin from "./Signin"
import CowDetails from "./CowDetails"
import CreateAccount from "./CreateAccount" 
import AddMilkRecording from "./AddMilkRecording";
import AddCow from "./AddCow";

const Stack = createStackNavigator()

function StackNavigation() {
    return(
        <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={TabNavigation} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Add Cow"  options={{headerShown: true}} component={AddCow} />
            <Stack.Screen name="Cow Details" options={{headerShown: true}} component={CowDetails} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Add Milk Recording" options={{headerShown: true}} component={AddMilkRecording} />
        </Stack.Navigator>
    )
}

export default StackNavigation;