import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, View, Alert, ToastAndroid } from "react-native"
import { Text, Card, Button} from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons' 
import * as Calendar from 'expo-calendar'

import { getCalving, archiveCalving } from "src/firestore"
import { formatDate } from "src/helpers"
import MyScrollView from "components/MyScrollView"

function CalvingCalendar({route, tagNum}) {
    const [calvingData, setCalvingData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        (async () => {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
          if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            if(calendars.length == 0) {
                createCalendar()
            }   
          }
        })();
    }, []);
    
    async function createCalendar() {
        const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Cow Central Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
          title: 'Cow Central Calendar',
          color: 'blue',
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          source: defaultCalendarSource,
          name: 'internalCalendarName',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
    }

    async function getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async function createEvent(title, date) {
        try {
            const res = await Calendar.createEventAsync("1", {
              endDate: date,
              startDate: date,
              title: title,
              allDay: true
            })
            ToastAndroid.show('Added to Calendar', ToastAndroid.SHORT)
          } catch (e) {
            console.log({ e });
          }
    }

    function loadData() {
        getCalving()
            .then(data => {
                setCalvingData(data)
            }).catch(error => {
                alert(error.message)
            })
    }

    function handleArchive(id) {
        Alert.alert(
            "Has this cow calved?",
            "(This action is not reversible)",
            [
                {
                text: "No",
                onPress: () => {},
                style: "cancel"
                },
                { text: "Yes", onPress: () => {
                    archiveCalving(id) 
                    loadData()
                }}
            ],
            { cancelable: false }
        ) 
    }

    const renderItem = ({ item }) => (
        <Card>
            {calvingData.length==0 && <Card><Text style={{textAlign: "center"}}>No scheduled calving!</Text></Card>}  
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Tag Number</Text>
                    <Text style={styles.label}>Calving Date</Text> 
                    <Text style={styles.label}>Notes</Text>
                </View>
                <View style={styles.column}>
                    <Text>{item.tagNum}</Text>
                    <Text>{formatDate(item.date)}</Text> 
                    <Text>{item.notes}</Text>
                </View>
                <View style={styles.buttonColumn}>
                    <Button 
                        onPress={() => createEvent(`Cow Number ${item.tagNum} is due to calve today.`, item.date)}
                        icon={<FontAwesome name="calendar-plus-o" size={24} color="white"/>}
                        buttonStyle={{marginRight: 5, height: 50}}
                    />
                </View>
                <View style={styles.buttonColumn}>
                    <Button 
                        onPress={() => handleArchive(item.id)}
                        icon={<FontAwesome name="archive" size={24} color="white"/>}
                        buttonStyle={{marginLeft: 5, height: 50}}
                    />  
                </View>
            </View>
        </Card>
    )

    return (
        <MyScrollView onRefresh={loadData}>
            {calvingData.length==0 && <Card><Text style={{textAlign: "center"}}>No calving scheduled!</Text></Card>}  
            <FlatList
                data={calvingData}   
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> 
        </MyScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold"
    },  
    text: {
        fontSize: 20
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
        flex: 2
    },
    buttonColumn: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center"
    },
})

export default CalvingCalendar