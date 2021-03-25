import React, { useState, useEffect, useContext } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { ThemeContext, Card, Text, SearchBar } from "react-native-elements"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FloatingAction } from "react-native-floating-action"

import { getCows } from "src/firestore"
import MyScrollView from "src/components/MyScrollView"
import { formatDate } from "src/helpers"

function CowList ({navigation}){
    // Cow records loaded from database are stored here. 
    const [cows, setCows] = useState([])  

    // Filtered version of cows stored here. 
    const [filteredCows, setFilteredCows] = useState([]) 

    // Stores text typed into search box. 
    const [search, setSearch] = useState("")

    // Gives access to theme from Main.js
    const { theme } = useContext(ThemeContext)

    // Loads data after component loads. 
    useEffect(() => {
        loadData()
    }, [])

    // Loads cow records from database.
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
            // If any of these comparisons match the cow won't be filtered out. 
            // .includes() checks if any part of a string matches another string. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
            let result = cows.filter(cow => cow.tagNum.includes(tempSearch) || cow.breed.toLowerCase().includes(tempSearch) || cow.weight == tempSearch || cow.sex.toLowerCase().includes(tempSearch) || formatDate(cow.dob).includes(tempSearch) || cow.medRecord.toLowerCase().includes(tempSearch))
            
            // result contains a filtered version of the cows list. 
            // Remaining cows matched at least one of the comparisons.  
            setFilteredCows(result)
        } else {
            // If search.length is 0 (search box is empty) then we set filtered cows to the full list of cows. 
            setFilteredCows(cows)
        }
    }, [search])
   
    // Buttons inside floating action button
    const actions = [
        {
          text: "Add Cow",
          icon: <MaterialCommunityIcons name="cow" size={25} color={"white"} />,
          name: "fabAddCow",
          position: 1,
          color: theme.colors.primary
        },
    ];

    // Handles floating action button clicks. 
    function handleFabClick(name) {
        if(name == "fabAddCow") {
            navigation.navigate("Add Cow")
        } 
    }

 // Flatlist uses this to display each cow record. "item" is a single cow. 
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
                        <Text>{item.tagNum}</Text>
                         <Text>{formatDate(item.dob)}</Text>  
                        <Text>{item.breed}</Text>
                        <Text>{item.sex}</Text>
                        <Text>{item.weight} kg</Text>
                        <Text>{item.medRecord}</Text>
                    </View>    
                </View>     
            </Card>
        </TouchableOpacity>
    )

    return (
        <>
            <MyScrollView onRefresh={loadData}>    
                <Card containerStyle={{padding: 0}}>
                    {/*https://reactnativeelements.com/docs/searchbar/*/}
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
                
                {   // If there are no cows we display this text. 
                    cows.length==0 && 
                    <Card>
                        <Text style={{textAlign: "center"}}>No Cows Found!</Text>
                    </Card>
                }  
                
                <FlatList
                    data={filteredCows}   
                    renderItem={renderItem}
                    keyExtractor={item => item.tagNum} // Flatlist wants a unique key for each item, so we tell it to use each cows tagNum. 
                    style={styles.list}
                /> 
            </MyScrollView>
              
            <FloatingAction 
                actions={actions}
                onPressItem={name => handleFabClick(name) }
                color={theme.colors.primary}
            />

        </>
    )
}    

//This details the styling and correct sizing required for this page. reference= https://reactnative.dev/docs/stylesheet
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
    cardHeader: {
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    }
})
 
//allows me to import this elsewhere if require. can be used as component.
export default CowList