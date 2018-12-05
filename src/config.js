import { compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBZKIeEdYQc9hEptj2MrvUuDrBF_nzmztI",
    authDomain: "govdb-39404.firebaseapp.com",
    databaseURL: "https://govdb-39404.firebaseio.com",
    projectId: "govdb-39404",
    storageBucket: "govdb-39404.appspot.com",
    messagingSenderId: "781632995543"
}

firebase.initializeApp(firebaseConfig)


let db = firebase.database()


export default db;