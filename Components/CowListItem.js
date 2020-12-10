import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    view: {
        border: "1px solid black",
        width: "500px"
    },
})

function CowListItem (props){
    
    return(
        <View style={styles.view}>
            {props.cow.breed}
            {props.cow.medRecord}
        </View>
    )
}
export default CowListItem