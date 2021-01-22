import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyAbfPcTjv0MOgG8BtpNHcSXfups4YiqDrs",
    authDomain: "cow-central.firebaseapp.com",
    databaseURL: "https://cow-central.firebaseio.com",
    projectId: "cow-central",
    storageBucket: "cow-central.appspot.com",
    messagingSenderId: "863042524293",
    appId: "1:863042524293:web:f5ed7b57f7e8016f5585ec"
}
  
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()