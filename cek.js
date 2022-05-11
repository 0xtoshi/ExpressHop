const Web3 = require('web3');
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

  const getBlockApiKey = '7e50939a-d8a0-49d7-a0d2-7109168b69b9';
  const NetworkRPC = {
    Optimism : 'https://optimism.getblock.io/mainnet/?api_key=',
    Matic : 'https://matic.getblock.io/mainnet/?api_key=',
    Gnosis : 'https://gno.getblock.io/mainnet/?api_key=',
    Arbitrum : 'https://arbitrum.getblock.io/mainnet/?api_key=',
    Ethereum : 'http://13.229.135.196:8545'
  };

  const Web3utils = new Web3(NetworkRPC.Ethereum);

  knex.select().from('addressesMetadataAllUsers')
  .where('totalTxs', '<=' , '3')
  .where('totalVolume', '>=' , '20000')
  .then((result) => {
      result.forEach(async (data, key) => {
        const txCount = await getEthTxCount(data.address);


        if(txCount < 3){
            console.log(data.address);
            
        }
      })
  })

  async function getEthTxCount(address)
  {
      const web3 = new Web3('http://13.229.135.196:8545');
      const TxCount = await web3.eth.getTransactionCount(address);
      return TxCount;
  }

  async function getEthBalance(address)
  {
      const web3 = new Web3('https://mainnet.infura.io/v3/149da563362f4081a91bd2923536bcdd');
      const Balance = await web3.eth.getBalance(address);
      return Balance;
  }

