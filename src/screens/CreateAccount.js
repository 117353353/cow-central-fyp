//Import libraries
import React, { useState, useContext } from "react"
import { StyleSheet } from "react-native"
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
                console.log(error.message)
            })
    }

    return (
        <>
            <Card>
                <Text style={{textAlign: "center", color: theme.colors.primary, fontSize: 15}}>Welcome to</Text>
                <Text style={{textAlign: "center", fontStyle: "italic", fontWeight: "bold", fontSize: 30, color: "#2b96d9"}}>
                    Cow Central
                </Text>
            </Card>
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
        </>
    )   
}

const styles = StyleSheet.create({
    textInput: {
        
    }
})
  
   
export default CreateAccount
