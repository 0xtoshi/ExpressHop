const axios = require('axios');

(async() => {
    const PolygonScanAPIKey = 'F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT';
    const Address = '0x62B8196A0a0C5640BCDa55a5e8a3Dbb2A59D6d79';
    const data = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=99999999&page=1&offset=30&sort=DESC&apikey=${PolygonScanAPIKey}`);
    for(let i=0; i<data.data.result.length; i++)
    {
        if(data.data.result[i].to.toLowerCase() == Address.toLocaleLowerCase())
        {
            console.log(data.data.result[i].from);
            var isEligible = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${data.data.result[i].from}`);
            console.log(isEligible.data.data);
        }
    }
})()