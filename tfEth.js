const axios = require("axios");
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'hop'
    }
  });
(async() => {

    knex.select('address').from('eligibleAddresses').then(async result => {
       for(let address of result){
           await getAndInsert(address.address);
       }
    })
    

    async function getAndInsert(address)
    {
        var dataInsert = {address_from : address};
        const Optimism = await axios({
            url: 'https://gateway.thegraph.com/api/bd5bd4881b83e6c2c93d8dc80c9105ba/subgraphs/id/Cjv3tykF4wnd6m9TRmQV7weiLjizDnhyt6x2tTJB42Cy',
            method: 'post',
            data: {
              query: `
              query TransferSentToL2($perPage: Int, $startTime: Int, $endTime: Int, $skip: Int, $transferId: String, $account: String) {
                transferSents: transferSentToL2S(where: {from: $account}, first: $perPage, orderBy: timestamp, orderDirection: desc) {
                  id
                  destinationChainId
                  amount
                  amountOutMin
                  
                  relayerFee
                  recipient
                  deadline
                  transactionHash
                  timestamp
                  token
                }
              }
                `,
                variables: {
                  account: address,
                  perPage : 100
                }
            }
          })
          
          for(let data of Optimism.data.data.transferSents)
          {
              
             var datane = {
                 address_from : address,
                 id : data.id,
                 transferId : data.transferId,
                 destinationChainId : data.destinationChainId,
                 amount : data.amount,
                 amountOutMin : data.amountOutMin,
                 bonderFee : data.bonderFee,
                 recipient : data.recipient,
                 deadline : data.deadline,
                 transactionHash : data.transactionHash,
                 timestamp : data.timestamp,
                 token : data.token
             }
              
              knex('transferSentETH').insert(datane).then(result => {console.log('DONE')})
          }
    }

})()