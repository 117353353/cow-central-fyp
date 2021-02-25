//importing libraries so they are recognised
import React, { useState} from "react"
import { StyleSheet,  View, TouchableOpacity } from "react-native" // https://reactnative.dev/
import { Card, Input, Button, BottomSheet, ListItem, Text } from "react-native-elements" // https://reactnativeelements.com/
import { FontAwesome } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker'

//This links the page to the firstore database 
import { db } from '../firebase'

//importing for animal sex and animal breed components
// https://github.com/react-native-picker/picker
import {Picker} from '@react-native-picker/picker';


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

    const [breedsListVisible, setBreedsListVisible] = useState(false)
    const [sexListVisible, setSexListVisible] = useState(false)

    const breedsList = [
        { 
            title: 'Fresian',
            onPress: () => { 
                setBreed("Fresian")  
                setBreedsListVisible(false)
            }
        },
        { 
            title: 'Charolais',
            onPress: () => {
                setBreed("Charolais") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Angus',
            onPress: () => {
                setBreed("Angus") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Jersey',
            onPress: () => {
                setBreed("Jersey") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Hereford',
            onPress: () => {
                setBreed("Hereford") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Limousin',
            onPress: () => {
                setBreed("Limousin") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Aubrac',
            onPress: () => {
                setBreed("Aubrac") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Saler',
            onPress: () => {
                setBreed("Saler") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Shorthorn',
            onPress: () => {
                setBreed("Shorthorn") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Simmental',
            onPress: () => {
                setBreed("Simmental") 
                setBreedsListVisible(false)
            } 
        },
        { 
            title: 'Parthenais',
            onPress: () => {
                setBreed("Parthenais") 
                setBreedsListVisible(false)
            } 
        },
        {
          title: 'Cancel',
          containerStyle: { backgroundColor: 'red' },
          titleStyle: { color: 'white' },
          onPress: () => setBreedsListVisible(false),
        },
    ]

    const sexList = [
        { 
            title: 'Male',
            onPress: () => {
                setSex("Male")  
                setSexListVisible(false)
            }
        },
        { 
            title: 'Female',
            onPress: () => {
                setSex("Female") 
                setSexListVisible(false)
            } 
        },
        {
          title: 'Cancel',
          containerStyle: { backgroundColor: 'red' },
          titleStyle: { color: 'white' },
          onPress: () => setSexListVisible(false),
        },
    ]

    //This function uses tag number as the id for the documents created in the database and creates the rows required to store the data
    function add() {
        // https://firebase.google.com/docs/firestore/manage-data/add-data
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

    /* These cards are created containing a textimput or datapicker to select the correct information for the cow profile. The card keep
     everything contained and very presentable on the application. It sets a value for the imput which is assigned to the row in the databse above. The button below then saves the newly created cow
    to the database. References= https://reactnative.dev/docs/textinput https://www.youtube.com/watch?v=F6r-a389_ac  */

    return (
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

            <TouchableOpacity onPress={() => setBreedsListVisible(true)}>
                <Input 
                    label="Breed"
                    value={breed}
                    rightIcon={<FontAwesome name="chevron-down" size={24} color="grey" />}
                    disabled
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSexListVisible(true)}>
                <Input 
                    label="Sex"
                    value={sex}
                    rightIcon={<FontAwesome name="chevron-down" size={24} color="grey" />}
                    disabled
                    disabledInputStyle={{color: "black"}}
                />
            </TouchableOpacity>
                    
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
    
            <Text style={{marginLeft: 10}}>Date of Birth</Text>
            <DateTimePicker
                value={dob}
                mode={"date"}
                display="default"
                onChange={(event, date) => setDob(date)}
                style={{marginBottom: 20}}
            />

            <Button title="Add Cow" onPress={add} />          

            <BottomSheet isVisible={breedsListVisible}>
                {breedsList.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet> 

            <BottomSheet isVisible={sexListVisible}>
                {sexList.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </Card>
    )
}

//allows me to import add cow elsewhere if require. can be used as component.
export default AddCow