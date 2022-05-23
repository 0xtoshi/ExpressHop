const axios = require('axios');
const fs = require('fs');
const RelayList = fs.readFileSync('./RelayList.txt').toString().split("\n");
const PolygonScanAddress = 'https://polygonscan.com/address';
const ConnextScan = 'https://connextscan.io/address';
const GnosisScan = 'https://blockscout.com/xdai/mainnet/address';
console.log(`**Address**|**Polygon Tx Count**|**Connext Tx Count|Gnosis Tx Count
:-----:|:-----:|:-----:|:-----:`);
(async() => {

    for(let address of RelayList)
    {
        var data = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=110&sort=ASC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`)
        var result = data.data.result;
        console.log(`${address}|[${result.length}](${PolygonScanAddress}/${address})|[CNX](${ConnextScan}/${address})|[${await getXdaiCount(address)}](${GnosisScan}/${address})`);
    }

    async function getXdaiCount(address)
    {
        var data = await axios(`https://blockscout.com/xdai/mainnet/api?module=account&action=txlist&address=${address}`)
        var result = data.data.result;
        return result.length;
    }

})();