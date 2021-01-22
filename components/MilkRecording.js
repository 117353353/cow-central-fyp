import React, { useState } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Card, Input, Text, Button } from "react-native-elements"
import {db} from "../firebase"

const styles = StyleSheet.create({

})

function MilkRecording() {
    const [cowId, setCowId] = useState(0)
    const [date, setDate] = useState(0)
    const [milkProduced, setMilkProduced] = useState(0)
    const [protein, setProtein] = useState(0)
    const [butterfat, setButterfat] = useState(0)
    const [cellCount, setCellCount] = useState(0)
    const [notes, setNotes] = useState("")

    function addMilkRecording() {
        db.collection("milkRecordings").doc().set({
            cowId: cowId,
            date: date,
            milkProduced: milkProduced,
            protein: protein,
            butterfat: butterfat,
            cellCount: cellCount,
            notes: notes
        }).then(() => {
            alert("SUCCESS!")
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <ScrollView>
            <Input
                style={styles.textInput}
                onChangeText={text => setCowId(text)}
                value={cowId}
                label="Tag Number"
                keyboardType="number-pad"
            />  
            <Input
                style={styles.textInput}
                onChangeText={text => setMilkProduced(text)}
                value={milkProduced}
                label="Volume of Milk Produced"
                keyboardType="number-pad"

            />  
            <Input
                style={styles.textInput}
                onChangeText={text => setProtein(text)}
                value={protein}
                label="Protein"
                keyboardType="number-pad"
            />  
            <Input
                style={styles.textInput}
                onChangeText={text => setButterfat(text)}
                value={butterfat}
                label="Butterfat"
                keyboardType="number-pad"
            />  
            <Input
                style={styles.textInput}
                onChangeText={text => setCellCount(text)}
                value={cellCount}
                label="Somatic Cell Count"
            />  
            <Input
                style={styles.textInput}
                onChangeText={text => setNotes(text)}
                value={notes}
                label="Notes"
                multiline={true}
            />  
            <Button title="Add Recording" onPress={addMilkRecording} />
        </ScrollView>
    )
}

export default MilkRecording
