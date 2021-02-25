import React, {useState, useEffect} from "react"
import { View } from "react-native"
import { Text, Card, Button } from "react-native-elements"
import {db} from "../firebase"
import MyScrollView from "./MyScrollView"

function Home() {
    const [herdSize, setHerdSize] = useState(0)
    const [avgWeight, setAvgWeight] = useState(0)
    const [avgProtein, setAvgProtein] = useState(0)
    const [avgButterfat, setAvgButterfat] = useState(0)
    const [startDate, setStartDate] = useState(new Date() - 31556952000)
    const [endDate, setEndDate] = useState(new Date())


    useEffect(() => {
        getCows()
        getMilkRecordings()
    }, [])

/*     useEffect(() => {
        db.collection("milkRecordings").where("date", ">", startDate).where("date", "<", endDate)
    }, [startDate, endDate]) */

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

    function getMilkRecordings() {
        /* .where("date", ">", startDate).where("date", "<", endDate) */

        db.collection("milkRecordings").get()
            .then(docs => {
                let counter = 0
                let tempProteinAvg = 0
                let tempButterfatAvg = 0
                docs.forEach(doc => {
                    counter++
                    tempProteinAvg += parseInt(doc.data().protein, 10)
                    tempButterfatAvg += Int(doc.data().butterfat, 10)
                })
                setAvgProtein(tempProteinAvg/counter)
                setAvgButterfat(tempButterfatAvg/counter)
            })
    }

    return (
        <MyScrollView>
            <Card>
                <Card.Title>Herd Statistics</Card.Title>
                <Text style={{textAlign: "center"}}>There are {herdSize} animals in your herd.</Text>
                <Text style={{textAlign: "center"}}>There average weight of your herd is {avgWeight}kg.</Text>
                <Text style={{textAlign: "center"}}>The average protein recorded is {avgProtein}g</Text>
                <Text style={{textAlign: "center"}}>The average butterfat recorded is {avgButterfat}g</Text>
            </Card>
            <Button title={"Refresh"} onPress={getCows} style={{marginTop: 25, width: "80%", marginLeft: "auto", marginRight: "auto"}} />
        </MyScrollView>
    )
}

export default Home