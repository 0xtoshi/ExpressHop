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

  (async() => {

    const sql = await knex.select()
    .from('HopTx')
    //.where('destinationChainId', 137)
    .where('sourceChainId', 1)
    for(let data of sql)
    {
        if( data.accountAddress !== data.recipientAddress)
        {
            console.log(`${data.accountAddress} => ${data.recipientAddress} (${data.amountUsdDisplay})`);
            //console.log(data.accountAddress);
        }
    }

  })()