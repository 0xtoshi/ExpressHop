const fs = require('fs');
const axios = require('axios');
const eligibleAddresses = fs.readFileSync('./listvictim.txt').toString().split("\n");
const starBlock = 17054115
const endBlock = 18254115
const apiKey = "PSSR1FYN6I8PDJ29UD2QJQWAUUSZGFT4PU"
eligibleAddresses.forEach(async(address) => {

    try{
    var getTx = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=${starBlock}&endblock=${endBlock}&page=1&sort=desc&apikey=${apiKey}`);    
    console.log(getTx)
    getTx.data.result.forEach(data => {
        var input_data = data.input;
        try{
        const decode_data = abiDecoder.decodeMethod(input_data);
        address = decode_data.params[0].value
        console.log(address)
        }catch(e){}
    });
    }catch(e){}
   


})

