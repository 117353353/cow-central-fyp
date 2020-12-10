import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { Card, Button } from "react-native-elements"
import { db } from '../firebase'

function CowList ({navigation}){
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
            }).catch(error => {
                console.log(error.message)
            })
    }
   
    const renderItem = ({ item }) => (
        <Card style={styles.item}>
            <Text>TagNum: {item.id}</Text>
            <Text>Breed: {item.breed}</Text> 
            <Text>Med Record: {item.medRecord}</Text>
            <Text>DOB: {item.dob}</Text>
            <Text>Sex: {item.sex}</Text>
            <Text>Weight: {item.weight} kg</Text>
            <Button title="View Details" onPress={() => navigation.navigate("Cow Details", {
                cowId: item.id
            })} />
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

    },
})
  
export default CowList