const axios = require('axios');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mainnet.matic.quiknode.pro/');
var abiDecoder = require('abi-decoder');
const ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"multisendToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
abiDecoder.addABI(ABI);

const txMultiSender = "0x40714454ecf41ba76f36b6f051b26f5668ca08ab61fd1878bc5d2a8934a237b4";
const addressList = [];
web3.eth.getTransaction(txMultiSender, async function(error, result) {
    if(!error){
        const decode_data = abiDecoder.decodeMethod(result.input);
        for(let i=0; i<decode_data.params[1].value.length; i++)
        {
            
           // console.log(decode_data.params[1].value[i]);
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
