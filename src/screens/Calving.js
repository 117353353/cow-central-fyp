//Import libraries
import React, { useState, useEffect, useContext } from "react"
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native"
import { Card, Text, SearchBar, ThemeContext, Divider, Button } from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons'

import { db } from "src/firebase"
import { getCalving } from "src/firestore"
import MyScrollView from "components/MyScrollView";
import { formatDate } from "src/helpers"

//Creating the variables for the component
function Calving({navigation, tagNum}) {
    const [calvingData, setCalvingData] = useState([])
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        loadData()
    }, [])  

    //function to retrieve the milk recording documents for that specific cow
    function loadData() {
        getCalving(tagNum)
            .then(calving => {
                setCalvingData(calving)
            })
            .catch(error => {
                console.log(error.message)
            })
    } 

    //passes in milk recordings to be displayed on a card 
    // "item" is a single milk recording
     const renderItem = ({ item }) => (
        <>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.bold}>Tag Number</Text>
                    <Text style={styles.bold}>Calving Date</Text>    
                    <Text style={styles.bold}>Notes</Text>                         
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>{item.tagNum}</Text>
                    <Text style={styles.text}>{formatDate(item.date)}</Text>
                    <Text style={styles.text}>{item.notes}</Text>     
                </View>    
            </View> 
            <Divider />
        </>
    )

    return (
        <>
{/*             <Card containerStyle={{padding: 0}}>
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
            </Card>  */}      
            {

                <Card>
                    <Card.Title style={{color: theme.colors.primary, fontSize: 18}} onPress={loadData}>
                        Calving
                    </Card.Title>
                    <Divider />
                    {
                        calvingData.length==0 
                        ?
                            <Card.Title style={{marginTop: 15, marginBottom: 5}}>No data!</Card.Title>
                        : 
                        <FlatList
                            data={calvingData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={styles.list}
                        /> 
                    }
                </Card>
            }    
        </>     
    )
}

//Contains the styling and sizing which has been implemented in this component

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 50
    },
    container: {

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
        fontWeight: "bold",

    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        padding: 5
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
})

//allows it to be used in other components
export default Calving
