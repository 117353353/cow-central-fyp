import React, {useState, useEffect} from "react"
import {Card, Text, Button} from "react-native-elements"
import {db} from "../firebase"

function CowDetails({route}) {
    const [cow, setCow] = useState([])

    useEffect(() => {
        getCow()
    }, [])

    function getCow() {
        db.collection("cows").doc(route.params.cowId).get()
        .then(doc => {
            console.log(doc.data())
            setCow(doc.data())
        }).catch(error => {
            console.log(error.message)
        })
    }
    
    return (
        <Card>
            <Text>Tag Number: {route.params.cowId}</Text>
            <Text>Breed: {cow.breed}</Text>
            <Text>Weight: {cow.weight}</Text>
            <Text>DOB: {cow.dob}</Text>
            <Text>Med Record: {cow.medRecord}</Text>
            <Text>Sex: {cow.sex}</Text>
            <Button title="Edit"/>
        </Card>
    )
}

export default CowDetails