import React, {useState, useEffect} from "react" 
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Text} from "react-native-elements"

import { getArchivedCalving } from "src/firestore"
import { formatDate } from "src/helpers"
import MyScrollView from "components/MyScrollView"

function CalvingArchive() {
    const [calving, setCalving] = useState([])

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

    const renderItem = ({ item }) => (
        <Card style={styles.item}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.label}>Archived Date</Text>
                    <Text style={styles.label}>Notes</Text>
                </View>
                <View style={styles.column}>
                    <Text>{formatDate(item.date.toDate())}</Text>
                    <Text>{formatDate(item.archivedDate.toDate())}</Text>
                    <Text>{item.notes}</Text>
                </View>    
            </View>     
        </Card>
    )

    return (
        <>
            <MyScrollView onRefresh={loadData}>
                {calving.length==0 && <Card><Text style={{textAlign: "center"}}>No archived calving records!</Text></Card>}  
                <FlatList
                    data={calving}   
                    renderItem={renderItem}
                    keyExtractor={item => item.tagNum}
                    style={styles.list}
                /> 
            </MyScrollView>     
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

