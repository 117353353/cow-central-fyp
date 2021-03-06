//Import libraries
import React, { useState } from "react"
import { StyleSheet, ImageBackground } from "react-native"
import {  Card, Input, Button, Text } from "react-native-elements"
import { auth } from 'src/firebase'
import { ToastAndroid } from "react-native"

//creating variables
function CreateAccount({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //function build into firebase 
    //https://firebase.google.com/docs/auth/web/password-auth
    function signUp(){
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                ToastAndroid.show("Account with email " + email + " created successfully!", ToastAndroid.SHORT)
                navigation.navigate("Main")
            }).catch(error => {
                alert(error.message)
            })
    }

    const image = require("../assets/background.jpeg")

    return (
        // https://reactnative.dev/docs/imagebackground
        <ImageBackground source={image} style={styles.background} style={{flexDirection: "column", flex: 1}}>
            <Text style={{textAlign: "center", marginTop: 40, marginBottom: 25, color: "white", fontSize: 25, fontWeight: "bold", textShadowColor: "black", textShadowRadius: 50}}>Welcome to Cow Central!</Text>
            <Card>          
                <Input
                    style={styles.textInput}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    label="Email"
                />  
                    
                <Input 
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    label="Password"
                />  
                
                <Button title="Create Account" onPress={signUp}/>    

                {/* Navigates to Signin component */}
                <Text style={{textAlign: "center", marginTop: 20, marginBottom: 5}} onPress={() => navigation.navigate("Signin")}>Existing Account?</Text>
            </Card>
        </ImageBackground>
    )   
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%"  
    }
})
  
export default CreateAccount
