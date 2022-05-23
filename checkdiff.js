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
  const fs = require('fs');

  (async() => {

    const sql = await knex.select()
    .from('HopTx')
    //.where('destinationChainId', 137)
    .where('sourceChainId', 137)
    .orderBy('accountAddress')
    for(let data of sql)
    {
        if( data.accountAddress !== data.recipientAddress)
        {
            console.log(`${data.accountAddress}(${data.sourceChainId}) => ${data.recipientAddress}(${data.destinationChainId}) (${data.amountUsdDisplay})`);
            //console.log(data.accountAddress);
            fs.appendFileSync('diffMatic.txt', `${data.accountAddress}(${data.sourceChainId}) => ${data.recipientAddress}(${data.destinationChainId}) (${data.amountUsdDisplay}) \n`);
        }
    }

  })()