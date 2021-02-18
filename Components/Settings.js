//Import libraries
import React from "react"
import { AntDesign } from '@expo/vector-icons'; 
import {auth} from "../firebase"
import {Card, ListItem, Avatar } from "react-native-elements"
import MyScrollView from "./MyScrollView"

function Settings({navigation}) {
    function signOut() {
        // Ends current sign in session. 
        // https://firebase.google.com/docs/auth/web/password-auth
        auth.signOut()
        navigation.navigate("Signin")
    }

    
    return (
        <MyScrollView>
            <Card>
                <ListItem onPress={signOut}>
                    <Avatar><AntDesign name="logout" size={24} color="black" /></Avatar>
                    <ListItem.Content>
                        <ListItem.Title>Sign Out</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </Card>
        </MyScrollView>    
    )
}

export default Settings