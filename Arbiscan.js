const axios = require('axios');
const root_address = "0x8e8e31cfb9298a432e24b7f94acf06bec8f5c887";
const api_key = "9CHH2H2TT9DQQDKQKJSBZB4PEI7PT8X85B";
var addressList = [];
var victimList = [];
var BlackListed = {
    Binance : "0xb38e8c17e38363af6ebdcb3dae12e0243582891d",
    Bridge : "0x80c67432656d59144ceff962e8faf8926599bcf8"

};

(async() => {
    const data = await axios(`https://api.arbiscan.io/api?module=account&action=txlist&address=${root_address}&startblock=0&endblock=99999999&page=1&offset=500&sort=DESC&apikey=${api_key}`);
    for(let tx of data.data.result){
        if (tx.input !== '0x') 
                continue;
        addressList.push(tx.to);
    }

    addressList.removeByValue(BlackListed.Binance);
    addressList.removeByValue(BlackListed.Bridge);
    var removeDuplicateAddress = new Set(addressList);
    
    for (let address of removeDuplicateAddress){
        const data = await axios(`https://api.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=500&sort=DESC&apikey=${api_key}`);
        for(let tx of data.data.result){
            if (tx.input !== '0x') 
                    continue;
            if(tx.to == BlackListed.Binance) break;
            if(tx.to == BlackListed.Bridge) break;
            victimList.push(tx.to);
        }

    }


    var ConcatList = addressList.concat(victimList)
    var FinalList = new Set(ConcatList);
    for(let finaladdress of FinalList){
        const Hop = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${finaladdress}`);
        if(Hop.data.data.hopUserTokens > 0)
        {
            console.log(Hop.data.data.address);
        }
    }


})()

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === val) {
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  }