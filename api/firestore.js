import { db } from "../firebase"
import { formatDate } from "../helpers"

export async function getCow(tagNum) {
    let doc = await db.collection("cows").doc(tagNum).get().catch(error => alert(error.message))
    let cow = doc.data()
    cow.id = doc.id
    cow.dobString = formatDate(cow.dob.toDate())
    return cow
}

export async function getCows(archived) {
    let docs = await db.collection("cows").where("archived", "==", archived).get() 

    if(docs.empty) return []
    
    let cows = []
    docs.forEach(doc => {
        let cow = doc.data()
        cow.tagNum = doc.id
        cows.push(cow)
    })
    return cows
}

export async function addCow(tagNum, breed, dob, medRecord, weight, sex) {
    await db.collection("cows").doc(tagNum).set({
        breed: breed,
        dob: dob,
        medRecord: medRecord,
        weight: weight,
        sex: sex,
        archived: false
    })
}

export async function archiveCow(tagNum) {
    await db.collection("cows").doc(tagNum).update({
        archived: true,
        archivedDate: new Date()
    })
}

export async function addCalving(tagNum, date, notes) {
    await db.collection("calving").doc().set({
        tagNum: tagNum,
        date: date,
        notes: notes,
        archived: false
    })
}

export async function getCalving(archived) {
    let docs = []

    docs = await db.collection("calving").orderBy('date').where("archived", "==", archived).get()

    let calvingData = []
    docs.forEach(doc => {
        let temp = doc.data()
        temp.id = doc.id
        temp.dateString = formatDate(temp.date.toDate())
        calvingData.push(temp)
    })

    return calvingData
}

export async function archiveCalving(id) {
    await db.collection("calving").doc(id).update({
        archived: true,
        archivedDate: new Date()
    })
}

export async function getMilkRecordings() {
    let docs = await db.collection("milkRecordings").get()
    let milkRecordings = []
    docs.forEach(doc => {
        let recording = doc.data()
        recording.id = doc.id
        milkRecordings.push(recording)
    })
    return milkRecordings
}