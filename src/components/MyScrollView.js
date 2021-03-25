import React from "react"
import {ScrollView, SafeAreaView, RefreshControl } from "react-native"


// Creates a ScrollView component which we use in various parts of the app. 

// children are components wrapped in MyScrollView tags. 
// onRefresh is a function to be called when user drags down from top. 
function MyScrollView({children, onRefresh}) {
    return (
        <ScrollView
            refreshControl={
                // Enables refresh if a function has been passed in as onRefresh.  
                onRefresh ? <RefreshControl onRefresh={onRefresh} refreshing={false}/> : null 
            }
            contentContainerStyle={{
                paddingBottom: 15, 
            }}
        >
            {children}
        </ScrollView>
    )
}

export default MyScrollView