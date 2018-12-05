import db from '../config.js'

let membersRef = db.ref('/members/0')
console.log("mr: " + membersRef);

membersRef.once("value").then(function(snapshot) {
    console.log("and?: " + snapshot.val());
})

export default "";