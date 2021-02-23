import React, {useState, useEffect} from "react"
import { View } from "react-native"
import { Text, Card, Button } from "react-native-elements"
import {db} from "../firebase"
import MyScrollView from "./MyScrollView"

function Home() {
    const [herdSize, setHerdSize] = useState(0)
    const [avgWeight, setAvgWeight] = useState(0)

    useEffect(() => {
        getCows()
    }, [])

    function getCows() {
        db.collection("cows").get()
            .then(docs => {
                let counter = 0
                let averageWeight = 0
                docs.forEach(doc => {
                    counter++
                    averageWeight += parseInt(doc.data().weight, 10)
                })
                setHerdSize(counter)
                setAvgWeight(averageWeight/counter)
            })
    }
    return (
        <MyScrollView>
            <Card>
                <Card.Title>Herd Statistics</Card.Title>
                <Text style={{textAlign: "center"}}>There are {herdSize} animals in your herd.</Text>
                <Text style={{textAlign: "center"}}>There average weight of your herd is {avgWeight}kg.</Text>
            </Card>
            <Button title={"Refresh"} onPress={getCows} style={{marginTop: 25, width: "80%", marginLeft: "auto", marginRight: "auto"}} />
        </MyScrollView>
    )
}

export default Home