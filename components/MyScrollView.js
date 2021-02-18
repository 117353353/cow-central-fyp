import React from "react"
import {ScrollView, SafeAreaView} from "react-native"

function MyScrollView({children}) {
    return (
        <SafeAreaView>
            <ScrollView>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyScrollView