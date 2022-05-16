const fs = require('fs');
const axios = require('axios');
const ROOT_ADDRESS = "0x442d9257c6449367b48eebe0035ec69b321d4fed"; //Address Controllerd By 1 Person
(async () => {
    const CovalentAPI = await axios(`https://api.covalenthq.com/v1/137/address/${ROOT_ADDRESS}/transactions_v2/?key=ckey_2ff81c42792746f894a75bce3ba`); // Check Tx Outflow
    const TxList = CovalentAPI.data.data.items;
    console.log(TxList.length);
    TxList.forEach(async tx => {
        if(tx.from_address == ROOT_ADDRESS){

            const CovalentAPI2 = await axios(`https://api.covalenthq.com/v1/137/address/${tx.to_address}/transactions_v2/?key=ckey_2ff81c42792746f894a75bce3ba`); // Literation Tx Outflow From Main Address -> Secondary Address -> Eligible Address
            const TxList2 = CovalentAPI2.data.data.items;
            TxList2.forEach(async tx2 => {
                        const data = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${tx2.to_address}`); // Filter Only eligible Address
                       
                        if(Object.keys(data.data.data).length > 0)
                        {
                            //console.log(data.data.data.address); // All eligible has 36 Address

                            if(data.data.data.hopUserTokens > 0) // Exclude Liquidity Has 17
                            {
                                console.log(data.data.data.address);
                            }

                        }
            });
        }
    });

})()
