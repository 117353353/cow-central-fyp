//Import libraries
import React, { useState, useEffect} from "react"
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native"
import { Card, Input, Text, Button } from "react-native-elements"
import MyScrollView from "./MyScrollView"
import { FontAwesome } from '@expo/vector-icons'; 


//importing db
import {db} from "../firebase"

import Icon from 'react-native-vector-icons/Ionicons';

//Creating the variables for the component
function Calving({navigation, tagNum}) {
    const [calvingData, setCalvingData] = useState([])

/*     useEffect(() => {
        getRecords()
    }, [])  */

    //function to retrieve the milk recording documents for that specific cow
    function getRecords() {
        db.collection("calving").where("tagNum", "==", tagNum).get()
            .then(docs => {
                if(docs.empty) {
                    setCalvingData([])
                } else {
                    let tempList = []
                    docs.forEach(doc => {
                        let temp = doc.data()
                        let date = doc.data().date.toDate() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
                        temp.dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
                        tempList.push(temp)
                    })
                    setCalvingData(tempList)
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    } 

    //passes in milk recordings to be displayed on a card 
    // "item" is a single milk recording
    const renderItem = ({ item }) => (
        <TouchableOpacity style={{marginBottom: 10}}>
            <Card>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.text}>Calving Date</Text>    
                        <Text style={styles.text}>Notes</Text>                         
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{item.dateString}</Text>
                        <Text style={styles.text}>{item.notes}</Text>     
                    </View>    
                </View>     
            </Card>   
        </TouchableOpacity>   
    )

    return (
        <>   
            <Card>      
                <Card.Title>Calving Data <FontAwesome name="refresh" size={24} color="black" onPress={getRecords}/></Card.Title>
                <Card.Divider />

                {
                    calvingData.length==0 
                    ?
                        <Text style={{textAlign: "center"}}>No data!</Text>
                    : 
                    <FlatList
                        data={calvingData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={styles.list}
                    /> 
                }
                  
            </Card>
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
export default Calving
