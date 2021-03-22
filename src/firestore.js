import { db, auth } from "./firebase"
import { formatDate } from "./helpers"

export async function getCow(tagNum) {
    let doc = await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).get().catch(error => alert(error.message))
    let cow = doc.data()
    cow.id = doc.id
    cow.dobString = formatDate(cow.dob.toDate())
    return cow
}

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

export async function updateCow(tagNum, weight, medRecord) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).update({
        medRecord: medRecord,
        weight: weight
    })
}

export async function archiveCow(tagNum) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).update({
        archived: true,
        archivedDate: new Date()
    })

    getMilkRecordings(tagNum)
        .then(records => {
            records.forEach(record => {
                db.collection(auth.currentUser.uid).doc("herd").collection("milkRecordings").doc(record.id).delete()
            })
        }).catch(error => {
            
        })
        
    
}

export async function deleteCow(tagNum){
    await db.collection(auth.currentUser.uid).doc("herd").collection("cows").doc(tagNum).delete()
}

export async function addCalving(tagNum, date, notes) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("calving").doc().set({
        tagNum: tagNum,
        date: date,
        notes: notes,
        archived: false
    })
}

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

export async function archiveCalving(id) {
    await db.collection(auth.currentUser.uid).doc("herd").collection("calving").doc(id).update({
        archived: true,
        archivedDate: new Date()
    })
}

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