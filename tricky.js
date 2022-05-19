const axios = require('axios');
const starTimestamp = 1633066189;
const endTimestamp = Math.floor(new Date() / 1000);
let divide = 365;
let timeStampMin = Number(endTimestamp- starTimestamp);
let split = Math.floor(Number(timeStampMin) / divide);
var timestampSplit = starTimestamp;
var i= 1;
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

    while(true){

        await getAndInsert(timestampSplit+1, timestampSplit+split)
        //console.log(`Process ${i++}`);
        timestampSplit = timestampSplit+ split;
        if(i++ == divide) break;
    }

    async function getAndInsert(startTime, endTime)
    {
        const GraphQL = await axios({
            url: 'https://gateway.thegraph.com/api/bd5bd4881b83e6c2c93d8dc80c9105ba/subgraphs/id/Cjv3tykF4wnd6m9TRmQV7weiLjizDnhyt6x2tTJB42Cy',
            method: 'post',
            data: {
              query: `
              query TransferSentToL2($perPage: Int, $startTime: Int, $endTime: Int, $skip: Int, $transferId: String, $account: String) {
                transferSents: transferSentToL2S( where: {timestamp_gte: $startTime, timestamp_lte: $endTime}, first: $perPage, orderBy: timestamp, orderDirection: asc) {
                  id
                  destinationChainId
                  amount
                  amountOutMin
                  from
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
                  startTime : startTime,
                  endTime: endTime,
                  perPage : 1000
                }
            }
          })
          console.log(`Done Insert From ${new Date(startTime *1000)} To ${new Date(endTime *1000)}`)
          for(let data of GraphQL.data.data.transferSents)
          {
              
             var datane = {
                 address_from : data.from,
                 id : data.id,
                 destinationChainId : data.destinationChainId,
                 amount : data.amount,
                 amountOutMin : data.amountOutMin,
                 recipient : data.recipient,
                 deadline : data.deadline,
                 transactionHash : data.transactionHash,
                 timestamp : data.timestamp,
                 token : data.token
             }
              try{
              knex('transferSentETH').insert(datane).then(result => {})
              }catch(error){console.log('Error Maybe Duplicated')}
          }
          
    }
})()


