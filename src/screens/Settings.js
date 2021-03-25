//Import libraries
import React from "react"
import { StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons' 
import { Card, ListItem, Avatar } from "react-native-elements"
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from "src/firebase"
import MyScrollView from "src/components/MyScrollView"

function Settings({navigation}) {
    function signOut() {
        // Ends current sign in session. 
        // https://firebase.google.com/docs/auth/web/password-auth
        auth.signOut()
        navigation.navigate("Signin")
    }

    return (
        //list items navigating to different components
        <MyScrollView>
            <Card containerStyle={{padding: 0}} style={{padding: 0}}>

                <ListItem onPress={() => navigation.navigate("Cow Archive")} bottomDivider>
                    <MaterialCommunityIcons name="cow" style={styles.icon}/>
                    <ListItem.Content>
                        <ListItem.Title>Cow Archive</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <ListItem onPress={() => navigation.navigate("Calving Archive")} bottomDivider>
                    <MaterialCommunityIcons name="baby-bottle-outline" style={styles.icon}/>
                    <ListItem.Content>
                        <ListItem.Title>Calving Archive</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <ListItem onPress={signOut}>
                    <AntDesign name="logout" style={styles.icon}/>
                    <ListItem.Content>
                        <ListItem.Title>Sign Out</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

            </Card>
        </MyScrollView>    
    )
}

const styles = StyleSheet.create({ 
    icon: {
        marginRight: 10,
        fontSize: 30,
        color: "black",
        padding: 5
    }
})


export default Settings