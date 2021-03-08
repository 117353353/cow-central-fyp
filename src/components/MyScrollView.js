import React from "react"
import {ScrollView, SafeAreaView, RefreshControl } from "react-native"

function MyScrollView({children, onRefresh}) {
    return (
        <ScrollView
            refreshControl={
                // Enables refresh if a function has been passed in as onRefresh.  
                onRefresh ? <RefreshControl onRefresh={onRefresh} refreshing={false}/> : null 
            }
            contentContainerStyle={{paddingBottom: 15}}
        >
            {children}
        </ScrollView>
    )
}

export default MyScrollView