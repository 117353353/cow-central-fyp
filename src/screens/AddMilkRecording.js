//Importing components from various libraries/packages. 
import React, { useState } from "react"
import { ToastAndroid } from "react-native"
import { Card, Input, Button } from "react-native-elements"

import MyScrollView from "components/MyScrollView"
import DatePicker from "components/DatePicker"
import { addMilkRecording } from "../firestore"

//use state keeps track of variables. Creates the variables and makes them equal to a blank string as default. 
// They are updated automatically as the user types into the form. 

function AddMilkRecording({navigation, route}) {
    const [date, setDate] = useState(new Date())
    const [milkProduced, setMilkProduced] = useState("")
    const [protein, setProtein] = useState("")
    const [butterfat, setButterfat] = useState("")
    const [cellCount, setCellCount] = useState("")
    const [notes, setNotes] = useState("")

//This function then creates the necessary fields required in the databse to store the correct information relating to a milk recording
    // 1. Selects "milkRecordings" collection. 
    // 2. Creates a new document with a randomy generated ID. 
    // 3. Adds field tagNum with value of tagNum variable from above. Same for rest. 
    // 4. .then if succesful | .catch if failed. 

    //parsefloat converts string to float which allows for decimal places. 
    function addRecord() {
        addMilkRecording(route.params.tagNum, date, parseFloat(milkProduced), parseFloat(protein), parseFloat(butterfat), parseFloat(cellCount), notes)
            .then(() => {
                ToastAndroid.show('Added Successfully', ToastAndroid.SHORT)
                navigation.goBack()
            }).catch(error => {
                alert(error.message)
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

                <DatePicker date={date} setDate={setDate} label="Date"/>

                <Button title="Add Recording" onPress={addRecord} />
            </Card>
        </MyScrollView>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default AddMilkRecording
