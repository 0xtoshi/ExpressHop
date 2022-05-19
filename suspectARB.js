const axios = require('axios');
const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
const abiDecoder = require('abi-decoder');
const fs = require('fs');
abiDecoder.addABI(ABI);
const endBlock = 9002316; //SNAPSHOT BLOCK
const root_address = "0x5767795b4efbf06a40cb36181ac08f47cdb0fcec";
const ContractAddress = {
    Dai : "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    Weth : "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    USDC : "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    Wmatic : "0x561877b6b3dd7651313794e5f2894b2f18be0766",
    USDT : "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
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

    const PolygonScanAPI = await axios(`https://api.arbiscan.io/api?module=account&action=txlist&address=${root_address}&startblock=0&endblock=${endBlock}&page=1&offset=1000&sort=DESC&apikey=9CHH2H2TT9DQQDKQKJSBZB4PEI7PT8X85B`);
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