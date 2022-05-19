const axios = require('axios');
const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
const abiDecoder = require('abi-decoder');
const fs = require('fs');
abiDecoder.addABI(ABI);
const endBlock = 5156630; //SNAPSHOT BLOCK
const root_address = "0xfe7c17f3b63817da3eb8c5867c2361f1b4e579f3";
const ContractAddress = {
    Dai : "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    Weth : "0x4200000000000000000000000000000000000006",
    USDC : "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    Wmatic : "0x81ddfac111913d3d5218dea999216323b7cd6356",
    USDT : "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
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
    for(let finaladdress of FinalList){
        const Hop = await axios(`http://localhost:3000/airdrop/address/${finaladdress.address}`);
        if(Hop.data.data.hopUserTokens > 0)
        {
            //console.log(`[${root_address}](https://polygonscan.com/tx/${root_address})|[${Hop.data.data.address}](https://polygonscan.com/address/${Hop.data.data.address})|${finaladdress.amount}|[${finaladdress.hash}](https://polygonscan.com/tx/${finaladdress.hash})`);
            console.log(finaladdress.address);
        }
    }
})()