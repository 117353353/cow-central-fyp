//importing the relevat items so they can be recognised 
import React, {useState, useEffect} from "react"
import {ScrollView, TouchableOpacity, StyleSheet} from "react-native"
import {Card, Text, Button, Input} from "react-native-elements"

//linking the form to the database 
import {db} from "../firebase"

//Import picker library
import {Picker} from '@react-native-picker/picker';

//importing 
import AddCow from "./AddCow"


// stylesheet determines the styling on the form
const styles = StyleSheet.create({
    picker: {
        height: 50, 
        width: "100%",
        margin: "auto",
        marginBottom: 15
    },
    deleteBtn: {
        padding: 0
    }
})


// Use state keeps track of variables. Creates the variables and makes them equal to a blank string as default. 
// They are updated automatically as the user types into the form. 

function CowDetails({navigation, route}) {
    const [tagNum, setTagNum] = useState("")
    const [dob, setDob] = useState("")
    const [breed, setBreed] = useState("")
    const [medRecord, setMedRecord] = useState("")
    const [weight, setWeight] = useState("")  
    const [sex, setSex] = useState("")

    // https://reactjs.org/docs/hooks-effect.html
    //useffect stops function being called every time component is refreshed
    useEffect(() => {
        getCow()
    }, [])
    
//https://firebase.google.com/docs/firestore/query-data/get-data
// Retrieving a single document from the database using tag num, each cow has a single document which is identiable by their tag number. (The documents name is the cows tag number)
// Route.params contains the values we sent from CowList e.g navigation.navigate("CowDetails", {tagNum})
// Updates state variables with value retrieved from database 
function getCow() {
        db.collection("cows").doc(route.params.tagNum).get()
        .then(doc => {
            setTagNum(doc.id)
            setDob(doc.data().dob)
            setBreed(doc.data().breed)
            setMedRecord(doc.data().medRecord)
            setWeight(doc.data().weight)
            setSex(doc.data().sex)
        }).catch(error => {
            console.log(error.message)
        })
    }

    //This function updates the database with the variables which ay have changed.
    function update() {
        db.collection("cows").doc(tagNum).set({
           breed : breed,
           dob : dob,
           medRecord : medRecord,
           weight : weight,
           sex : sex,
        }).then(() => {
            // Redirects back to previous page. 
            navigation.goBack()
            alert("Updated Successfully")
        }).catch(error => {
            alert(error.message)
        })
    }

    //function which deletes the cow record from the database  
    function deleteCow() {
        db.collection("cows").doc(tagNum).delete()
            .then(() => {
                navigation.goBack()
            }).catch(error => {
                console.log(error.message)
            })
    }

    
    //Scrollview expands to its content, allowing user to scroll down the page. 
    //The card created here allow the user to input the milk recording results.
    //The keyboard type as a form of error handling to limit the type of imput that can be imputed

    return (
        <ScrollView>
            <Card>
                <Input
                    style={styles.textInput}
                    value={tagNum}
                    label="Tag Number"
                    disabled={true}
                />  

                <Input
                    style={styles.textInput}
                    onChangeText={text => setDob(text)}
                    value ={dob}
                    label="Date of Birth"
                />  

                <Picker
                    selectedValue={breed}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        setBreed(itemValue)
                    }>
                    <Picker.Item label="Select Breed" value="" />
                    <Picker.Item label="Fresian" value="Fresian" />
                    <Picker.Item label="Angus" value="Angus" />
                    <Picker.Item label="Hereford" value="Hereford" />
                    <Picker.Item label="Charolais" value="Charolais" />
                </Picker>

                <Picker
                    selectedValue={sex}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        setSex(itemValue)
                    }>
                    <Picker.Item label="Select Sex" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
                        

                <Input
                    style={styles.textInput}
                    onChangeText={text => setWeight(text)}
                    value= {weight}
                    label="Weight"
                />  

                <Input
                    style={styles.textInput}
                    onChangeText={text => setMedRecord(text)}
                    value={medRecord}
                    multiline={true}
                    label="Medical Record"
                />  

                <Button title="Save" onPress={update} />          
            </Card>
            <Card style={styles.deleteBtn}>
                <Button onPress={deleteCow} title="Delete" />
            </Card>
        </ScrollView>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default CowDetails