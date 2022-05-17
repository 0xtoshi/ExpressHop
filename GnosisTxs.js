const axios = require('axios');
const Web3 = require('web3');
const fs = require('fs');
const web3 = new Web3('https://gno.getblock.io/mainnet/?api_key=7e50939a-d8a0-49d7-a0d2-7109168b69b9');
const eligible = require('./eligible.json');
(async() => {
for(let i=0; i<eligible.length; i++)
{
    var txCount = await web3.eth.getTransactionCount(eligible[i]);
    fs.appendFileSync('GnosisTxs.txt',`${eligible[i]},${txCount}\n`)
}

})()
