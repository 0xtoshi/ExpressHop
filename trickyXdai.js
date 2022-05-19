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
            url: 'https://api.thegraph.com/subgraphs/name/hop-protocol/hop-xdai',
            method: 'post',
            data: {
              query: `
              query TransferSents($perPage: Int, $startTime: Int, $endTime: Int, $skip: Int, $transferId: String, $account: String) {
                transferSents(where: {timestamp_gte: $startTime, timestamp_lte: $endTime}, first: $perPage, orderBy: timestamp, orderDirection: desc, skip: $skip) {
                  id
                  from
                  transferId
                  destinationChainId
                  amount
                  amountOutMin
                  bonderFee
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
              try{
              knex('transferSentXDAI').insert(datane).then(result => {})
              }catch(err){console.log('Error Maybe Duplicated!')}
          }
          
    }
})()