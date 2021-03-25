import React, {useState, useEffect} from "react" 
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Text, Button } from "react-native-elements"
import { ToastAndroid } from "react-native"

import { getArchivedCalving, deleteCalving } from "src/firestore"
import { formatDate } from "src/helpers"
import MyScrollView from "components/MyScrollView"

function CalvingArchive() {
    const [calving, setCalving] = useState([])

    // Calls loadData function when component loads. 
    useEffect(() => {
       loadData()
    }, [])

    function loadData() {
        getArchivedCalving()
            .then(calving => {
                setCalving(calving)
            }).catch(error => {
                alert(error.message)
            })
    }

    // Deletes calving record from the database using id. 
    function remove(id) {
        deleteCalving(id)
            .then(() => {
                ToastAndroid.show('Calving Record Deleted', ToastAndroid.SHORT)
                loadData()
            }).catch(error => {
                alert(error.message)
            })
    }

    // How FlatList displays each calving record. item = a single calving record. 
    const renderItem = ({ item }) => (
        <Card style={styles.item} key={item.id}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Tag Num</Text>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.label}>Archived Date</Text>
                    <Text style={styles.label}>Notes</Text>
                </View>
                <View style={styles.column}>
                    <Text>{item.tagNum}</Text>
                    <Text>{formatDate(item.date.toDate())}</Text>
                    <Text>{formatDate(item.archivedDate.toDate())}</Text>
                    <Text>{item.notes}</Text>
                </View> 
                <Button title="delete" onPress={() => remove(item.id)} />   
            </View>     
        </Card>
    )

    return (
        <>
            <MyScrollView onRefresh={loadData}>
                { /* If there are no archived calving records, this is displayed */ }
                {calving.length==0 && <Card><Text style={{textAlign: "center"}}>No archived calving records!</Text></Card>}  
                <FlatList
                    data={calving}   
                    renderItem={renderItem}
                    style={styles.list}
                /> 
            </MyScrollView>     
        </>
    )
}


//styling for the component reference= https://reactnative.dev/docs/stylesheet

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
    label: {
        fontWeight: "bold"
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
})

export default CalvingArchive

