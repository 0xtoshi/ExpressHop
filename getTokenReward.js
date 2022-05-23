const fs = require('fs');
const Web3 = require('web3');
const eligibleAddresses = fs.readFileSync('./listvictim.txt').toString().split("\n");
const axios = require('axios');

(async() => {
    var elig = [];
    var total_reward = 0;
    var totalTx = 0;
    var totalVol = 0;
    for(let i=0; i<eligibleAddresses.length; i++){
        const HopAPI = await axios(`http://localhost:3000/airdrop/address/${eligibleAddresses[i]}`);
        //console.log(HopAPI.data.data)
        elig.push(HopAPI.data.data);
        total_reward += HopAPI.data.data.totalTokens;
        totalTx += HopAPI.data.data.totalTxs; 
        totalVol += HopAPI.data.data.totalVolume;
        //console.log(total_reward);
    }
    //console.log(total_token);
    console.log('Total Address in Eligible : '+ elig.length);
    console.log('Total Rewarded : '+ total_reward);
    console.log('Total AVG Txs : '+ totalTx/elig.length);
    console.log('Total AVG Volume: '+ totalVol/elig.length);
    console.log('Your Reward : '+ total_reward);

})();