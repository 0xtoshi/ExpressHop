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
  const etherscan = 'https://etherscan.io/address';
  console.log(`No|Address|Total Token
  :--:|:-----:|:-----:`);
  (async() => {

    var sql = await knex('finalDistribution')
    .select()
    .where('totalTokens','>', 100000 * 10**18)
    .orderBy('totalTokens','DESC')

    sql.sort((a, b) => parseFloat(b.totalTokens) - parseFloat(a.totalTokens));
    let i = 1;
    for(let data of sql)
    {
        console.log(`${i++}|[${data.address}](${etherscan}/${data.address})|${(data.totalTokens / 10**18).toLocaleString()} HOP`);
    }

  })()