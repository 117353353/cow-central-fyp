import React, {useState} from "react";
import {StyleSheet} from "react-native"
import {Card, Input, Button, Text} from "react-native-elements"
import {auth} from "../firebase"

function Signin({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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

            <Text onPress={() => navigation.navigate("CreateAccount")}>Create Account</Text>
        </Card>
    )   
}

const styles = StyleSheet.create({
    textInput: {
        
    }
})
  
   
export default Signin
