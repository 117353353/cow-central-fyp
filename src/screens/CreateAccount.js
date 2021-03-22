//Import libraries
import React, { useState, useContext } from "react"
import { StyleSheet, ImageBackground } from "react-native"
import { ThemeContext, Card, Input, Button, Text } from "react-native-elements"
import { auth } from 'src/firebase'

//creating variables
function CreateAccount({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { theme } = useContext(ThemeContext)

    //function build into firebase 
    //https://firebase.google.com/docs/auth/web/password-auth
    function signUp(){
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert("Account with email " + email + " created successfully!")
                navigation.navigate("Main")
            }).catch(error => {
                alert(error.message)
            })
    }

    const image = require("../assets/background.jpeg")

    return (
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
                <Text style={{textAlign: "center", marginTop: 20, marginBottom: 5}} onPress={() => navigation.navigate("Signin")}>Existing Account?</Text>
            </Card>
        </ImageBackground>
    )   
}

const styles = StyleSheet.create({
    textInput: {
        
    },
    background: {
        height: "100%",
        width: "100%"  
    }
})
  
   
export default CreateAccount
