const axios = require('axios');
const root_address = "0x2A11E5a7B8Fc43FF6f08C3E858Cc97D84E14316E";
const apiKey = "F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT";
var address = root_address;
const ABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}]
var abiDecoder = require('abi-decoder');
const starBlock = 21795097;
const endBlock = 21998761;
abiDecoder.addABI(ABI);
(async() => {
    while(true){
       try{
        var getTx = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=${starBlock}&endblock=${endBlock}&page=1&sort=desc&apikey=${apiKey}`);
       // console.log(getTx.data.result[1])
        
        getTx.data.result.forEach(data => {
            var input_data = data.input;
            try{
            const decode_data = abiDecoder.decodeMethod(input_data);
            //console.log(decode_data);
            address = decode_data.params[0].value
            console.log(address)
            }catch(e){}
        });
       
       }catch(e){
        break;
       }
    }
})()

