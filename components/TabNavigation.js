import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// My components.
import AddCow from "./AddCow"
import CowList from "./CowList"
import MilkRecording from "./MilkRecording"
import Settings from "./Settings" 

// Icons. 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';  

const Tab = createBottomTabNavigator();

function TabNavigation() {
    const color = "black";
    const size = 24;

    return(
        <Tab.Navigator initialRouteName="Cows">
            <Tab.Screen name="Add Cow" component={AddCow} options={{
                tabBarIcon: ({ color, size }) => (<AntDesign name="plussquareo" size={size} color={color} />)
            }} />
            <Tab.Screen name="Cows" component={CowList} options={{
                tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cow" size={size} color={color} />)
            }} />
            <Tab.Screen name="Milk Recording" component={MilkRecording} options={{
                tabBarIcon: ({ color, size }) => (<Entypo name="bucket" size={size} color={color} />)
            }} />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ color, size }) => (<Feather name="settings" size={size} color={color} />)
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigation;