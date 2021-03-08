import React from "react"
import { Text } from "react-native-elements"

function ScreenTitle({text}) {
    return (
        <Text style={{textAlign: "center", fontSize: 22, marginTop: 10 }}>
            {text}
        </Text>
    )
}

export default ScreenTitle

