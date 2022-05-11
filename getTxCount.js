const Web3 = require('web3');
const web3 = new Web3('http://13.229.135.196:8545');
const fs = require('fs');

const data = fs.readFileSync('./ether.json', 'utf-8');
const walletList = JSON.parse(data);


for(let i=0; i<walletList.length; i++)
{

    web3.eth.getTransactionCount(walletList[i].address, (err, result) =>{
        if(result <= 5){
            console.log(walletList[i].address);
        }
    })
    
}