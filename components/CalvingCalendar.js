import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, View } from "react-native"
import {Text, Card, Button} from "react-native-elements"
import { getCalving } from "../api/firestore"
import { FontAwesome } from '@expo/vector-icons'; 


function CalvingCalendar() {
    const [calvingData, setCalvingData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        getCalving()
            .then(data => {
                setCalvingData(data)
            }).catch(error => {
                alert(error.message)
            })
    }

    const renderItem = ({ item }) => (
        <Card>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Tag Number</Text>
                    <Text>Calving Date</Text> 
                    <Text>Notes</Text>
                </View>
                <View style={styles.column}>
                    <Text>{item.tagNum}</Text>
                    <Text>{item.dateString}</Text> 
                    <Text>{item.notes}</Text>
                </View> 
                <View style={styles.buttonColumn}>
                    <Button icon={<FontAwesome name="calendar-plus-o" size={24} color="white"/>}/>
                </View>  
                <View style={styles.buttonColumn}>
                    <Button icon={<FontAwesome name="archive" size={24} color="white" />}/>
                </View>
            </View>     
        </Card>
    )

    return (
        <>
            <FlatList
                data={calvingData}   
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> 
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 50
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
        flex: 2
    },
    buttonColumn: {
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
    }
})

export default CalvingCalendar