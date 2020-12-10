import React, { useState } from "react"
import { StyleSheet,  View, Picker } from "react-native"
import { Card, Input, Button } from "react-native-elements"
import { db } from '../firebase'

const styles = StyleSheet.create({
    picker: {
        height: 50, 
        width: "95%",
        margin: "auto",
        marginBottom: "15px"
    }
})

function AddCow() {
    const [tagNum, setTagNum] = useState("")
    const [breed, setBreed] = useState("")
    const [medRecord, setMedRecord] = useState("")
     
    function add() {
        db.collection("cows").doc(tagNum).set({
           breed : breed,
           medRecord : medRecord
        }).then(() => {
            alert("Success")
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <Card>
            <Input
                style={styles.textInput}
                onChangeText={text => setTagNum(text)}
                value={tagNum}
                label="Tag Number"
            />  
            
             <Input
                style={styles.textInput}
                onChangeText={text => setMedRecord(text)}
                value={medRecord}
                multiline={true}
                label="Med Record"
            />  


            <Picker
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setBreed(itemValue)}
                selectedValue={breed}
            >
                <Picker.Item label="Fresian" value="Fresian" />
                <Picker.Item label="Angus" value="Angus" />
            </Picker>
            <Button title="Add Cow" onPress={add} />          
        </Card>
    )
}

export default AddCow