//Import libraries
import React, { useState } from "react"
import { StyleSheet, ImageBackground } from "react-native"
import { Card, Input, Button, Text } from "react-native-elements"

// Links to the authorisation framework for firebase
import { auth } from "src/firebase"


function Signin({navigation}){
    //Creating the variables
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //https://firebase.google.com/docs/auth/web/password-auth
    //uses authorization framework from firstore
    function signIn() {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate("Main")
            }).catch(error=> {
                alert(error.message)
            })
    }

    const image = require("../assets/background.jpeg")

    return (
        // https://reactnative.dev/docs/imagebackground
            <ImageBackground source={image} style={styles.background}>
                <Text style={{textAlign: "center", marginTop: 40, marginBottom: 25, color: "white", fontSize: 25, fontWeight: "bold", textShadowColor: "black", textShadowRadius: 50}}>Welcome back to Cow Central!</Text>
                <Card>          
                    <Input
                        onChangeText={text => setEmail(text)}
                        value={email}
                        label="Email"
                    />  
                        
                    <Input 
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        label="Password"
                    />  
                    
                    <Button title="Sign In" onPress={signIn}/>  
                      
                     {/*create account button created which naivagtes ot the create account component */}
                    <Text style={{textAlign: "center", marginTop: 20, marginBottom: 5}} onPress={() => navigation.navigate("CreateAccount")}>Create Account</Text>
                </Card>
            </ImageBackground>
    )   
    }
  
    const styles = StyleSheet.create({
        background: {
          height: "100%",
          width: "100%",
          flexDirection: "column", 
          flex: 1
        }
    })
   
    export default Signin
