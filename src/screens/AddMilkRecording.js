//Importing components from various libraries/packages. 
import React, { useState } from "react"
import { Card, Input, Text, Button } from "react-native-elements"
import { db } from "src/firebase"
import MyScrollView from "components/MyScrollView"
import DateTimePicker from '@react-native-community/datetimepicker'


//use state keeps track of variables. Creates the variables and makes them equal to a blank string as default. 
// They are updated automatically as the user types into the form. 

function AddMilkRecording({navigation, route}) {
    const [date, setDate] = useState(new Date())
    const [milkProduced, setMilkProduced] = useState(0)
    const [protein, setProtein] = useState(0)
    const [butterfat, setButterfat] = useState(0)
    const [cellCount, setCellCount] = useState(0)
    const [notes, setNotes] = useState("")

//This function then creates the necessary fields required in the databse to store the correct information relating to a milk recording
    // 1. Selects "milkRecordings" collection. 
    // 2. Creates a new document with a randomy generated ID. 
    // 3. Adds field tagNum with value of tagNum variable from above. Same for rest. 
    // 4. .then if succesful | .catch if failed. 

    function addRecord() {
        db.collection("milkRecordings").doc(/*This is left empty, so Firebase generates a random id for the document*/).set({
            tagNum: route.params.tagNum,
            date: date,
            milkProduced: milkProduced,
            protein: protein,
            butterfat: butterfat,
            cellCount: cellCount,
            notes: notes
        }).then(() => {
            navigation.goBack()
        }).catch(error => {
            alert(error.mesage)
        })
    }

    return (
        /* 
        Scrollview expands to its content, allowing user to scroll down the page. 
            
        The card created here allow the user to input the milk recording results.

        The keyboard type as a form of error handling to limit the type of imput that can be imputed
        */

        <MyScrollView>
            <Card>   
                <Input
                    value={route.params.tagNum}
                    label="Tag Number"
                    disabled={true}
                />  
                <Input
                    onChangeText={text => setMilkProduced(text)}
                    value={milkProduced}
                    label="Volume of Milk Produced"
                    keyboardType="decimal-pad"
                />  
                <Input
                    onChangeText={text => setProtein(text)}
                    value={protein}
                    label="Protein"
                    keyboardType="decimal-pad"
                />  
                <Input
                    onChangeText={text => setButterfat(text)}
                    value={butterfat}
                    label="Butterfat"
                    keyboardType="decimal-pad"
                />  
                <Input
                    onChangeText={text => setCellCount(text)}
                    value={cellCount}
                    label="Somatic Cell Count"
                    keyboardType="decimal-pad"
                />  
                <Input
                    onChangeText={text => setNotes(text)}
                    value={notes}
                    label="Notes"
                    multiline={true}
                />  

                <DateTimePicker
                    value={date}
                    mode={"date"}
                    display="default"
                    onChange={(event, date) => setDate(date)}
                    style={{marginBottom: 20}}
                />
                <Button title="Add Recording" onPress={addRecord} />
            </Card>
        </MyScrollView>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default AddMilkRecording
