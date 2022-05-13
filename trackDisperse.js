const axios = require('axios');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mainnet.matic.quiknode.pro/');
var abiDecoder = require('abi-decoder');
const ABI = [{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseTokenSimple","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseEther","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]
abiDecoder.addABI(ABI);

const txMultiSender = "0x1f52e7711254f98bf75c5951e87eacb5f6dee19c9927eff5f0dbbe0880c21d8e";
web3.eth.getTransaction(txMultiSender, async function(error, result) {
    if(!error){
        const decode_data = abiDecoder.decodeMethod(result.input);
        for(let i=0; i<decode_data.params[0].value.length; i++)
        {
            const checkEligbility = await axios(`http://localhost:3000/airdrop/address/${decode_data.params[0].value[i]}`);
            if(Object.keys(checkEligbility.data.data).length > 0)
            {
                if(checkEligbility.data.data.hopUserTokens > 0)
                {
                    console.log(checkEligbility.data.data.address);
                }

            }
        }
    }
});
