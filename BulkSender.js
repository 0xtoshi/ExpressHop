const axios = require('axios');
const fs = require('fs');
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
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'hop'
    }
  });

const TxJson = fs.readFileSync('./bulkdata.json', 'utf8');
const txData = JSON.parse(TxJson);
const result = txData;


result.forEach(async (data) => {

  

    
        if(data.input !== undefined) {
        
        const decode_data = abiDecoder.decodeMethod(data.input);
        if(decode_data !== undefined)
        {
            console.log(decode_data.params[0].value[1])
         
                    if(decode_data !== undefined){
                      knex.select()
                      .from('addressesMetadataAllUsers')
                      .join('finalDistribution', 'addressesMetadataAllUsers.address','finalDistribution.address')
                      .where('addressesMetadataAllUsers.address', decode_data.params[0].value[1])
                      .then((result) => {
                          if(result.length > 0){
                         console.log(data.hash);
                          }
                      }).catch((err) => {
                          
                      });
                 }else{
            
                 }
                
                  

        }
        if(decode_data !== undefined)
        {
            console.log(decode_data.params[1].value[1])
         
                    if(decode_data !== undefined){
                      knex.select()
                      .from('addressesMetadataAllUsers')
                      .join('finalDistribution', 'addressesMetadataAllUsers.address','finalDistribution.address')
                      .where('addressesMetadataAllUsers.address', decode_data.params[1].value[1])
                      .then((result) => {
                          if(result.length > 0){
                         console.log(data.hash);
                          }
                      }).catch((err) => {
                          
                      });
                 }else{
            
                 }
                
                  

        }

        }


     

     
     
});