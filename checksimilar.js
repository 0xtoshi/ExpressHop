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
  const eligibleAddresses = fs.readFileSync('./checksimilar.txt').toString().split("\n");
  console.log(`Address|Total Txs|Cumulative Volume
  :-----:|:-----:|:-----:`);
  (async() => {

    for(let address of eligibleAddresses)
    {
        try{
        var dataTx = await checkFromAddress(address);
        var metaData = await getMetaData(address);
        var Ens = await getENS(address);
        console.log(`${address}|${metaData.totalTxs}|${(Math.floor(metaData.totalVolume)).toLocaleString('en-US', {style: 'currency',currency: 'USD',})}`)
        }catch(err){}
    }

    async function checkFromAddress(address)
    {
        var mainnet = [];
        var arbitrum = [];
        var optimism = [];
        var polygon = [];
        var xdai = [];
        const dataTx = await knex.select()
        .from('HopTx')
        .where('accountAddress', address)
        for(let data of dataTx)
        {
            if(data.sourceChainSlug == 'ethereum') mainnet.push(data);
            else if(data.sourceChainSlug == 'arbitrum') arbitrum.push(data);
            else if(data.sourceChainSlug == 'optimism') optimism.push(data);
            else if(data.sourceChainSlug == 'polygon') polygon.push(data);
            else if(data.sourceChainSlug == 'gnosis') xdai.push(data);
        }

        var count = {
            mainnet : mainnet.length,
            arbitrum : arbitrum.length,
            optimism : optimism.length,
            polygon : polygon.length,
            xdai : xdai.length,
            total : dataTx.length
        }
        return count;
    }
    async function getMetaData(address)
    {
        const data = await knex.select()
        .from('addressesMetadataAllUsers')
        .where('address', address)

        return data[0];
    }

    async function getENS(address)
    {
        const data = await knex.select()
        .from('ENS')
        .where('address', address)

        return data[0];
        
    }

  })()