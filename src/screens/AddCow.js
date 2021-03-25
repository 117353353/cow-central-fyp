import React, { useState} from "react"
import { StyleSheet, ToastAndroid } from "react-native" // https://reactnative.dev/
import { Card, Input, Button } from "react-native-elements" // https://reactnativeelements.com/
import { useNavigation } from '@react-navigation/native'

import MyScrollView from "components/MyScrollView"
import DatePicker from "components/DatePicker"
import Picker from "components/Picker"
import { addCow } from "src/firestore"


//use state keeps track of variables. Creates the variables and makes them equal to a blank string as default. 
// They are updated automatically as the user types into the form. 
function AddCow() {
    // https://reactjs.org/docs/hooks-state.html
    const [tagNum, setTagNum] = useState("")
    const [dob, setDob] = useState(new Date())
    const [breed, setBreed] = useState("")
    const [medRecord, setMedRecord] = useState("")
    const [weight, setWeight] = useState("")  
    const [sex, setSex] = useState("")

    // Gives us access to navigation functionality from this component. 
    const navigation = useNavigation();

    // List of options for Picker. 
    const breedList = ["Friesian", "Charolais", "Angus", "Jersey", "Hereford", "Limousin", "Aubrac", "Saler", "Shorthorn", "Simmental", "Parthenais"]
    const sexList = ["Male", "Female"]


    //This function adds the reord to the database
    //parsefloat converts a string to a float to allow for decimal places
    function add() {
        addCow(tagNum, breed, dob, medRecord, parseFloat(weight), sex)
            .then(() => {
                ToastAndroid.show('Added Successfully', ToastAndroid.SHORT)
                navigation.goBack()
            }).catch(error => {
                alert(error.message)
            })
    }

    /* These cards are created containing a textimput or datapicker to select the correct information for the cow profile. The card keep
     everything contained and very presentable on the application. It sets a value for the imput which is assigned to the state variables above. 
     The button below then saves the newly created cow to the database. 
     References= https://reactnative.dev/docs/textinput https://www.youtube.com/watch?v=F6r-a389_ac  */

    return (
        <MyScrollView>
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
                    keyboardType="number-pad"
                />  
    
                <Picker value={breed} setValue={setBreed} options={breedList} label="Breed" />
                
                <Picker value={sex} setValue={setSex} options={sexList} label="Sex" />

                <Input
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    onChangeText={text => setWeight(text)}
                    value={weight}
                    label="Weight"        
                />  

                <Input
                    style={styles.textInput}
                    onChangeText={text => setMedRecord(text)}
                    value={medRecord}
                    multiline={true}
                    label="Medical Record"
                />  
        
                <DatePicker date={dob} setDate={setDob} label="Date of Birth"/>

                <Button title="Add Cow" onPress={add} />          
            </Card>
        </MyScrollView>     
    )
}

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

//allows me to import add cow elsewhere if require. can be used as component.
export default AddCow