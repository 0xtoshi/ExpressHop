const Web3 = require('web3');
const web3 = new Web3('https://arb1.arbitrum.io/rpc')
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


knex.select().from('addressesMetadataAllUsers')
.where('totalTxs', '<=', 3)
.where('totalVolume', '>=', 1000)
.where('totalVolume', '<=', 1100)
.then((result) =>{
    result.forEach((data) =>{
        web3.eth.getTransactionCount(data.address, (err, count) =>{
            console.log(`${data.address} => ${count}`);
        });
    })
})