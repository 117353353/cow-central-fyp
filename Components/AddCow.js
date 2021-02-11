//importing libraries so they are recognised
import { useState } from "react"
import { StyleSheet,  View } from "react-native" // https://reactnative.dev/
import { Card, Input, Button } from "react-native-elements" // https://reactnativeelements.com/

//This links the page to the firstore database 
import { db } from '../firebase'

//importing for animal sex and animal breed components
// https://github.com/react-native-picker/picker
import {Picker} from '@react-native-picker/picker';


//This details the styling and correct sizing required for this page. reference= https://reactnative.dev/docs/stylesheet

const styles = StyleSheet.create({
    picker: {
        height: 50, 
        width: "100%",
        margin: "auto",
        marginBottom: 15
    },
    textInput: {
       
    }
})

//use state keeps track of variables. Creates the variables and makes them equal to a blank string as default. 
// They are updated automatically as the user types into the form. 
function AddCow() {
    // https://reactjs.org/docs/hooks-state.html

    const [tagNum, setTagNum] = useState("")
    const [dob, setDob] = useState("")
    const [breed, setBreed] = useState("")
    const [medRecord, setMedRecord] = useState("")
    const [weight, setWeight] = useState("")  
    const [sex, setSex] = useState("")

    //This function uses tag number as the id for the documents created in the database and creates the rows required to store the data
    function add() {
        // https://firebase.google.com/docs/firestore/manage-data/add-data
        db.collection("cows").doc(tagNum).set({
           breed : breed,
           dob : dob,
           medRecord : medRecord,
           weight : weight,
           sex :sex,
        }).then(() => {
            alert("Success")
        }).catch(error => {
            alert(error.message)
        })
    }

    /* These cards are created containing a textimput or datapicker to select the correct information for the cow profile. The card keep
     everything contained and very presentable on the application. It sets a value for the imput which is assigned to the row in the databse above. The button below then saves the newly created cow
    to the database. References= https://reactnative.dev/docs/textinput https://www.youtube.com/watch?v=F6r-a389_ac  */

    return (
        <Card>
            {/* 
                The value of this input is always equal to the tagNum variable at the top of this function. 
                As the user types, onChangeText is triggered which updates tagNum.            
            */}
            <Input
                style={styles.input}
                onChangeText={text => setTagNum(text)}
                value={tagNum}
                label="Tag Number"
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
                onValueChange={itemValue =>
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
                onValueChange={itemValue =>
                     setSex(itemValue)
                }>
                <Picker.Item label="Select Sex" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Male" />
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
    
            <Button title="Add Cow" onPress={add} />          
        </Card>
    )
}

//allows me to import add cow elsewhere if require. can be used as component.
export default AddCow