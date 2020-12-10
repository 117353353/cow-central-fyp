import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { db } from '../firebase'
import CowListItem from "./CowListItem"

function CowList (){
    const [cows, setCows] = useState("")    

    db.collection("cows").get()
        .then(cows => {
            var listOfCows = []
            cows.forEach(cow => {
                let tempCow 
                tempCow = cow.data()
                tempCow.id = cow.id
                
                listOfCows.push(tempCow)
            })

            setCows(listOfCows)
        }).catch(error => {
            console.error(error.message)
        })
   
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.id} | {item.breed} | {item.medRecord}</Text>
        </View>
    )

    return(
        <View>
            <FlatList
                data={cows}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    item: {
      border: "1px solid grey",
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
})
  
export default CowList