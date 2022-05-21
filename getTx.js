const axios = require('axios');
const fs = require('fs');
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
  const eligibleAddresses = fs.readFileSync('./eligibleAddresses.txt').toString().split("\n");

(async() => {

    for(let i=0; i<eligibleAddresses.length; i++)
    {
        console.log(i);
        await getAndInsert(eligibleAddresses[i]);
    }


    async function getAndInsert(address)
    {
        var dataTx = await axios(`https://explorer-api.hop.exchange/v1/transfers?perPage=100&account=${address}`);
        for(let data of dataTx.data.data)
        {
            try{
                await knex('hiphop').insert(data);
                }catch(err){console.log('Error Maybe Duplicated!')}
        }
    }

})()

