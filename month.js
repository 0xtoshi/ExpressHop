const axios = require('axios');
const starTimestamp = 1623973075;
const endTimestamp = Math.floor(new Date() / 1000);
let divide = 365;
let timeStampMin = Number(endTimestamp- starTimestamp);
let split = Math.floor(Number(timeStampMin) / divide);
var timestampSplit = starTimestamp;
var i= 1;
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

    for(let i=1; i<140;i++)
    {
        await getAndInsert(i);
        console.log(i);
    }

    async function getAndInsert(i)
    {
        var dataTx = await axios(`https://explorer-api.hop.exchange/v1/transfers?page=${i}&perPage=5000`);
        for(let data of dataTx.data.data)
        {
            try{
                await knex('hiphop').insert(data);
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