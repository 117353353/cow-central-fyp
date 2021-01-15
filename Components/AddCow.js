import React, { useState } from "react"
import { StyleSheet,  View } from "react-native"
import { Card, Input, Button } from "react-native-elements"
import { db } from '../firebase'
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
    picker: {
        height: 50, 
        width: "100%",
        margin: "auto",
        marginBottom: 15
    }
})

function AddCow() {
    const [tagNum, setTagNum] = useState("")
    const [dob, setDob] = useState("")
    const [breed, setBreed] = useState("")
    const [medRecord, setMedRecord] = useState("")
    const [weight, setWeight] = useState("")  
    const [sex, setSex] = useState("")

    function add() {
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

           {/*  <Picker
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setBreed(itemValue)}
                value={breed}
                selectedValue={breed}
            >
                <Picker.Item label="Fresian" value="Fresian" />
                <Picker.Item label="Angus" value="Angus" />
            </Picker> */}
            <Button title="Add Cow" onPress={add} />          
        </Card>
    )
}

export default AddCow