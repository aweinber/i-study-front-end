import {combineReducers} from 'redux'

const initialState = {
    bills: [
        {
            name: "Global Warming Bill",
            description: "Save the planet",
            date: "Yesterday"
        },
        {
            name: "Defense Bill",
            description: "Fund the troops",
            date: "Today"
        }

        ]

}

function billsApp() {
    return initialState;
}

const reducers = combineReducers({
    billsApp
})

export default reducers;
