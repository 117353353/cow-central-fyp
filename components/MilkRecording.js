//Import libraries
import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native"
import { Card, Input, Text, Button } from "react-native-elements"
import MyScrollView from "./MyScrollView"

//importing db
import {db} from "../firebase"

import Icon from 'react-native-vector-icons/Ionicons';

//Creating the variables for the component
function MilkRecording({navigation, tagNum}) {
    const [milkRecordings, setMilkRecordings] = useState([])

    //function to retrieve the milk recording documents for that specific cow
    function getRecords() {
        db.collection("milkRecordings").where("cowId", "==", tagNum).get()
            .then(docs => {
                if(docs.empty) {
                    setMilkRecordings([])
                    alert("Cow not found!")
                } else {
                    let temp = []
                    docs.forEach(doc => {
                       temp.push(doc.data())
                    })
                    setMilkRecordings(temp)
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        getRecords()
    }, [])

    //passes in milk recordings to be displayed on a card 
    // "item" is a single milk recording
    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <Card style={styles.item}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.text}>Date</Text>
                        <Text style={styles.text}>Milk Volume</Text>
                        <Text style={styles.text}>Protein</Text>
                        <Text style={styles.text}>Butterfat</Text>
                        <Text style={styles.text}>Cell Count</Text>
                        <Text style={styles.text}>Notes</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{item.date}</Text>
                        <Text style={styles.text}>{item.milkProduced}</Text>
                        <Text style={styles.text}>{item.protein}</Text>
                        <Text style={styles.text}>{item.butterfat}</Text>
                        <Text style={styles.text}>{item.cellCount}</Text>
                        <Text style={styles.text}>{item.notes}</Text>
                    </View>    
                </View>     
            </Card>
        </TouchableOpacity>  
    )

    return (
        <Card>
            <Card.Title>Milk Recording</Card.Title>
            <Card.Divider />
            {
                milkRecordings.length==0
                ?
                <Text style={{textAlign: "center"}}>No Data!</Text>
                :
                <FlatList
                    data={milkRecordings}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />      
            }
        </Card>
    )
}

//Contains the styling and sizing which has been implemented in this component

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 50
    },
    container: {

    },
    list: {       
        margin: "auto",
    },
    item: {
        display: "flex",

    },
    text: {
        fontSize: 20
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    deleteBtn: {
       

    },
    cardHeader: {
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
})

//allows it to be used in other components
export default MilkRecording
