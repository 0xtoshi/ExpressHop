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

  knex.select().from('transferSentPOLY').then(result => {
      for(let data of result)
      {
          //console.log(data.address_from);

          if(data.address_from !== data.recipient)
          {
              fs.appendFileSync('suspectPOLY.txt',`${data.address_from},${data.recipient},${data.destinationChainId}\n`);
          }
      }
  })