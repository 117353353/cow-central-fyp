import React, {useState, useEffect} from "react"
import { StyleSheet, View } from "react-native"
import { Text, Card, Button } from "react-native-elements"

// import functions for firestore relating to the database.
import { getCows, getMilkRecordings, getCalving } from "src/firestore"
import MyScrollView from "src/components/MyScrollView"


function Home({navigation}) {
    const [herdSize, setHerdSize] = useState(0)
    const [avgProtein, setAvgProtein] = useState(0)
    const [avgMilkProduced, setAvgMilkProduced] = useState(0)
    const [avgCellCount, setAvgCellCount] = useState(0)
    const [avgButterfat, setAvgButterfat] = useState(0)
    const [breedCounts, setBreedCounts] = useState({})
    const [maleCount, setMaleCount] = useState(0)
    const [femaleCount, setFemaleCount] = useState(0)
    const [numCalving, setNumCalving] = useState(0)

    // Runs once when the component loads. 
    useEffect(() => {
        loadData()
    }, [])

    function loadData() {
        // Function comes from firestore.js. Returns an array of cows from the database. 
        getCows()
            .then(cows => {
                // The length of the cows array == the number of cows. 
                setHerdSize(cows.length)
               
                let breeds = [] // Array to store all the breeds. 
                let mCount = 0 // Counter to track number of males.
                let fCount = 0 // Counter to track number of females. 

                // Loops through the cows array retrieved from the database. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
                cows.forEach(cow => {
                    breeds.push(cow.breed) // Pushes this cows breed onto the breeds array. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

                    if(cow.sex == "Male") { // If cow is male incremements mCount counter by 1. 
                        mCount++ 
                    } else if(cow.sex == "Female") { // If cow is male incremements mCount counter by 1. 
                        fCount++
                    }
                })

                setMaleCount(mCount)
                setFemaleCount(fCount)

                // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
                var counts = {}

                for (var i = 0; i < breeds.length; i++) {
                    var breed = breeds[i]
                    counts[breed] = counts[breed] ? counts[breed] + 1 : 1;
                }

                setBreedCounts(counts)
            }).catch(error => {
                alert(error.message)
            })

            
        // Function retrieves milking records, calculates the totals (protein, cellCount etc), and then works out the averages. 
        getMilkRecordings()
            .then(records => {
                let numRecords = records.length
                let totalProtein = 0
                let totalButterfat = 0
                let totalMilkProduced = 0
                let totalCellCount = 0

                records.forEach(record => {
                    totalProtein += record.protein
                    totalButterfat += record.butterfat
                    totalMilkProduced += record.milkProduced
                    totalCellCount += record.cellCount
                })

                setAvgProtein((totalProtein/numRecords).toPrecision(2))
                setAvgButterfat((totalButterfat/numRecords).toPrecision(2))
                setAvgMilkProduced((totalMilkProduced/numRecords).toPrecision(2))
                setAvgCellCount((totalCellCount/numRecords).toPrecision(2))
            })


        // retrieves calving records and counts them so we can display the number of cows left to calve. 
        getCalving()
            .then(records => {
                setNumCalving(records.length)
            }).catch(error => {
                alert(error.message)
            })
    }

    return (

        // Load data is called when dragging down from the top of the screen, which reloads and recalculates everything. 
        <MyScrollView onRefresh={loadData}>
            <Card>
                <Card.Title>Herd Statistics</Card.Title>
                <Text style={styles.text}>There are <Text style={styles.bold}>{herdSize}</Text> animals in your herd.</Text>
                <Text style={styles.text}>There are <Text style={styles.bold}>{maleCount}</Text> males in your herd.</Text>
                <Text style={styles.text}>There are <Text style={styles.bold}>{femaleCount}</Text> females your herd.</Text>
                <Text style={styles.text}>There are <Text style={styles.bold}>{numCalving}</Text> cows left to calve in your herd.</Text>
            </Card>
            <Card>
                <Card.Title>Milk Statistics</Card.Title>
                <Text style={styles.text}>The average volume of milk produced is <Text style={styles.bold}>{avgMilkProduced}</Text>L</Text>
                <Text style={styles.text}>The average protein recorded is <Text style={styles.bold}>{avgProtein}</Text>g</Text>
                <Text style={styles.text}>The average butterfat recorded is <Text style={styles.bold}>{avgButterfat}</Text>g</Text>
                <Text style={styles.text}>The average cellcount recorded is <Text style={styles.bold}>{avgCellCount}.</Text></Text>
            </Card>
            <Card>
                <Card.Title>Breed Statistics</Card.Title>

                {/*
                    https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys 

                    breedCounts = {
                        fresian: 5,
                        charolais: 6,
                        hereford: 3
                    }

                    breedCounts looks something like this. The breed names are the key. Object.keys(breedCounts).map() loops through breedCounts line by line.
                    It displays the key which is the breed, and breedCounts[key] which is the value relating to that breed. 

                */}
                {Object.keys(breedCounts).map(key => {
                    return (
                        <View style={styles.row} key={key}>
                            <View style={styles.column}>
                                <Text>{key}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={{fontWeight: "bold", textAlign: "center"}}>{breedCounts[key]}</Text>
                            </View>
                        </View>
                    )
                })}
            </Card>
            { /* Button to navigate to Calving Calendar */}
            <Card containerStyle={{padding: 0, borderWidth: 0}}>
                <Button title="Calving Calendar" onPress={() => navigation.navigate("Calving Calendar")} />
            </Card>
        </MyScrollView>
    )
}


// styling for the component
const styles = StyleSheet.create({
    text: {
        textAlign: "center"
    },
    bold: {
        fontWeight: "bold",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
})

export default Home