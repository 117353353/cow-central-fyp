import React, { useState } from "react"
import { Card, Input, Button } from "react-native-elements"
import MyScrollView from "components/MyScrollView"
import { addCalving } from "api/firestore.js"
import DatePicker from "components/DatePicker"

function AddCalvingData({route, navigation}) {
    const [date, setDate] = useState(new Date())
    const [dob, setDob] = useState(new Date())
    const [notes, setNotes] = useState("")

    function addRecord() {
        addCalving(route.params.tagNum, date, notes)
            .then(() => {
                navigation.goBack()
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <>
            <MyScrollView>
                <Card>   
                    <Input
                        value={route.params.tagNum}
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

                    <DatePicker date={date} setDate={setDate} label="Date of Birth"/>

                    <Button title="Add Recording" onPress={addRecord} />
                </Card>      
            </MyScrollView>
        </>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default AddCalvingData