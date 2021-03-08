import React, { useState, useEffect, useContext } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { ThemeContext, Card, Text, SearchBar } from "react-native-elements"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FloatingAction } from "react-native-floating-action"

import { getCows } from "src/firestore"
import MyScrollView from "src/components/MyScrollView"
import { formatDate } from "src/helpers"

function CowList ({navigation}){
    const [cows, setCows] = useState([])  
    const [filteredCows, setFilteredCows] = useState([]) 
    const [search, setSearch] = useState("")

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        loadData()
    }, [])

    function loadData() {
        setSearch("")
        getCows()
            .then(cows => {
                setCows(cows)
                setFilteredCows(cows)
            }).catch(error => {
                alert(error.message)
            })
    }
    
    /*code for searchbar which can check through tag number, weight, sex, DOB and medrecord once a value has been typed into the bar.It uses
    a variable with all lowercase which is searched in the database in order to yield a result.   https://www.youtube.com/watch?v=b5P6LIjQZEU */   
    // Runs once when the component is loaded and then every time there is a change to the "search" variable. 
    useEffect(() => {
        if(search.length > 0) {
            let tempSearch = search.toLowerCase()
            let result = cows.filter(cow => cow.tagNum.includes(tempSearch) || cow.breed.toLowerCase().includes(tempSearch) || cow.weight == tempSearch || cow.sex.toLowerCase().includes(tempSearch) || cow.dobString.includes(tempSearch) || cow.medRecord.toLowerCase().includes(tempSearch))
            setFilteredCows(result)
        } else {
            setFilteredCows(cows)
        }
    }, [search])
   
    const actions = [
        {
          text: "Add Cow",
          icon: <MaterialCommunityIcons name="cow" size={25} color={"white"} />,
          name: "fabAddCow",
          position: 1
        },
    ];

    function handleFabClick(name) {
        if(name == "fabAddCow") {
            navigation.navigate("Add Cow")
        } 
    }

 // "item" is a single cow. 
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Cow Details", {tagNum: item.tagNum})}>
            <Card style={styles.item}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.bold}>Tag Number</Text>
                        <Text style={styles.bold}>DOB</Text> 
                        <Text style={styles.bold}>Breed</Text>
                        <Text style={styles.bold}>Sex</Text>
                        <Text style={styles.bold}>Weight</Text>
                        <Text style={styles.bold}>Med Record</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{item.tagNum}</Text>
                        <Text style={styles.text}>{formatDate(item.dob.toDate())}</Text> 
                        <Text style={styles.text}>{item.breed}</Text>
                        <Text style={styles.text}>{item.sex}</Text>
                        <Text style={styles.text}>{item.weight} kg</Text>
                        <Text style={styles.text}>{item.medRecord}</Text>
                    </View>    
                </View>     
            </Card>
        </TouchableOpacity>
    )

    return (
        <>
            <MyScrollView onRefresh={loadData}>
                <Card containerStyle={{padding: 0}}>
                    <SearchBar 
                        containerStyle={{margin: 0}}
                        value={search}
                        onChangeText={setSearch}
                        round
                        containerStyle={{backgroundColor: "#ffffffff"}}
                        inputContainerStyle={{backgroundColor: "#ffffffff"}}
                        inputStyle={{color: "#1c1c1c"}}
                        lightTheme
                    />
                </Card>
                    
                <FlatList
                    data={filteredCows}   
                    renderItem={renderItem}
                    keyExtractor={item => item.tagNum}
                    style={styles.list}
                /> 
            </MyScrollView>
              
            <FloatingAction 
                actions={actions}
                onPressItem={name => handleFabClick(name) }
                style={{backgroundColor: "red"}}
            />
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
        
    },
    bold: {
        fontWeight: "bold"
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