import React, { useContext } from "react"
import { ThemeContext } from "react-native-elements"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
// My components (i.e references to each page for the tabs)

import AddCow from "screens/AddCow"
import CowList from "screens/CowList"
import Settings from "screens/Settings" 
import Home from "screens/Home"
/* import Calving from "screens/Calving" */

// Icons  The icons displayed for each tab were got from = https://icons.expo.fyi/   */ 
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const Tab = createMaterialTopTabNavigator()

/*Tab navigaion appear along the bottom of the application and allow easy naviagtion for the user between forms. Each tab is created
along with its size and colour. reference = https://reactnavigation.org/docs/tab-based-navigation/  The icons displayed for each tab 
were got from = https://icons.expo.fyi/*/ 

function TabNavigation() {
    const { theme } = useContext(ThemeContext)
    const iconSize = 25

    return(
        <Tab.Navigator 
            initialRouteName="Home" 
            tabBarPosition="bottom"
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                activeTintColor: theme.colors.primary,
                inactiveTintColor: "grey"
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => (<FontAwesome name="home" size={iconSize} color={color} />)
            }} />
            <Tab.Screen name="Cows" component={CowList} options={{
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="cow" size={iconSize} color={color} />)
            }} />
{/*             <Tab.Screen name="Calving" component={Calving} options={{
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="baby-bottle-outline" size={iconSize} color={color} />)
            }} /> */}
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ color }) => (<Feather name="settings" size={iconSize} color={color} />)
            }} />
        </Tab.Navigator>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default TabNavigation