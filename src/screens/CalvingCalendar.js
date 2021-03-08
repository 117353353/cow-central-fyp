import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, View, Alert } from "react-native"
import { Text, Card, Button} from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons' 

import { getCalving, archiveCalving } from "src/firestore"
import { formatDate } from "src/helpers"
import MyScrollView from "components/MyScrollView"

function CalvingCalendar({route, tagNum}) {
    const [calvingData, setCalvingData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    function loadData() {
        getCalving()
            .then(data => {
                setCalvingData(data)
            }).catch(error => {
                alert(error.message)
            })
    }

    function handleArchive(id) {
        Alert.alert(
            "",
            "Are you sure you want to archive this?",
            [
                {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
                },
                { text: "Archive", onPress: () => {
                    archiveCalving(id) 
                    loadData()
                }}
            ],
            { cancelable: false }
        ) 
    }

    const renderItem = ({ item }) => (
        <Card>
            {calvingData.length==0 && <Card><Text style={{textAlign: "center"}}>No scheduled calving!</Text></Card>}  
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Tag Number</Text>
                    <Text style={styles.label}>Calving Date</Text> 
                    <Text style={styles.label}>Notes</Text>
                    {route.params.archived ? <Text>Date Archived</Text> : null}
                </View>
                <View style={styles.column}>
                    <Text>{item.tagNum}</Text>
                    <Text>{item.dateString}</Text> 
                    <Text>{item.notes}</Text>
                    {route.params.archived ? <Text>{formatDate(item.archivedDate.toDate())}</Text> : null}
                </View>
                <View style={styles.buttonColumn}>
                    <Button 
                        onPress={() => {}}
                        icon={<FontAwesome name="calendar-plus-o" size={24} color="white"/>}
                        buttonStyle={{marginRight: 5, height: 50}}
                    />
                </View>
                <View style={styles.buttonColumn}>
                    <Button 
                        onPress={() => handleArchive(item.id)}
                        icon={<FontAwesome name="archive" size={24} color="white"/>}
                        buttonStyle={{marginLeft: 5, height: 50}}
                    />  
                </View>
            </View>
        </Card>
    )

    return (
        <MyScrollView onRefresh={loadData}>
            {calvingData.length == 0 && <Text style={{textAlign: "center", fontSize: 20, marginTop: 10}}>No data!</Text>}
            <FlatList
                data={calvingData}   
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> 
        </MyScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold"
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
        flex: 1,
        justifyContent: "center"
    },
})

export default CalvingCalendar