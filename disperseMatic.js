
const axios = require('axios');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mainnet.matic.quiknode.pro/');
var abiDecoder = require('abi-decoder');
const ABI = [{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseTokenSimple","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseEther","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]
abiDecoder.addABI(ABI);
const txMultiSender = "0xd2be82a101d9c10afff697e770d179ad3d7129b5b3acb9e2d5c1d45355a4e20b";
web3.eth.getTransaction(txMultiSender, async function(error, result) {
    if(!error){
        const decode_data = abiDecoder.decodeMethod(result.input);
        for(let i=0; i<decode_data.params[0].value.length; i++)
        {
            //console.log(decode_data.params[1].value[i]);
            const checkEligbility = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${decode_data.params[0].value[i]}`);
            
            if(Object.keys(checkEligbility.data.data).length > 0)
            {
                //console.log(data.data.data.address); // All eligible has 36 Address
                if(checkEligbility.data.data.hopUserTokens > 0) // Exclude Liquidity Has 17
                {
                    console.log(checkEligbility.data.data.address);
                }

            }
        }
    }
});
