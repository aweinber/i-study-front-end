import db from '../config.js'

let membersRef = db.ref('/members/0')
console.log("mr: " + membersRef);

membersRef.