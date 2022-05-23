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
  var addressUnique = [];
(async() => {

    const SQL = await knex.select('accountAddress','recipientAddress')
    .from('HopTx')
    .where('sourceChainId', 137)
    .where('destinationChainId', 100)
    .distinct('accountAddress')

    for (let address of SQL)
    {
        if( address.accountAddress !== address.recipientAddress)
        {

            addressUnique.push(address.accountAddress);
           /**
            
            */
        }

        
    }
    var unique = addressUnique.filter((v, i, a) => a.indexOf(v) === i);
    for(let uniqAddress of unique)
    {
       try{
        var data = await axios(`https://api.polygonscan.com/api?module=account&action=txlistinternal&address=${uniqAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=ASC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`)
        var result = data.data.result;
        for(let res of result)
        {
            if(res.from == '0x1fdc5e69729eecf8e933c904e86faf7a8886f661')
            {
                console.log(uniqAddress);
            }
        }
       }catch(e){}
    }

})()