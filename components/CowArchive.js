import React, {useState, useEffect} from "react" 
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Text} from "react-native-elements"
import { getCows } from "api/firestore"
import { set } from "react-native-reanimated"
import { formatDate } from "../helpers"

function CowArchive() {
    const [cows, setCows] = useState([])

    useEffect(() => {
        getCows(true).then(cows => {
            setCows(cows)
        }).catch(error => {
            alert(error.message)
        })
    }, [])

    const renderItem = ({ item }) => (
        <Card style={styles.item}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.text}>Tag Number</Text>
                    <Text style={styles.text}>DOB</Text> 
                    <Text style={styles.text}>Breed</Text>
                    <Text style={styles.text}>Sex</Text>
                    <Text style={styles.text}>Weight</Text>
                    <Text style={styles.text}>Med Record</Text>
                    <Text style={styles.text}>Archived Date</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>{item.tagNum}</Text>
                    <Text style={styles.text}>{formatDate(item.dob.toDate())}</Text> 
                    <Text style={styles.text}>{item.breed}</Text>
                    <Text style={styles.text}>{item.sex}</Text>
                    <Text style={styles.text}>{item.weight} kg</Text>
                    <Text style={styles.text}>{item.medRecord}</Text>
                    <Text style={styles.text}>{formatDate(item.archivedDate.toDate())}</Text>
                </View>    
            </View>     
        </Card>
    )

    return (
        <FlatList
            data={cows}   
            renderItem={renderItem}
            keyExtractor={item => item.tagNum}
            style={styles.list}
        /> 
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

export default CowArchive

