///Import libraries
import React, {  useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Card, Button, Text, SearchBar } from "react-native-elements"
import { db } from '../firebase'
import { AntDesign } from '@expo/vector-icons'; 
import MyScrollView from "./MyScrollView"

//Sets variables for the component
function CowList ({navigation}){
    const [cows, setCows] = useState([])  
    const [filteredCows, setFilteredCows] = useState([]) 
    const [search, setSearch] = useState("")

    /* 
        Useffect prevents function from being called multiple times
         On snapshot listens for changes in the cows collection. If any document in cows is updated/deleted/added, 
        this code will run again, instantly updating the list of cows.
    */ 
    useEffect(() => {
        // https://firebase.google.com/docs/firestore/query-data/listen#node.js_4
        const unsubscribe = db.collection('cows').onSnapshot(querySnapshot => {
            let tempList = []
            querySnapshot.forEach(doc => {
                let tempCow = doc.data()
                tempCow.tagNum = doc.id
                tempList.push(tempCow)
            })
            
            setCows(tempList)
            setFilteredCows(tempList)
        }, err => {
            console.log(err.message)
        })

        // If component is closed, this stops the onSnapshot listening for changes. 
        return () => unsubscribe()
    }, [])
    
    /*code for searchbar which can check through tag number, weight, sex, DOB and medrecord once a value has been typed into the bar.It uses
    a variable with all lowercase which is searched in the database in order to yield a result.   https://www.youtube.com/watch?v=b5P6LIjQZEU */
     

    // Runs once when the component is loaded and then every time there is a change to the "search" variable. 
    useEffect(() => {
        if(search.length > 0) {
            let tempSearch = search.toLowerCase()
            let result = cows.filter(cow => cow.tagNum.includes(tempSearch) || cow.weight == tempSearch || cow.sex.toLowerCase().includes(tempSearch) || cow.dob.includes(tempSearch) || cow.medRecord.toLowerCase().includes(tempSearch))
            setFilteredCows(result)
        } else {
            setFilteredCows(cows)
        }
    }, [search])
   

 // "item" is a single cow. 
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Cow Details", {tagNum: item.tagNum})}>
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
                        <Text style={styles.text}>{item.tagNum}</Text>
                        <Text style={styles.text}>{item.medRecord}</Text>
                        <Text style={styles.text}>{item.dob}</Text>
                        <Text style={styles.text}>{item.sex}</Text>
                        <Text style={styles.text}>{item.weight} kg</Text>
                    </View>    
                </View>     
            </Card>
        </TouchableOpacity>
    )

    return (
        <>
            <MyScrollView>

                { /* https://reactnativeelements.com/docs/searchbar/  */}
                <SearchBar 
                    containerStyle={{margin: 0}}
                    value={search}
                    onChangeText={setSearch}
                />

                {/*https://reactnative.dev/docs/flatlist */}
                <FlatList
                    data={filteredCows}   
                    renderItem={renderItem}
                    keyExtractor={item => item.tagNum}
                    style={styles.list}
                /> 

            </MyScrollView>
              
            <Button title="+" containerStyle={styles.fab} onPress={() => navigation.navigate("Add Cow")} />
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
 
//allows me to import this elsewhere if require. can be used as component.
export default CowList