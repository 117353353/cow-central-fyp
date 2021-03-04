import React, {useState, useEffect} from "react"
import { Text, Card, Button } from "react-native-elements"
import {db} from "../firebase"
import MyScrollView from "./MyScrollView"
import { FloatingAction } from "react-native-floating-action"; 
import { FontAwesome } from '@expo/vector-icons'; 
import { getCows, getMilkRecordings } from "api/firestore"

function Home({navigation}) {
    const [herdSize, setHerdSize] = useState(0)
    const [avgWeight, setAvgWeight] = useState(0)
    const [avgProtein, setAvgProtein] = useState(0)
    const [avgButterfat, setAvgButterfat] = useState(0)

    useEffect(() => {
        loadData()
    }, [])

    const actions = [
        {
          text: "Refresh",
          icon: <FontAwesome name="refresh" size={24} color="white" />,
          name: "fabRefresh",
          position: 1
        },
    ];

    function loadData() {
        getCows().then(cows => {
            setHerdSize(cows.length)

            let totalWeight = 0

            cows.forEach(cow => {
                totalWeight += parseInt(cow.weight, 10)
            })

            setAvgWeight(totalWeight/herdSize) 
        }).catch(error => {
            alert(error.message)
        })

        getMilkRecordings().then(records => {
            let numRecords = records.length
            let totalProtein = 0
            let totalButterfat = 0

            records.forEach(record => {
                totalProtein += record.protein
                totalButterfat += record.butterfat
            })

            setAvgProtein((totalProtein/numRecords).toPrecision(2))
            setAvgButterfat((totalButterfat/numRecords).toPrecision(2))
        })
    }
    
    function handleFabClick(name) {
        if(name == "fabAddCow") {
            loadData()
        } 
    }

    return (
        <>
            <MyScrollView>
                <Card>
                    <Card.Title>Herd Statistics</Card.Title>
                    <Text style={{textAlign: "center"}}>There are {herdSize} animals in your herd.</Text>
                    <Text style={{textAlign: "center"}}>There average weight of your herd is {avgWeight}kg.</Text>
                    <Text style={{textAlign: "center"}}>The average protein recorded is {avgProtein}g</Text>
                    <Text style={{textAlign: "center"}}>The average butterfat recorded is {avgButterfat}g</Text>
                </Card>
                <Card containerStyle={{padding: 0}}>
                    <Button title="Calving Calendar" onPress={() => navigation.navigate("Calving Calendar", {archived: false})} />
                </Card>
            </MyScrollView>
            <FloatingAction 
                actions={actions}
                onPressItem={name => handleFabClick(name) }
            />
        </>
    )
}

export default Home