import React, {useState, useEffect, useContext} from "react"
import { StyleSheet, TouchableNativeFeedback, Alert, FlatList, View, TouchableOpacity, ToastAndroid } from "react-native"
import { Card, Text, Button, Input, Divider, ThemeContext } from "react-native-elements"
import { FloatingAction } from "react-native-floating-action"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

import { db } from "src/firebase"
import MyScrollView from "components/MyScrollView"
import Calving from "screens/Calving"
import { archiveCow, getCow, updateCow, getCalving, getMilkRecordings } from "src/firestore"
import { formatDate } from "src/helpers"

// Use state keeps track of variables. Creates the variables and makes them equal to a blank string as default. 
// They are updated automatically as the user types into the form. 

function CowDetails({navigation, route}) {
    const [tagNum, setTagNum] = useState("")
    const [dob, setDob] = useState("")
    const [breed, setBreed] = useState("")
    const [medRecord, setMedRecord] = useState("")
    const [weight, setWeight] = useState("")  
    const [sex, setSex] = useState("")
    const [calvingData, setCalvingData] = useState([])
    const [milkingData, setMilkingData] = useState([])
    const { theme } = useContext(ThemeContext)

    const deleteWarning = () =>
        Alert.alert(
        "Delete Cow " + tagNum,
        "Are you sure?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { 
                text: "Archive", onPress: () => handleArchive(tagNum) 
            }
        ],
        { cancelable: false }
    )

    // https://reactjs.org/docs/hooks-effect.html
    //useffect stops function being called every time component is refreshed
    useEffect(() => {
        loadData()
    }, [])
    
    //https://firebase.google.com/docs/firestore/query-data/get-data
    // Retrieving a single document from the database using tag num, each cow has a single document which is identiable by their tag number. (The documents name is the cows tag number)
    // Route.params contains the values we sent from CowList e.g navigation.navigate("CowDetails", {tagNum})
    // Updates state variables with value retrieved from database 
    function loadData() {
        getCow(route.params.tagNum)  
            .then(cow => {
                setTagNum(cow.id)
                setBreed(cow.breed)
                setMedRecord(cow.medRecord)
                setWeight(cow.weight.toString())
                setSex(cow.sex)
                setDob(formatDate(cow.dob.toDate()))
            }).catch(error => {
                console.log(error.message)
            })
        
        getCalving(route.params.tagNum)
            .then(data => {
                setCalvingData(data)
            }).catch(error => {
                alert(error.message)
            })
        
        getMilkRecordings(route.params.tagNum)
            .then(data => {
                setMilkingData(data)
            }).catch(error => {
                alert(error.message)
            })
    }

    //This function updates the database with the variables which ay have changed.
    function update() {
        updateCow(tagNum, weight, medRecord)
            .then(() => {
                ToastAndroid.show('Updated successfully', ToastAndroid.SHORT)
            }).catch(error => {
                alert(error.message)
            })
    }

    //function which deletes the cow record from the database  
    function handleArchive() {
        archiveCow(route.params.tagNum)
            .then(() => {
                navigation.goBack()
            }).catch(error => {
                alert(error.message)
            })
    }
    
    const iconSize = 25
    const iconColor = "white"

    const actions = [
        {
          text: "Add Calving Date",
          icon: <MaterialCommunityIcons name="baby-bottle-outline" size={iconSize} color={iconColor} />,
          name: "fabCalving",
          position: 1,
          color: theme.colors.primary
        },
        {
          text: "Add Milk Recording",
          icon: <Entypo name="bucket" size={iconSize} color={iconColor} />,
          name: "fabRecording",
          position: 2,
          color: theme.colors.primary
        },
    ]

    function handleFabClick(name) {
        if(name == "fabCalving") {
            navigation.navigate("Add Calving Data", {tagNum: tagNum})
        } else if(name == "fabRecording") {
            navigation.navigate("Add Milk Recording", {tagNum: tagNum})
        } else if(name == "fabRefresh") {
            
        }
    }

    const calvingItem = ({ item }) => (
        <>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.bold}>Tag Number</Text>
                    <Text style={styles.bold}>Calving Date</Text>    
                    <Text style={styles.bold}>Notes</Text>                         
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>{item.tagNum}</Text>
                    <Text style={styles.text}>{formatDate(item.date)}</Text>
                    <Text style={styles.text}>{item.notes}</Text>     
                </View>    
            </View> 
        </>
    )

    const milkingItem = ({ item }) => (
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.bold}>Tag Num</Text> 
                        <Text style={styles.bold}>Date</Text> 
                        <Text style={styles.bold}>Milk Volume</Text>
                        <Text style={styles.bold}>Protein</Text>
                        <Text style={styles.bold}>Butterfat</Text>
                        <Text style={styles.bold}>Cell Count</Text>
                        <Text style={styles.bold}>Notes</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{item.tagNum}</Text>
                        <Text style={styles.text}>{formatDate(item.date)}</Text> 
                        <Text style={styles.text}>{item.milkProduced}</Text>
                        <Text style={styles.text}>{item.protein}</Text>
                        <Text style={styles.text}>{item.butterfat}</Text>
                        <Text style={styles.text}>{item.cellCount}</Text>
                        <Text style={styles.text}>{item.notes}</Text>
                    </View>    
                </View>     

    )
    
    //Scrollview expands to its content, allowing user to scroll down the page. 
    //The card created here allow the user to input the milk recording results.
    //The keyboard type as a form of error handling to limit the type of imput that can be imputed

    return (
        <>
            <MyScrollView onRefresh={loadData}>
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
                        value={weight}
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

                {
                    sex == "Female" && 
                    <>
                        <Card>
                            <Card.Title style={{color: theme.colors.primary, fontSize: 18}} onPress={loadData}>
                                Calving
                            </Card.Title>
                            <Divider />
                            {
                                calvingData.length==0 
                                ?
                                    <Card.Title style={{marginTop: 15, marginBottom: 5}}>No data!</Card.Title>
                                : 
                                <FlatList
                                    data={calvingData}
                                    renderItem={calvingItem}
                                    keyExtractor={item => item.id}
                                    style={styles.list}
                                /> 
                            }
                        </Card>
                        <Card>
                            <Card.Title style={{color: theme.colors.primary, fontSize: 18}} onPress={loadData}>
                                Milk Recording
                            </Card.Title>
                            <Divider />
                            {
                                milkingData.length==0 
                                ?
                                    <Card.Title style={{marginTop: 15, marginBottom: 5}}>No data!</Card.Title>
                                : 
                                <FlatList
                                    data={milkingData}
                                    renderItem={milkingItem}
                                    keyExtractor={item => item.id}
                                    style={styles.list}
                                /> 
                            }
                        </Card>
                    </>

                }
                

                <TouchableNativeFeedback onPress={deleteWarning}>
                    <Card style={styles.deleteBtn} backgroundColor="#f52f2f">
                        <Text style={{textAlign: "center", fontSize: 18, color: "white"}}>Archive Cow</Text>  
                    </Card>
                </TouchableNativeFeedback>
            </MyScrollView>

            { 
                sex == "Female" && 
                <FloatingAction 
                    actions={actions}
                    onPressItem={name => handleFabClick(name) }
                    color={theme.colors.primary}
                />
            }

            {/* https://www.npmjs.com/package/react-native-floating-action */}
        </>
    )
}

// stylesheet determines the styling on the form
const styles = StyleSheet.create({
    picker: {
        height: 125, 
        width: "100%",
        margin: "auto",
        marginBottom: 15
    },
    deleteBtn: {
        backgroundColor: "#f54242",
    },
    bold: {
        fontWeight: "bold",

    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        padding: 10
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
})

//allows me to import this elsewhere if require. can be used as component.
export default CowDetails