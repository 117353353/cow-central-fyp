//Import libraries
import React, { useState } from "react"
import { StyleSheet, ScrollView, FlatList, TouchableOpacity, View } from "react-native"
import { Card, Input, Text, Button } from "react-native-elements"

//importing db
import {db} from "../firebase"

import Icon from 'react-native-vector-icons/Ionicons';

//Creating the variables for the component
function MilkRecording({navigation}) {
    const [milkRecordings, setMilkRecordings] = useState([])
    const [cowId, setCowId] = useState(0)


    //function to retrieve the milk recording documents for that specific cow
    function getRecords() {
        db.collection("milkRecordings").where("cowId", "==", cowId).get()
            .then(docs => {
                let temp = []
                docs.forEach(doc => {
                   temp.push(doc.data())
                })
                setMilkRecordings(temp)
            })
            .catch(error => {
                console.log(error.message)
            })
    }
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
        <>   
            <ScrollView style={{flex: 1}}>
                <Card>
                    <Input
                        style={styles.textInput}
                        onChangeText={text => setCowId(text)}
                        value={cowId}
                        label="Tag Number"
                        keyboardType="number-pad"
                    />  
                    <Button title="Show" onPress={getRecords} />
                </Card>

                <FlatList
                    data={milkRecordings}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />      
            </ScrollView>
            <Button title="+" containerStyle={styles.fab} onPress={() => navigation.navigate("Add Milk Recording")} />
        </>
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
