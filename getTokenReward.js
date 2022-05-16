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
        const HopAPI = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${eligibleAddresses[i]}`);
        //console.log(HopAPI.data.data)
        elig.push(HopAPI.data.data);
        total_reward += Number(HopAPI.data.data.totalTokens);
        totalTx += Number(HopAPI.data.data.totalTxs); 
        totalVol += Number(HopAPI.data.data.totalVolume);
        //console.log(total_reward);
    }
    //console.log(total_token);
    console.log('Total Address in Eligible : '+ elig.length);
    console.log('Total Rewarded : '+ Number(total_reward)/10**18);
    console.log('Total AVG Txs : '+ Number(totalTx)/elig.length);
    console.log('Total AVG Volume: '+ Number(totalVol/elig.length));
    console.log('Your Reward : '+ Number(total_reward)/10**18 * 0.25);

})();