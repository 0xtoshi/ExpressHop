const axios = require('axios');
const fs = require('fs');
const RelayList = fs.readFileSync('./RelayList.txt').toString().split("\n");
const PolygonScanAddress = 'https://polygonscan.com/address/';
const PolygonScanTx = 'https://polygonscan.com/tx/';
console.log(`**Addrss**|**Amount**|**Date**|**TxHash**
:-----:|:-----:|:-----:|:-----:`);
(async() => {

    for(let address of RelayList)
    {
        var data = await axios(`https://api.polygonscan.com/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=ASC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`)
        var result = data.data.result;
        for(let res of result)
        {
            if(res.from == '0x1fdc5e69729eecf8e933c904e86faf7a8886f661')
            {
                console.log(`[${address}](${PolygonScanAddress}/${address})|${res.value / 10**18} MATIC|${new Date(res.timeStamp * 1000)}|[TX](${PolygonScanTx}/${res.hash})`)
            }
        }
    }

})();