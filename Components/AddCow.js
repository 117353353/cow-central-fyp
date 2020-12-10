import React, { useState } from "react"
import { StyleSheet, Button, View, TextInput, Picker } from "react-native"
import { db } from '../firebase'

const styles = StyleSheet.create({
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    picker: {
        height: 50, 
        width: 150
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
        <View>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setTagNum(text)}
                value={tagNum}
            />  
            
             <TextInput
                style={styles.textInput}
                onChangeText={text => setMedRecord(text)}
                value={medRecord}
                multiline={true}
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
        </View>
    )
}

export default AddCow