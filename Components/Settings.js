import React from "react"
import { AntDesign } from '@expo/vector-icons'; 
import {auth} from "../firebase"
import {Card, ListItem, Avatar } from "react-native-elements"

function Settings({navigation}) {
    function signOut() {
        auth.signOut()
        navigation.navigate("Signin")
    }

    return (
        <Card>
            <ListItem onPress={signOut}>
                <Avatar><AntDesign name="logout" size={24} color="black" /></Avatar>
                <ListItem.Content>
                    <ListItem.Title>Sign Out</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </Card>
    )
}

export default Settings