const axios = require('axios');
const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
const abiDecoder = require('abi-decoder');
const fs = require('fs');
abiDecoder.addABI(ABI);
const root_address = "0xa11e04460ec463211503a11ddb93a6248b174063";
const ContractAddress = {
    Dai : "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    Weth : "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    USDC : "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    Wmatic : "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    USDT : "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
}
console.log(`**AddressFrom**|**Recipient**|**Amount**|**TxHash**
:-----:|:-----:|:-----:|:-----:`);
var PolygonTransfer = [];
var WethTransfer = [];
var UsdcTransfer = [];
var WmaticTransfer = [];
var UsdtTransfer = [];
var DaiTransfer = [];
var AddressList = [];

(async() =>{

    const PolygonScanAPI = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${root_address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=DESC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`);
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
    var arrData = []
    var value = []
    for(let finaladdress of FinalList){
        const Hop = await axios(`http://localhost:3000/airdrop/address/${finaladdress.address}`);
        if(Hop.data.data.hopUserTokens > 0)
        {

            arrData.push([root_address.substring(0, 8), Hop.data.data.address.substring(0, 8)])
  
        }
    }
    console.log(arrData);
    //console.log(value);
})()