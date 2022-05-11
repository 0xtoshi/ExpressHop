const axios = require('axios');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mainnet.matic.quiknode.pro/');
var abiDecoder = require('abi-decoder');
const ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"multisendToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
abiDecoder.addABI(ABI);

const txMultiSender = "0x44a20c9008a1f2c41910427c6218d65980161edc682d02ea2ee109500811cd99";
const addressList = [];
web3.eth.getTransaction(txMultiSender, async function(error, result) {
    if(!error){
        const decode_data = abiDecoder.decodeMethod(result.input);
        for(let i=0; i<decode_data.params[1].value.length; i++)
        {
            //console.log(decode_data.params[1].value[i]);
            const checkEligbility = await axios(`http://localhost:3000/airdrop/address/${decode_data.params[1].value[i]}`);
            
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
