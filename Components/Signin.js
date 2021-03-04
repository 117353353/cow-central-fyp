//Import libraries
import React, {useState} from "react";
import {StyleSheet } from "react-native"
import {Card, Input, Button, Text} from "react-native-elements"

// Links to the authorisation framework for firebase
import {auth} from "../firebase"

//Creating the variables
function Signin({navigation}){
    const [email, setEmail] = useState("test7@gmail.com")
    const [password, setPassword] = useState("password")

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

    return (
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
            
            <Button title="SignIn" onPress={signIn}/>    

            <Text style={{textAlign: "center", marginTop: 20}} onPress={() => navigation.navigate("CreateAccount")}>Create Account</Text>
        </Card>
    )   
    }
  
    const styles = StyleSheet.create({
    textInput: {
        
    }
    })
   
    export default Signin
