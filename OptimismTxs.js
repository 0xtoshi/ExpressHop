const axios = require('axios');
const Web3 = require('web3');
const fs = require('fs');
const web3 = new Web3('https://mainnet.optimism.io/');
const eligible = require('./eligible.json');
(async() => {
for(let i=0; i<eligible.length; i++)
{
    var txCount = await web3.eth.getTransactionCount(eligible[i]);
    fs.appendFileSync('OptimismTxs.txt',`${eligible[i]},${txCount}\n`)
}

})()
