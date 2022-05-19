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
const endBlock = 9002316; //SNAPSHOT BLOCK
const ContractAddress = {
    Dai : "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    Weth : "0x4200000000000000000000000000000000000006",
    USDC : "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    Wmatic : "0x81ddfac111913d3d5218dea999216323b7cd6356",
    USDT : "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
}

const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
const abiDecoder = require('abi-decoder');
abiDecoder.addABI(ABI);

  knex.select().from('eligibleAddresses')
  .join('transferSentPOLY', 'eligibleAddresses.address','transferSentPOLY.address_from')
  .then(async result => {

      for(let data of result)
      {
          if(data.address_from !== data.recipient )
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
    const PolygonScanAPI = await axios(`https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=${root_address}&startblock=0&endblock=${endBlock}&page=1&offset=1000&sort=DESC&apikey=TPXJSIB9DQQN9S15NAHE2ADHU6WGN6GAZK`);
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
        fs.appendFileSync('suspectTrackOP.txt', root_address+'\n');
     for(let finaladdress of FinalList){
         const Hop = await axios(`http://localhost:3000/airdrop/address/${finaladdress.address}`);
         if(Hop.data.data.hopUserTokens > 0)
         {
             //console.log(`[${root_address}](https://polygonscan.com/tx/${root_address})|[${Hop.data.data.address}](https://polygonscan.com/address/${Hop.data.data.address})|${finaladdress.amount}|[${finaladdress.hash}](https://polygonscan.com/tx/${finaladdress.hash})`);
             
             fs.appendFileSync('suspectTrackOP.txt', `-] ${finaladdress.address}\n`);
         }
     }
    }
  }