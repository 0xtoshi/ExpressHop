const axios = require('axios');
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mainnet.matic.quiknode.pro/');
var abiDecoder = require('abi-decoder');
const ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"multisendToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
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

const TxJson = fs.readFileSync('./TxnMultiToken.json', 'utf8');
const txData = JSON.parse(TxJson);
const result = txData.result;

result.forEach(async data => {
    const decode_data = abiDecoder.decodeMethod(data.input);


        if(decode_data !== undefined){

            knex.select()
            .from('addressesMetadataAllUsers')
            .join('finalDistribution', 'addressesMetadataAllUsers.address','finalDistribution.address')
            .where('addressesMetadataAllUsers.address', decode_data.params[1].value[0])
            .then((result) => {
                if(result.length > 0){
               console.log(data.hash);
                }
            }).catch((err) => {
                
            });
            
        
     }else{

     }
});
