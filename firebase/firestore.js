import { db } from "../firebase"

export async function getCow(tagNum) {
    let doc = await db.collection("cows").doc(tagNum).get().catch(error => alert(error.message))
    
    let cow = doc.data()
    cow.id = doc.id

    let date = doc.data().dob.toDate() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    cow.dobString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

    return cow
}