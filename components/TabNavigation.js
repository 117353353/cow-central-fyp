import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// My components.
import AddCow from "./AddCow"
import CowList from "./CowList"
import MilkRecording from "./MilkRecording"
import CalvingInfo from "./CalvingInfo"
import Settings from "./Settings" 
import Home from "./Home";

// Icons. 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator();

function TabNavigation() {
    const size = 24;
    const color = "black";

    return(
        <Tab.Navigator initialRouteName="Cows">
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color, size }) => (<FontAwesome name="home" size={size} color={color} />)
            }} />
            <Tab.Screen name="Cows" component={CowList} options={{
                tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cow" size={size} color={color} />)
            }} />
            <Tab.Screen name="Milk Recording" component={MilkRecording} options={{
                tabBarIcon: ({ color, size }) => (<Entypo name="bucket" size={size} color={color} />)
            }} />
             <Tab.Screen name="Calving" component={CalvingInfo} options={{
                tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="baby-bottle-outline" size={size} color={color} />)
            }} />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ color, size }) => (<Feather name="settings" size={size} color={color} />)
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigation;