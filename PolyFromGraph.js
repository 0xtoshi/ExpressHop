const fs = require('fs');
const axios = require('axios');
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
  console.log(`**Timestamp**|**From**|**Recipient**|**Amount**|**Token**|**destinationChainId**|**transactionHash**
  :-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:`)
  const eligibleAddresses = fs.readFileSync('./listvictim.txt').toString().split("\n");

  (async() => {

    for(let address of eligibleAddresses)
    {
        knex.select('address_from','destinationChainId','amount','recipient','transactionHash','timestamp','token')
        .from('transferSentPOLY')
        .where('address_from', address)
        .then(result =>{
            for(let data of result)
            {
                var amount = Math.floor(Number(Number(data.amount) / 10**6),2)
               console.log(`${new Date(data.timestamp * 1000).toLocaleString('en-US')}|${address}|${data.recipient}|${amount}|${data.token}|${data.destinationChainId}|[TX](https://polygonscan.com/${data.transactionHash})`);
            }
        }).catch()
    }

  })();

  