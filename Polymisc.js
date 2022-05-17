const axios = require('axios');
const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
const abiDecoder = require('abi-decoder');
const fs = require('fs');
abiDecoder.addABI(ABI);
const root_address = "0xe1Ad4a3F64Df1C98Fea91AF310445bd0aeA6dec0";
const ContractAddress = {
    Dai : "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    Weth : "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    USDC : "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    Wmatic : "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    USDT : "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
}

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
            AddressList.push(tx.to)
            //console.log(tx.to);
        }else if(tx.to == ContractAddress.Dai){
            try{
                var data = abiDecoder.decodeMethod(tx.input);
                if(data !== undefined){
                    DaiTransfer.push({
                        from : root_address,
                        to : data.params[0].value
                    });
                    AddressList.push(data.params[0].value)
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
                    AddressList.push(data.params[0].value)
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
                    AddressList.push(data.params[0].value)
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
                    AddressList.push(data.params[0].value)
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
                    AddressList.push(data.params[0].value)
                }
            }catch(e){}
        }
        
    }

    const AddressFromApi = await Promise.all(AddressList);
    const FinalList = Array.from(new Set(await Promise.all(AddressFromApi))); // Remove Duplicate
    //console.log(FinalList);
    for(let finaladdress of FinalList){
        const Hop = await axios(`http://localhost:3000/airdrop/address/${finaladdress}`);
        if(Hop.data.data.hopUserTokens > 0)
        {
            console.log(Hop.data.data.address);
        }
    }
})()