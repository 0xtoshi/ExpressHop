const axios = require('axios');
const starTimestamp = 1623888000;
const endTimestamp = Math.floor(new Date() / 1000);
let split = 86400;
var timestampSplit = starTimestamp;
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'hop',
      password : 'paolo19822',
      database : 'hop'
    }
  });
(async() => {

    while(true){

        console.log(formatDate(timestampSplit * 1000), formatDate(Number(timestampSplit+split) * 1000) )
        await getAndInsert(formatDate(timestampSplit * 1000), formatDate(Number(timestampSplit+split) * 1000))
        //console.log(`Process ${i++}`);
        //shell.exec('ts-node src/cli.ts --transfers');
    
        timestampSplit = timestampSplit+ split;
        if(timestampSplit >= endTimestamp) break;
    }

    async function getAndInsert(start, end)
    {
        var dataTx = await axios(`https://explorer-api.hop.exchange/v1/transfers?perPage=5000&startDate=${start}&endDate=${end}`);
        for(let data of dataTx.data.data)
        {
            try{
                await knex('HopTx').insert(data);
                }catch(err){console.log('Error Maybe Duplicated!')}
        }
    }

})()


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}