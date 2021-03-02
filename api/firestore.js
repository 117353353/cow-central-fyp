import { db } from "../firebase"

export async function getCow(tagNum) {
    let doc = await db.collection("cows").doc(tagNum).get().catch(error => alert(error.message))
    let cow = doc.data()
    cow.id = doc.id
    cow.dobString = formatDate(cow.dob)
    return cow
}

export async function getCalving() {
    let docs = await db.collection("calving").where('date', ">", new Date()).orderBy('date').get()

    let calvingData = []
    docs.forEach(doc => {
        let temp = doc.data()
        temp.id = doc.id
        temp.dateString = formatDate(temp.date)
        calvingData.push(temp)
    })

    return calvingData
}

function formatDate(timestamp) {
    let date = timestamp.toDate() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
}