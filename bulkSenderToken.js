const axios = require('axios');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mainnet.matic.quiknode.pro/');
var abiDecoder = require('abi-decoder');
const ABI = [{
    type: 'function',
    name: 'bulksendEther',
    inputs: [ {
        type: 'address[]',
        name: '_to'
    }, {
        type: 'uint256[]',
        name: '_values'
    }, {
        type: 'bytes32',
        name: '_uniqueId'
    } ]
},{
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "_to",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_values",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes32",
        "name": "_uniqueId",
        "type": "bytes32"
      }
    ],
    "name": "bulksendToken",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }]
abiDecoder.addABI(ABI);

const txMultiSender = "0xace55a089f0a01d40cfbecee798a45a06650b2034224de6e6ee0594a8e9c6fe3";
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
