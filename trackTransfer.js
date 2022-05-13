const axios = require('axios');
const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
var abiDecoder = require('abi-decoder');
abiDecoder.addABI(ABI);


(async () => {
   const data = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=0x2A11E5a7B8Fc43FF6f08C3E858Cc97D84E14316E&startblock=21795097&endblock=21799097&page=1&offset=20&sort=DESC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`);
   //console.log(data.data.result);
   data.data.result.forEach( async txs => {
 
    while(true){

  
        const address = await findNextTx(txs.input);
        const newTxs  = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=21795097&endblock=21799097&page=1&offset=20&sort=DESC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`);
        console.log(newTxs.data.to)
    }
    
   })

   async function findNextTx(input)
   {

    const decode_data = abiDecoder.decodeMethod(input);
    const newTxs  = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${decode_data.params[0].value}&startblock=21795097&endblock=21799097&page=1&offset=20&sort=DESC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`);
    return newTxs.data.to;
    
   }
})()