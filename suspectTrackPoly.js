const fs = require('fs');
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
const endBlock = 26615721; //SNAPSHOT BLOCK
const ContractAddress = {
    Dai : "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    Weth : "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    USDC : "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    Wmatic : "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    USDT : "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
}

const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
const abiDecoder = require('abi-decoder');
abiDecoder.addABI(ABI);

  knex.select().from('eligibleAddresses')
  .join('transferSentPOLY', 'eligibleAddresses.address','transferSentPOLY.address_from')
  .then(async result => {

      for(let data of result)
      {
          if(data.address_from !== data.recipient && data.destinationChainId == 100)
          {
              //console.log(data.address_from);
              await TrackPoly(data.address_from)
          }
      }
  })

  async function TrackPoly(root_address)
  {
    var PolygonTransfer = [];
    var WethTransfer = [];
    var UsdcTransfer = [];
    var WmaticTransfer = [];
    var UsdtTransfer = [];
    var DaiTransfer = [];
    var AddressList = [];
    const PolygonScanAPI = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${root_address}&startblock=0&endblock=${endBlock}&page=1&offset=1000&sort=DESC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`);
    //console.log(PolygonScanAPI.data.result);
     for(let tx of PolygonScanAPI.data.result){
         if (tx.input == '0x') {
             // POLYGON TRANSFER
             PolygonTransfer.push({
                 from : root_address,
                 to : tx.to
             });
             AddressList.push({address: tx.to, hash:tx.hash, amount : Number(tx.value/ 10**18)+' MATIC'})
             //console.log(tx.to);
         }else if(tx.to == ContractAddress.Dai){
             try{
                 var data = abiDecoder.decodeMethod(tx.input);
                 if(data !== undefined){
                     DaiTransfer.push({
                         from : root_address,
                         to : data.params[0].value
                     });
                     AddressList.push({address:data.params[0].value, hash:tx.hash, amount :data.params[1].value / 10**6 +' DAI'})
                 }
             }catch(e){}
         }else if(tx.to == ContractAddress.Weth){
             try{
                 var data = abiDecoder.decodeMethod(tx.input);
                 if(data !== undefined){
                     WethTransfer.push({
                         from : root_address,
                         to : data.params[0].value
                     });
                     AddressList.push({address:data.params[0].value, hash:tx.hash, amount :data.params[1].value / 10**6 +' WETH'})
                 }
             }catch(e){}
         }else if(tx.to == ContractAddress.USDC){
             try{
                 var data = abiDecoder.decodeMethod(tx.input);
                 if(data !== undefined){
                     UsdcTransfer.push({
                         from : root_address,
                         to : data.params[0].value
                     });
                     AddressList.push({address:data.params[0].value, hash:tx.hash, amount :data.params[1].value / 10**6 +' USDC'})
                 }
             }catch(e){}
         }else if(tx.to == ContractAddress.Wmatic){
             try{
                 var data = abiDecoder.decodeMethod(tx.input);
                 if(data !== undefined){
                     WmaticTransfer.push({
                         from : root_address,
                         to : data.params[0].value
                     });
                     AddressList.push({address:data.params[0].value, hash:tx.hash, amount :data.params[1].value / 10**6 +' WMATIC'})
                 }
             }catch(e){}
         }else if(tx.to == ContractAddress.USDT){
             try{
                 var data = abiDecoder.decodeMethod(tx.input);
                 if(data !== undefined){
                     UsdtTransfer.push({
                         from : root_address,
                         to : data.params[0].value
                     });
                     AddressList.push({address:data.params[0].value, hash:tx.hash, amount :data.params[1].value / 10**6 +' USDT'})
                 }
             }catch(e){}
         }
         
     }
 
     const AddressFromApi = await Promise.all(AddressList);
     const FinalList = getUniqueListBy(AddressFromApi, 'address'); // Remove Duplicate
     function getUniqueListBy(arr, key) {
         return [...new Map(arr.map(item => [item[key], item])).values()]
     }
     
     console.log('Checking => '+root_address);
     if(FinalList.length > 1){
        fs.appendFileSync('suspectTrackPoly.txt', root_address+'\n');
     for(let finaladdress of FinalList){
         const Hop = await axios(`http://localhost:3000/airdrop/address/${finaladdress.address}`);
         if(Hop.data.data.hopUserTokens > 0)
         {
             //console.log(`[${root_address}](https://polygonscan.com/tx/${root_address})|[${Hop.data.data.address}](https://polygonscan.com/address/${Hop.data.data.address})|${finaladdress.amount}|[${finaladdress.hash}](https://polygonscan.com/tx/${finaladdress.hash})`);
             
             fs.appendFileSync('suspectTrackPoly.txt', `-] ${finaladdress.address}\n`);
         }
     }
    }
  }