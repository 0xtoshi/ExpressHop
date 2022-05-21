const fs = require('fs');
const ENSList = fs.readFileSync('./trackENS.txt').toString().split("\n");
const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('http://13.229.135.196:8545');
(async() => {

    for(let address of ENSList){
        var name = await provider.lookupAddress(address);
        console.log(`${address}|${name}`);
    }

})()