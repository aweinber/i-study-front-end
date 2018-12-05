import {combineReducers} from 'redux'
import { firebaseReducer as firebase} from 'react-redux-firebase'

// const initialState = {
//     bills: [
//         {
//             name: "Global Warming Bill",
//             description: "Save the planet",
//             date: "Yesterday"
//         },
//         {
//             name: "Defense Bill",
//             description: "Fund the troops",
//             date: "Today"
//         }
//
//         ]
//
// }
//
// function billsApp() {
//     return initialState;
// }

const rootReducer = combineReducers({
    firebase
})

export default rootReducer;
