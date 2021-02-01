import React, { useState } from "react"
import { StyleSheet, ScrollView, FlatList, TouchableOpacity, View } from "react-native"
import { Card, Input, Text, Button } from "react-native-elements"
import {db} from "../firebase"
import Icon from 'react-native-vector-icons/Ionicons';

function MilkRecording({navigation}) {
    const [milkRecordings, setMilkRecordings] = useState([])
    const [cowId, setCowId] = useState(0)

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
        <ScrollView style={{flex: 1}}>
            <Input
                style={styles.textInput}
                onChangeText={text => setCowId(text)}
                value={cowId}
                label="Tag Number"
                keyboardType="number-pad"
            />  
            <Button title="Show" onPress={getRecords} />
            <FlatList
                data={milkRecordings}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />      
           <Button title="Add" containerStyle={styles.fab} onPress={() => navigation.navigate("Add Milk Recording")} /> 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fab: {
       
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
export default MilkRecording
