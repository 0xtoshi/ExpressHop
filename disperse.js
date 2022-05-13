const axios = require('axios');
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('https://rpc-mainnet.matic.quiknode.pro/');
var abiDecoder = require('abi-decoder');
const ABI = [{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseTokenSimple","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipients","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"disperseEther","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]
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

const TxJson = fs.readFileSync('./dispersexdai.json', 'utf8');
const txData = JSON.parse(TxJson);
const result = txData.result;

console.log(result.length)

result.forEach(async data => {
    try {
    const decode_data = abiDecoder.decodeMethod(data.input);


        if(decode_data !== undefined && decode_data.params[0].value[0] !== 0){
          knex.select()
          .from('addressesMetadataAllUsers')
          .join('finalDistribution', 'addressesMetadataAllUsers.address','finalDistribution.address')
          .where('addressesMetadataAllUsers.address', decode_data.params[0].value[0])
          .then((result) => {
              if(result.length > 0){
             console.log(data.hash);
              }
          }).catch((err) => {
              
          });
     }else{

     }
    }catch(err){
      
    }
     

     
     
});