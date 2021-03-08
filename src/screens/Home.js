import React, {useState, useEffect} from "react"
import { StyleSheet } from "react-native"
import { Text, Card, Button } from "react-native-elements"

import { getCows, getMilkRecordings, getUser } from "src/firestore"
import MyScrollView from "src/components/MyScrollView"

function Home({navigation}) {
    const [herdSize, setHerdSize] = useState(0)
    const [avgWeight, setAvgWeight] = useState(0)
    const [avgProtein, setAvgProtein] = useState(0)
    const [avgButterfat, setAvgButterfat] = useState(0)

    useEffect(() => {
        loadData()
    }, [])

    function loadData() {
        getCows(false)
            .then(cows => {
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

    return (
        <>
            <MyScrollView onRefresh={loadData}>
                <Card>
                    <Card.Title>Herd Statistics</Card.Title>
                    <Text style={styles.text}>There are <Text style={styles.bold}>{herdSize}</Text> animals in your herd.</Text>
                    <Text style={styles.text}>There average weight of your herd is <Text style={styles.bold}>{avgWeight}</Text>kg.</Text>
                    <Text style={styles.text}>The average protein recorded is <Text style={styles.bold}>{avgProtein}</Text>g</Text>
                    <Text style={styles.text}>The average butterfat recorded is <Text style={styles.bold}>{avgButterfat}</Text>g</Text>
                </Card>
                <Card containerStyle={{padding: 0}}>
                    <Button title="Calving Calendar" onPress={() => navigation.navigate("Calving Calendar", {archived: false})} />
                </Card>
            </MyScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center"
    },
    bold: {
        fontWeight: "bold",
    }
})

export default Home