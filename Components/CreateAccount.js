//Import libraries
import React, {useState} from "react";
import {StyleSheet} from "react-native"
import {Card, Input, Button, Text} from "react-native-elements"
import {auth} from '../firebase'

//creating variables
function CreateAccount({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    
    //function build into firebase 
    //https://firebase.google.com/docs/auth/web/password-auth
    function signUp(){
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert("Account with email " + email + " created successfully!")
                navigation.navigate("Main")
            }).catch(error => {
                console.log(error.message)
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
            
            <Button title="Create Account" onPress={signUp}/>    
            <Text onPress={() => navigation.navigate("Signin")}>Existing account?</Text>
        </Card>
    )   
}

const styles = StyleSheet.create({
    textInput: {
        
    }
})
  
   
export default CreateAccount
