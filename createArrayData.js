const fs = require('fs');
const axios = require('axios');
const eligibleAddresses = fs.readFileSync('./listvictim.txt').toString().split("\n");
var array = []
eligibleAddresses.forEach(async(address) => {

    array.push([
        "0x335c", address.slice(0,6)
    ])


})


fs.writeFileSync('data.array', JSON.stringify(array));