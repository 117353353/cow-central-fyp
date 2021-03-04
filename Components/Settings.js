//Import libraries
import React from "react"
import { AntDesign } from '@expo/vector-icons'; 
import { auth } from "../firebase"
import { Card, ListItem, Avatar, Text} from "react-native-elements"
import MyScrollView from "./MyScrollView"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

function Settings({navigation}) {
    function signOut() {
        // Ends current sign in session. 
        // https://firebase.google.com/docs/auth/web/password-auth
        auth.signOut()
        navigation.navigate("Signin")
    }
    
    const iconColor="black"
    const iconSize=24

    return (
        <MyScrollView>
            <Card containerStyle={{padding: 0}} style={{padding: 0}}>
                <ListItem onPress={() => navigation.navigate("Cow Archive")}>
                    <Avatar><MaterialCommunityIcons name="cow" size={iconSize} color={iconColor}/></Avatar>
                    <ListItem.Content>
                        <ListItem.Title>Cow Archive</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem onPress={() => navigation.navigate("Calving Calendar", {archived: true})} bottomDivider>
                    <Avatar><MaterialCommunityIcons name="baby-bottle-outline" size={iconSize} color={iconColor} /></Avatar>
                    <ListItem.Content>
                        <ListItem.Title>Calving Archive</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem onPress={signOut}>
                    <Avatar><AntDesign name="logout" size={iconSize} color={iconColor}/></Avatar>
                    <ListItem.Content>
                        <ListItem.Title>Sign Out</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </Card>
        </MyScrollView>    
    )
}

export default Settings