const axios = require('axios');
var MultiSenderDecoder = require('abi-decoder');
const fs = require('fs');
const { set } = require('express/lib/application');
const MultiSenderABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"multisendToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
MultiSenderDecoder.addABI(MultiSenderABI);
const root_address = "0x335c0552eb130f3Dfbe6efcB4D2895aED1E9938b"; //taoba.eth
const MultiSenderContract = "0xc82ba627ba29fc4da2d3343e2f0a2d40119c2885";
const PolygonScanAPI = "F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT";
var addressList = [];
(async() => {

    const PolygonAPI = await axios(`https://api.polygonscan.com/api?module=account&action=txlist&address=${root_address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=DESC&apikey=${PolygonScanAPI}`)
    for(let result of PolygonAPI.data.result){
        if(result.to == MultiSenderContract)
        {
            var decodeMultiSender = MultiSenderDecoder.decodeMethod(result.input);
            //addressList = decodeMultiSender.params[1].value.concat(decodeMultiSender.params[1].value);
            //console.log();
            addressList.push(decodeMultiSender.params[1].value);
        }
    }

   const AddressFromPolygonAPI = await Promise.all(addressList);
   var ArrayList = [];
   for(let Address of AddressFromPolygonAPI)
   {
       for(let address of Address)
       {
           ArrayList.push(address);
       }
   }

   //console.log(ArrayList.length); //3938
   const FinalList = Array.from(new Set(await Promise.all(ArrayList))); // Remove Duplicate 1174 
   for(let finaladdress of FinalList){
    const Hop = await axios(`http://localhost:3000/airdrop/address/${finaladdress}`);
    if(Hop.data.data.hopUserTokens > 0)
    {
        console.log(Hop.data.data.address);
    }
}
   


})()
