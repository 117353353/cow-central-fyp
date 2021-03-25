import React, {useState, useEffect} from "react" 
import { FlatList, StyleSheet, View, ToastAndroid } from "react-native"
import { Card, Text, Button} from "react-native-elements"

//import from other components
import { getArchivedCows, deleteCow } from "src/firestore"
import { formatDate } from "src/helpers"
import MyScrollView from "components/MyScrollView"

function CowArchive() {
    const [cows, setCows] = useState([])

    // Loads data when component loads. 
    useEffect(() => {
        loadData()
    }, [])

    function loadData() {
        // Retrieves archived cows from database. 
        getArchivedCows(true)
            .then(cows => {
                setCows(cows)
            }).catch(error => {
                alert(error.message)
            })
    }

    //function to delte cow from archive
    function remove(tagNum) {
        deleteCow(tagNum)
            .then(() => {
                ToastAndroid.show('Cow Deleted', ToastAndroid.SHORT)
                loadData()
            }).catch(error => {
                alert(error.message)
            })
    }

    //how each item is displayed in the archive
    const renderItem = ({ item }) => (
        <Card style={styles.item}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Tag Number</Text>
                    <Text style={styles.label}>DOB</Text> 
                    <Text style={styles.label}>Breed</Text>
                    <Text style={styles.label}>Sex</Text>
                    <Text style={styles.label}>Weight</Text>
                    <Text style={styles.label}>Med Record</Text>
                    <Text style={styles.label}>Archived Date</Text>
                </View>
                <View style={styles.column}>
                    <Text>{item.tagNum}</Text>
                    <Text>{formatDate(item.dob.toDate())}</Text> 
                    <Text>{item.breed}</Text>
                    <Text>{item.sex}</Text>
                    <Text>{item.weight} kg</Text>
                    <Text>{item.medRecord}</Text>
                    <Text>{formatDate(item.archivedDate.toDate())}</Text>
                </View>    
                <Button title="delete" onPress={() => remove(item.tagNum)} />
            </View>     
        </Card>
    )

    return (
        <MyScrollView onRefresh={loadData}>
            { /* If there are no archived cows, this is displayed */ }
            {cows.length==0 && <Card><Text style={{textAlign: "center"}}>No archived cows!</Text></Card>}  
            <FlatList
                data={cows}   
                renderItem={renderItem}
                keyExtractor={item => item.tagNum}
                style={styles.list}
            /> 
        </MyScrollView>     
    )
}


// Styling for the component
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

export default CowArchive

