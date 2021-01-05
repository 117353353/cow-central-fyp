import React, {useState, useEffect} from "react"
import {StyleSheet} from "react-native"
import {Card, Text, Button, Input} from "react-native-elements"
import {db} from "../firebase"
import {Picker} from '@react-native-picker/picker';
import AddCow from "./AddCow"

const styles = StyleSheet.create({
    picker: {
        height: 50, 
        width: "100%",
        margin: "auto",
        marginBottom: "15px"
    }
})

function CowDetails({navigation, route}) {
    const [tagNum, setTagNum] = useState("")
    const [dob, setDob] = useState("")
    const [breed, setBreed] = useState("")
    const [medRecord, setMedRecord] = useState("")
    const [weight, setWeight] = useState("")  
    const [sex, setSex] = useState("")

    useEffect(() => {
        getCow()
    }, [])

    function getCow() {
        db.collection("cows").doc(route.params.cowId).get()
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

    function update() {
        db.collection("cows").doc(tagNum).set({
           breed : breed,
           dob : dob,
           medRecord : medRecord,
           weight : weight,
           sex : sex,
        }).then(() => {
            navigation.goBack()
            alert("Updated Successfully")
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
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
    )
}

export default CowDetails