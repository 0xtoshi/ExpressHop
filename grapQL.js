const axios = require('axios');

(async() => {
    const data = await axios({
        url: "https://api.thegraph.com/subgraphs/name/hop-protocol/hop-polygon/graphql",
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query TransferSents($perPage: Int, $startTime: Int, $endTime: Int, $skip: Int, $transferId: String, $account: String) {
            transferSents(where: {from: $account}, first: $perPage, orderBy: timestamp, orderDirection: desc, skip: $skip) {
              id
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
            account: '0x6078f0da0fd82af07286bc782f2427b2cf4607bc',
            perPage: 100,
          }
        }
      });
      console.log(data.data);
})()