import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, View, Alert } from "react-native"
import {Text, Card, Button} from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons'; 
import { FloatingAction } from "react-native-floating-action"; 
import { getCalving, archiveCalving, unArchiveCalving } from "api/firestore"
import {formatDate} from "../helpers"

function CalvingCalendar({route}) {
    const [calvingData, setCalvingData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        if(route.params.archived == true) {
            getCalving(true)
                .then(data => {
                    setCalvingData(data)
                }).catch(error => {
                    alert(error.message)
                })
        } else {
            getCalving(false)
                .then(data => {
                    setCalvingData(data)
                }).catch(error => {
                    alert(error.message)
                })
        }
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
                { text: "Archive", onPress: () => archiveCalving(id) }
            ],
            { cancelable: false }
        ) 
    }


    const renderItem = ({ item }) => (
        <Card>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Tag Number</Text>
                    <Text>Calving Date</Text> 
                    <Text>Notes</Text>
                    {route.params.archived ? <Text>Date Archived</Text> : null}
                </View>
                <View style={styles.column}>
                    <Text>{item.tagNum}</Text>
                    <Text>{item.dateString}</Text> 
                    <Text>{item.notes}</Text>
                    {route.params.archived ? <Text>{formatDate(item.archivedDate.toDate())}</Text> : null}
                </View>
                {
                    route.params.archived
                    ? 
                    null 
                    :
                    <View>
                        <View style={styles.buttonColumn}>
                            <Button 
                                onPress={() => {}}
                                icon={<FontAwesome name="calendar-plus-o" size={24} color="white"/>}
                            />
                        </View>
                        <View style={styles.buttonColumn}>
                            <Button 
                                onPress={() => handleArchive(item.id)}
                                icon={<FontAwesome name="archive" size={24} color="white"/>}
                            />             
                        </View>  
                    </View>
                }
            </View>
        </Card>
    )

    const actions = [
        {
          text: "Refresh",
          icon: <FontAwesome name="refresh" size={24} color="white" />,
          name: "fabRefresh",
          position: 1
        },
    ];

    function handleFabClick(name) {
        if(name == "fabRefresh") {
            getData()
        } 
    }

    return (
        <>
            {calvingData.length == 0 && <Text style={{textAlign: "center", fontSize: 20, marginTop: 10}}>No data!</Text>}
            <FlatList
                data={calvingData}   
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> 
            <FloatingAction 
                actions={actions}
                onPressItem={name => handleFabClick(name) }
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