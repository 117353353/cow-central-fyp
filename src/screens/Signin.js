//Import libraries
import React, { useState, useContext } from "react"
import { StyleSheet } from "react-native"
import { ThemeContext, Card, Input, Button, Text } from "react-native-elements"

// Links to the authorisation framework for firebase
import { auth } from "src/firebase"

//Creating the variables
function Signin({navigation}){
    const [email, setEmail] = useState("test7@gmail.com")
    const [password, setPassword] = useState("password")

    const { theme } = useContext(ThemeContext)

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
        <>
            <Card>
                <Text style={{textAlign: "center", color: theme.colors.primary, fontSize: 15}}>Welcome back to</Text>
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
                
                <Button title="Sign In" onPress={signIn}/>    

                <Text style={{textAlign: "center", marginTop: 20, marginBottom: 5}} onPress={() => navigation.navigate("CreateAccount")}>Create Account</Text>
            </Card>
        </>
    )   
    }
  
    const styles = StyleSheet.create({
    textInput: {
        
    }
    })
   
    export default Signin
