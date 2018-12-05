import { reduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { createStore, compose } from 'redux'
import rootReducer from './reducers'



const firebaseConfig = {
    apiKey: "AIzaSyBZKIeEdYQc9hEptj2MrvUuDrBF_nzmztI",
    authDomain: "govdb-39404.firebaseapp.com",
    databaseURL: "https://govdb-39404.firebaseio.com",
    projectId: "govdb-39404",
    storageBucket: "govdb-39404.appspot.com",
    messagingSenderId: "781632995543"
}


function configureStore(initialState = [], history) {
    const createStoreWithMiddleware = compose(
        reduxFirebase(firebaseConfig, {userProfile: 'users'})
    )
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}