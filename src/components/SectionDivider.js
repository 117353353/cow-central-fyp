import React, { useContext } from "react"
import { View } from "react-native"
import { Divider, Text, Card, ThemeContext } from "react-native-elements"

function SectionDivider({text}) {
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <Divider style={{marginTop: 15, marginLeft: 15, marginRight: 15, marginBottom: 0}} />
            <Card>
                <Text style={{color: theme.colors.primary, fontSize: 20, fontWeight: "bold", textAlign: "center"}}>
                    {text}
                </Text>
                <Divider />
            </Card>
        </>
    )
}

export default SectionDivider