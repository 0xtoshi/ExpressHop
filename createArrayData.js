const fs = require('fs');
const axios = require('axios');
const eligibleAddresses = fs.readFileSync('./listvictim.txt').toString().split("\n");
var array = []
eligibleAddresses.forEach(async(address) => {

    array.push([
        "0x335c0552eb130f3dfbe6efcb4d2895aed1e9938b", address.slice(0,6)
    ])


})


fs.writeFileSync('data.array', JSON.stringify(array));