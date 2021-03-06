//import libraries from external source so they are recognised
import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

//Values generated from firestore and connect the database to the project 
//https://console.firebase.google.com/u/1/project/cow-central/settings/general/web:YjgxZGE1MWUtYTE1OC00ZDU4LTlmNzEtY2I5YmY1MjRlMGY4
//https://www.freecodecamp.org/news/react-native-firebase-tutorial/

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

//so I can import the database in other components
export const auth = firebase.auth()
export const db = firebase.firestore()