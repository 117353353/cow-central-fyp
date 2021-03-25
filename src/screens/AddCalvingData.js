import React, { useState } from "react"
import { ToastAndroid } from "react-native"
import { Card, Input, Button } from "react-native-elements"

import MyScrollView from "components/MyScrollView"
import DatePicker from "components/DatePicker"
import { addCalving } from "src/firestore"

// Route contains params passed with navigation. https://reactnavigation.org/docs/params/
function AddCalvingData({route, navigation}) {
    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState("")
    const tagNum = route.params.tagNum

    //function for adding the record to the database 
    function addRecord() {
        addCalving(tagNum, date, notes)
            .then(() => {
                navigation.goBack() // Navigates back to previous page. 
                ToastAndroid.show('Added successfully', ToastAndroid.SHORT)
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <MyScrollView>
            <Card>   
                <Input
                    value={tagNum}
                    label="Tag Number"
                    keyboardType="number-pad"
                    disabled={true}
                />  

                <Input
                    onChangeText={text => setNotes(text)}
                    value={notes}
                    label="Notes"
                    multiline={true}
                />  

                <DatePicker date={date} setDate={setDate} label="Calving Date"/>

                <Button title="Add Recording" onPress={addRecord} />
            </Card>      
        </MyScrollView>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default AddCalvingData