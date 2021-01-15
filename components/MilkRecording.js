import React, { useState } from "react"

const styles = StyleSheet.create({

})

function MilkRecording() {
    return (
        <Card>
            <Input
                style={styles.textInput}
                onChangeText={text => setTagNum(text)}
                value={tagNum}
                label="Tag Number"
            />  
               
            <Input
                style={styles.textInput}
                onChangeText={text => setDob(text)}
                value ={dob}
                label="Date of Birth"
            />  
  
            <Button title="Add Cow" onPress={add} />          
        </Card>
    )
}

export default MilkRecording