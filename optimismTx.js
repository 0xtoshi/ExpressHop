const axios = require('axios');
const fs = require('fs');
const root_address = "0xCa5397a48A67521Ff460181c4a170a928f116B54";
const api_key = "TPXJSIB9DQQN9S15NAHE2ADHU6WGN6GAZK";
var address = root_address;
(async() => {
    

while(true){
    console.log(address);
    var data = await axios(`https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=DESC&apikey=${api_key}`);
    if(!(data && data.data && data.data.status == '1')) {
        console.log(`Error fetching txs for ${useraddress} and ${network}`, data.data);
        return;
     }
     const txs = data.data.result;
     for (let tx of txs) {
        if (tx.input !== '0x') 
            continue;
        fs.appendFileSync("OptiTx.txt", `${tx.from}|${tx.to}|${tx.hash}|${tx.value}\n`)
        address = tx.to
    }
}

    //fs.writeFileSync("OptiTx.json", JSON.stringify(dataVis));
})()