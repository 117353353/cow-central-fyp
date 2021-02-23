import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// My components (i.e references to each page for the tabs)

import AddCow from "./AddCow"
import CowList from "./CowList"
import Settings from "./Settings" 
import Home from "./Home";


// Icons  The icons displayed for each tab were got from = https://icons.expo.fyi/   */ 

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator();

/*Tab navigaion appear along the bottom of the application and allow easy naviagtion for the user between forms. Each tab is created
along with its size and colour. reference = https://reactnavigation.org/docs/tab-based-navigation/  The icons displayed for each tab 
were got from = https://icons.expo.fyi/*/ 

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
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ color, size }) => (<Feather name="settings" size={size} color={color} />)
            }} />
        </Tab.Navigator>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default TabNavigation;