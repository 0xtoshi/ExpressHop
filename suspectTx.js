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

  const eligibleAddresses = fs.readFileSync('./suspectTx.txt').toString().split("\n");

  console.log(`**Address**|**Total Volume**|**Total Txs**| ** Last Tx on Polygon**
  :-----:|:-----:|:-----:|:-----:`);
  (async() => {
    
    for(let address of eligibleAddresses){
      console.log(`${address}|${await fromatUSD(await getTotalVolume(address))}|${await getTotalTxs(address)}|${await getTimestampLastTx(address)}`)
    }

    async function getETHCount(address)
    {
      let count = await knex('transferSentETH')
      .select('address_from')
      .where('address_from', address)
      return count.length;
    }
    async function getARBCount(address)
    {
      let count = await knex('transferSentARB')
      .select('address_from')
      .where('address_from', address)
      return count.length;
    }
    async function getOPCount(address)
    {
      let count = await knex('transferSentOP')
      .select('address_from')
      .where('address_from', address)
      return count.length;
    }
    async function getPOLYCount(address)
    {
      let count = await knex('transferSentPOLY')
      .select('address_from')
      .where('address_from', address)
      return count.length;
    }
    async function getXDAICount(address)
    {
      let count = await knex('transferSentXDAI')
      .select('address_from')
      .where('address_from', address)
      return count.length;
    }
    async function getTotalVolume(address)
    {
      let totalVolume = await knex('addressesMetadataAllUsers')
      .select('totalVolume')
      .where('address', address)
      return totalVolume[0].totalVolume;
    }
    async function getTotalTxs(address)
    {
      let totalVolume = await knex('addressesMetadataAllUsers')
      .select('totalTxs')
      .where('address', address)
      return totalVolume[0].totalTxs;
    }
    async function fromatUSD(value){
      return (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }

    async function getTimestampLastTx(address)
    {
      try{
      let totalVolume = await knex('transferSentPOLY')
      .select('timestamp')
      .where('address_from', address)
      .orderBy('timestamp','DESC')
      .limit(1)
      return new Date(totalVolume[0].timestamp *1000).toLocaleString('en-US');
      }catch(e){}
      
    }

  })();

