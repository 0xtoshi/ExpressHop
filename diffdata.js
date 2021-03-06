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

  var addressList = [
    '0x6cc624d5cbbc464bbea163af65703a8ba0ae584e',
    '0xbaa79a8a6c18522a858f4f4e82f68935e031408f',
    '0x36dae44dacafcf50b653d91169691d4b39406d4a',
    '0x4afa193be36adf448ec5325c7e4f0465710bf9f3',
    '0x2b63db9f388cd88aa887f7b562d6d3485449d251',
    '0x45bf11f69797d674ca77302ca23fe5dc3a298ed3',
    '0x9bd1889511b05449b989884da02ceedbbf343d1c',
    '0xbfded7150631ea1ac1ec0644e45c10fbb274b6c1',
    '0x3482ec9ededfb00f1a759debbe0e2c9956c2e6f7',
    '0xa320e783a814701eccaac60ad5df29c1c70ade31',
    '0xb901e86b633fb4b3bfc729c52f19f88a99d3503b',
    '0xda90c74fb124a90d6224af844eb576cdc78cca78',
    '0xd4ee43de3629d5c49f6b8fd83e6017b17b7963d7',
    '0x0e7cf9c50096e97eb8f89040090c6ff50afa2f4c',
    '0x9bd1889511b05449b989884da02ceedbbf343d1c',
    '0xcc447c446b78712b609474f429afddbdec197e36',
    '0xba570f26c1f3d94cfe82e667baac5cb067824c35',
    '0x2b63db9f388cd88aa887f7b562d6d3485449d251',
    '0xa8461c28fef6ba4bdb772ed4e14efe1abe64a234',
    '0x4afa193be36adf448ec5325c7e4f0465710bf9f3',
    '0x68fad75ae7b04859c602fc27037fa85508977b3f',
    '0xbaa79a8a6c18522a858f4f4e82f68935e031408f',
    '0xfbb91f86482077e06aaccf2363a31beea30ca4c0',
    '0x2377a7f7178fea742de0bc023e424183511abe14',
    '0x45bf11f69797d674ca77302ca23fe5dc3a298ed3',
    '0xd14cfde8ad437de9f7613fcd1355d78543e5a496',
    '0xcd6dd7d6df6520afb26b2e84db84fb0705c24148',
    '0xe78221977739af821f584271697a80f3df5e3a51',
    '0x8d6b5da5d11593bab12895cd246629e8dbfc5a2b',
    '0xd875a7d9998b24796d4885ecd4878be2709d65e6'
  ];

  console.log(`accountAddress|recipientAddress|From|To|Amount(Usd)|TxHash
  :-----:|:-----:|:-----:|:-----:|:-----:|:-----:`);
  (async() => {
      for(let address of addressList)
      {
          var SQL = await knex.select()
          .from('HopTx')
          .where('accountAddress', address)
          for(let data of SQL)
          {
              if(data.accountAddress !== data.recipientAddress)
              {
                  console.log(`[${data.accountAddress}](${data.accountAddressExplorerUrl})|[${data.recipientAddress}](${data.recipientAddressExplorerUrl})|${data.sourceChainSlug}|${data.destinationChainSlug}|${data.amountUsdDisplay}|[Tx](${data.transactionHashExplorerUrl})`)
              }
          }
      }
  })()