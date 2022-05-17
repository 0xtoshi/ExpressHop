const axios = require('axios');
const Web3 = require('web3');
const fs = require('fs');
const web3 = new Web3('http://13.229.135.196:8545');
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
  
  const address_list = [];
  knex.select('address')
  .from('addressesMetadataAllUsers')
  .where('totalTxs', '>', 2)
  //.limit(3)
  .then((result) => {
      for(let address of result){
        sleep(5);
          web3.eth.getTransactionCount(address.address, function(error, result) {
              if(result > 0)
              {
                  insertToTable({
                    address: address.address,
                    count : result
                })
              }
          });
      }
  })


  function insertToTable(data)
  {
      knex('EthereumTxs').insert(data).then((result) => {
          console.log(result);
      })
  }

  const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};