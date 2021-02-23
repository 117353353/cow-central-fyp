//importing the relevat items so they can be recognised 
import React, {useState, useEffect} from "react"
import {ScrollView, TouchableOpacity, StyleSheet} from "react-native"
import {Card, Text, Button, Input, ListItem } from "react-native-elements"

//linking the form to the database 
import {db} from "../firebase"

//Import picker library
import {Picker} from '@react-native-picker/picker';

//importing 
import AddCow from "./AddCow"
import MyScrollView from "./MyScrollView"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { FloatingAction } from "react-native-floating-action"; 
import Calving from "./Calving"
import MilkRecording from "./MilkRecording"

// stylesheet determines the styling on the form
const styles = StyleSheet.create({
    picker: {
        height: 125, 
        width: "100%",
        margin: "auto",
        marginBottom: 15
    },
    deleteBtn: {
        padding: 0,
        backgroundColor: "red",
    }
})

// Use state keeps track of variables. Creates the variables and makes them equal to a blank string as default. 
// They are updated automatically as the user types into the form. 

function CowDetails({navigation, route}) {
    const [tagNum, setTagNum] = useState("")
    const [dob, setDob] = useState("")
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

    // https://reactjs.org/docs/hooks-effect.html
    //useffect stops function being called every time component is refreshed
    useEffect(() => {
        getCow()
    }, [])
    
    //https://firebase.google.com/docs/firestore/query-data/get-data
    // Retrieving a single document from the database using tag num, each cow has a single document which is identiable by their tag number. (The documents name is the cows tag number)
    // Route.params contains the values we sent from CowList e.g navigation.navigate("CowDetails", {tagNum})
    // Updates state variables with value retrieved from database 
    function getCow() {
        db.collection("cows").doc(route.params.tagNum).get()
        .then(doc => {
            setTagNum(doc.id)
            setBreed(doc.data().breed)
            setMedRecord(doc.data().medRecord)
            setWeight(doc.data().weight)
            setSex(doc.data().sex)

            let date = doc.data().dob.toDate() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
            let dobString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
            setDob(dobString)
        }).catch(error => {
            console.log(error.message)
        })
    }

    //This function updates the database with the variables which ay have changed.
    function update() {
        db.collection("cows").doc(tagNum).update({
           medRecord : medRecord,
           weight : weight,
           sex : sex,
        }).then(() => {
            // Redirects back to previous page. 
            navigation.goBack() 
            alert("Updated Successfully")
        }).catch(error => {
            alert(error.message)
        })
    }

    //function which deletes the cow record from the database  
    function deleteCow() {
        db.collection("cows").doc(tagNum).delete()
            .then(() => {
                navigation.goBack()
            }).catch(error => {
                console.log(error.message)
            })
    }
    
    const iconSize = 25
    const iconColor = "white"

    const actions = [
        {
          text: "Add Calving",
          icon: <MaterialCommunityIcons name="baby-bottle-outline" size={iconSize} color={iconColor} />,
          name: "fabCalving",
          position: 1
        },
        {
          text: "Add Milk Recording",
          icon: <Entypo name="bucket" size={iconSize} color={iconColor} />,
          name: "fabRecording",
          position: 2
        },
    ];

    function handleFabClick(name) {
        if(name == "fabCalving") {
            navigation.navigate("Add Calving Data", {tagNum: tagNum})
        } else if(name == "fabRecording") {
            navigation.navigate("Add Milk Recording", {tagNum: tagNum})
        } else if(name == "fabRefresh") {
            
        }
    }
    
    //Scrollview expands to its content, allowing user to scroll down the page. 
    //The card created here allow the user to input the milk recording results.
    //The keyboard type as a form of error handling to limit the type of imput that can be imputed

    return (
        <>
            <MyScrollView>
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
                        disabled={true}
                    />  

                    <Input
                        style={styles.textInput}
                        value= {breed}
                        label="Breed"
                        disabled={true}
                    />

                    <Input
                        style={styles.textInput}
                        value={sex}
                        label="Sex"
                        disabled={true}
                    />
                            
                    <Input
                        style={styles.textInput}
                        onChangeText={text => setWeight(text)}
                        value= {weight}
                        label="Weight"
                        keyboardType="number-pad"
                    />  

                    <Input
                        style={styles.textInput}
                        onChangeText={text => setMedRecord(text)}
                        value={medRecord}
                        multiline={true}
                        label="Medical Record"
                    />  

                    <Button title="Update" onPress={update} />          
                </Card>

                <Calving tagNum={tagNum}/> 

                <MilkRecording tagNum={tagNum} />

                <Card style={styles.deleteBtn}>
                    <Button onPress={deleteCow} title="Delete Cow"/>
                </Card>
                
            </MyScrollView>

            <FloatingAction 
                actions={actions}
                onPressItem={name => handleFabClick(name) }
            />
            {/* https://www.npmjs.com/package/react-native-floating-action */}
        </>
    )
}

//allows me to import this elsewhere if require. can be used as component.
export default CowDetails