import React, { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { BottomSheet, Input, ListItem } from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons'

// https://reactnativeelements.com/docs/bottomsheet/
function Picker({value, setValue, options, label}) {
    const [listVisible, setListVisible] = useState(false)

    function handleClick(option) {
        setValue(option)
        setListVisible(false)
    }

    return (
        <>
            <TouchableOpacity onPress={() => setListVisible(true)}>
                <Input 
                    label={label}
                    value={value}
                    rightIcon={<FontAwesome name="chevron-down" size={24} color="grey" />}
                    disabled
                    disabledInputStyle={{opacity: 1}}
                />
            </TouchableOpacity>

            <BottomSheet isVisible={listVisible}>
                {options.map((option, index) => (
                    <ListItem onPress={() => handleClick(option)} key={index}>
                        <ListItem.Content>
                            <ListItem.Title>{option}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
                <ListItem onPress={() => setListVisible(false)} containerStyle={{backgroundColor: "red", color: "white"}}>
                    <ListItem.Content>
                        <ListItem.Title style={{color: "white"}}>Cancel</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>   
        </>
    )
}

export default Picker