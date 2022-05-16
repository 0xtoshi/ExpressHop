const axios = require('axios');
const fs = require('fs');
const root_address = "0xe1Ad4a3F64Df1C98Fea91AF310445bd0aeA6dec0";
const api_key = "6DX39A4VG5VX68T4N6GTSXQIH29W98GBIZ";
var addressList = [];
var victimList = [];
const dataNetwork = [];


(async() => {
    const data = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${root_address}&startblock=0&endblock=99999999&page=1&offset=500&sort=DESC&apikey=${api_key}`);
    for(let tx of data.data.result){
        if (tx.input !== '0x') 
                continue;
        addressList.push(tx.to);
    }

    var removeDuplicateAddress = new Set(addressList);
    
    for (let address of removeDuplicateAddress){
        const data = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=500&sort=DESC&apikey=${api_key}`);
        for(let tx of data.data.result){
            if (tx.input !== '0x') 
                    continue;
            victimList.push(tx.to);
            dataNetwork.push([
                tx.from, tx.to
            ])
        }
       /* const Hop = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${value}`);
        if(Hop.data.data.hopUserTokens > 0)
        {
            console.log(Hop.data.data.address);
        }
        */
    }
    fs.writeFileSync("network.json", JSON.stringify(dataNetwork));


    var ConcatList = addressList.concat(victimList)
    var FinalList = new Set(ConcatList);
    for(let finaladdress of FinalList){
        const Hop = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${finaladdress}`);
        if(Hop.data.data.totalTokens > 0)
        {
            console.log(Hop.data.data.address);
        }
    }

   
})()