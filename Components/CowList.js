import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { Card, Button } from "react-native-elements"
import { db } from '../firebase'

function CowList (){
    const [cows, setCows] = useState([])    

    useEffect(() => {
      getCows()

    }, [])

    function getCows() {
        db.collection("cows").get()
        .then(cows => {
            var listOfCows = []
            cows.forEach(cow => {
                let tempCow = cow.data()
                tempCow.id = cow.id
                listOfCows.push(tempCow)
            })
            console.log(listOfCows)
            setCows(listOfCows)
        }).catch(error => {
            console.error(error.message)
        })
    }

    function deleteCow(id) {
        db.collection("cows").doc(id).delete()
            .then(() => {
                getCows()
                alert(`Cow ${id} deleted`)
            }).catch(error => {
                console.log(error.message)
            })
    }
   
    const renderItem = ({ item }) => (
        <Card style={styles.item}>
            <Text>{item.id}</Text>
            <Text>{item.breed}</Text> 
            <Text>{item.medRecord}</Text>
            <Button title="X" onPress={() => deleteCow(item.id)} />
        </Card>
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
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
})
  
export default CowList