import React, { Component } from 'react'
import db from '../config'


let rollCallRef = db.ref("/roll_call/99099");
console.log("rcr: " + rollCallRef);

rollCallRef.once("value").then(function(snapshot) {
    console.log("snap val: " + snapshot.val())
})

export default "";