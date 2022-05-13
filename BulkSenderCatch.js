const axios = require('axios');
const fs = require('fs');

(async () => {

const totalTxs = 26771;
const paginated = totalTxs/400;
const datum = [];
for(let i=0; i<paginated; i++)
{
    console.log(i+1);
    const FetchPolygonScan = await axios(`https://api.etherscan.io/api?module=account&action=txlist&address=0xd1917932a7db6af687b523d5db5d7f5c2734763f&startblock=0&endblock=99999999&page=${i+1}&offset=400&sort=DESC&apikey=XNNCVCZ9GGWHCVXD4M9QDZXRTKVEA5NGR3`);
    if(FetchPolygonScan.data.result !== null) {
    FetchPolygonScan.data.result.forEach(data => {
        datum.push(data);
    })
    }

}

fs.writeFileSync('bulkdata.json', JSON.stringify(datum));

})()