import { db, auth } from "./firebase"
import { formatDate } from "./helpers"

// This file contains all the functions for interacting with the database. 

// Getting documents: https://firebase.google.com/docs/firestore/query-data/get-data
// Adding & updating documents: https://firebase.google.com/docs/firestore/manage-data/add-data
// Deleting documents: https://firebase.google.com/docs/firestore/manage-data/delete-data
// Queries: https://firebase.google.com/docs/firestore/query-data/queries

// Gets cow by tagNum.
export async function getCow(tagNum) {
    let doc = await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).get().catch(error => alert(error.message))
    let cow = doc.data()
    cow.id = doc.id
    return cow
}

// Returns array of cows in the database which arent archived.
export async function getCows() {
    let docs = await db.collection(auth.currentUser.uid).doc("herd").collection("cows").where("archived", "==", false).get() 

    if(docs.empty) return []
       
    let cows = []
    docs.forEach(doc => {
        let cow = doc.data()
        cow.tagNum = doc.id
        cow.dob = cow.dob.toDate()
        cows.push(cow)
    })

    return cows
}

//Returns array of cows which have archived equal to true for use in cow archive function.
export async function getArchivedCows() {
    let docs = await db.collection(auth.currentUser.uid).doc("herd").collection("cows").where("archived", "==", true).get() 

    if(docs.empty) return []
    
    let cows = []
    docs.forEach(doc => {
        let cow = doc.data()
        cow.tagNum = doc.id
        cows.push(cow)
    })

    return cows
}

//Adds a new cow document with the relevant fields.
export async function addCow(tagNum, breed, dob, medRecord, weight, sex) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).set({
        breed: breed,
        dob: dob,
        medRecord: medRecord,
        weight: weight,
        sex: sex,
        archived: false
    })
}

//Updates the the weight and medrecord of the given cow.
export async function updateCow(tagNum, weight, medRecord) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).update({
        medRecord: medRecord,
        weight: weight
    })
}

// Sets the cow as archived, creates an archived date and deleted that cows milk recordings so they dont get included in herd statistics. 
export async function archiveCow(tagNum) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).update({
        archived: true,
        archivedDate: new Date()
    })
    
    // Gets cows milk recordings, loops through them, and deletes them one by one. 
    getMilkRecordings(tagNum)
        .then(records => {
            records.forEach(record => {
                db.collection(auth.currentUser.uid).doc("herd").collection("milkRecordings").doc(record.id).delete()
            })
        }).catch(error => {
            alert(error.message)
        })   
}

// Permanently deletes cow from database. Used in Cow Archive. 
export async function deleteCow(tagNum){
    await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).delete()
}

//creates a document and relevant fields for a calving record
export async function addCalving(tagNum, date, notes) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("calving").doc().set({
        tagNum: tagNum,
        date: date,
        notes: notes,
        archived: false
    })
}

//Permanently deletes a calving record from the database. Uses in the calving archive.
export async function deleteCalving(id){
    await db.collection(auth.currentUser.uid).doc("herd").collection("calving").doc(id).delete()
}

// If tagNum is passed in retrieves calving records for that cow (Cow Details). If nothing is passed in retrieves all non archived calving records (Calving Calendar).
export async function getCalving(tagNum) {
    let docs

    if(tagNum) {
        docs = await db.collection(auth.currentUser.uid).doc("herd").collection("calving").orderBy('date').where("tagNum", "==", tagNum).get()
    } else {
        docs = await db.collection(auth.currentUser.uid).doc("herd").collection("calving").orderBy('date').where("archived", "==", false).get()
    }
    
    if(docs.empty) return []

    let calvingData = []
    docs.forEach(doc => {
        let temp = doc.data()
        temp.id = doc.id
        temp.date = temp.date.toDate()
        calvingData.push(temp)
    })

    return calvingData
}

//retrieving calving records that have been archived for calving archive
export async function getArchivedCalving() {
    let docs = []

    docs = await db.collection(auth.currentUser.uid).doc("herd").collection("calving").orderBy('date').where("archived", "==", true).get()

    let calvingData = []
    docs.forEach(doc => {
        let temp = doc.data()
        temp.id = doc.id
        calvingData.push(temp)
    })

    return calvingData
}

//functions archives a calving record and creates an archived date (todays date).
export async function archiveCalving(id) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("calving").doc(id).update({
        archived: true,
        archivedDate: new Date()
    })
}

//creating a milk recording document with all the relevant fields in the database.
export async function addMilkRecording(tagNum, date, milkProduced, protein, butterfat, cellCount, notes) {
     await db.collection(auth.currentUser.uid).doc("herd").collection("milkRecordings").add({
        tagNum: tagNum,
        date: date,
        milkProduced: milkProduced,
        protein: protein,
        butterfat: butterfat, 
        cellCount: cellCount,
        notes: notes
    }) 
}

//  If tagNum is passed in, gets milk recordings for that specific cow (Cow Details). Otherwise retrieves all milk recording documents in the databse for use in statistics. (HomePage Statistics)
export async function getMilkRecordings(tagNum) {
    let docs 
    if(tagNum) {
        docs = await db.collection(auth.currentUser.uid).doc("herd").collection("milkRecordings").where("tagNum", "==", tagNum).get()
    } else {
        docs = await db.collection(auth.currentUser.uid).doc("herd").collection("milkRecordings").get()
    }

    if(docs.empty) return []
    
    let milkRecordings = []
    docs.forEach(doc => {
        let recording = doc.data()
        recording.id = doc.id
        recording.date = recording.date.toDate()
        milkRecordings.push(recording)
    })
    return milkRecordings
}