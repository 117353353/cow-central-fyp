import React, { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Card, Button, Text, SearchBar } from "react-native-elements"
import { db } from '../firebase'
import { AntDesign } from '@expo/vector-icons'; 

function CowList ({navigation}){
    const [cows, setCows] = useState([])   
    const [search, setSearch] = useState("")
    const [filteredCows, setFilteredCows] = useState([])

/*     useEffect(() => {
        let result = cows.filter(cow => cow.sex == "Male")
        console.log(result)
    }, [search])
 */


    useEffect(() => {
        // https://firebase.google.com/docs/firestore/query-data/listen#node.js_4
        const unsubscribe = db.collection('cows').onSnapshot(querySnapshot => {
            let tempList = []
            querySnapshot.forEach(doc => {
                let tempCow = doc.data()
                tempCow.id = doc.id
                tempList.push(tempCow)
            })
            
            console.log(tempList)
            setCows(tempList)
        }, err => {
            console.log(err.message)
        })

        return () => unsubscribe()
    }, [])
   
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Cow Details", {cowId: item.id})}>
            <Card style={styles.item}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.text}>Tag Number</Text>
                        <Text style={styles.text}>Med Record</Text>
                        <Text style={styles.text}>DOB</Text>
                        <Text style={styles.text}>Sex</Text>
                        <Text style={styles.text}>Weight</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{item.id}</Text>
                        <Text style={styles.text}>{item.medRecord}</Text>
                        <Text style={styles.text}>{item.dob}</Text>
                        <Text style={styles.text}>{item.sex}</Text>
                        <Text style={styles.text}>{item.weight} kg</Text>
                    </View>    
                </View>     
            </Card>
        </TouchableOpacity>
 
    )

    return(
        <ScrollView style={styles.container}>
            <SearchBar 
                containerStyle={{margin: 0}}
                value={search}
                onChangeText={setSearch}

            />

            <FlatList
                data={cows}   
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />         
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
    }
})
  
export default CowList