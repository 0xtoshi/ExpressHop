const axios = require("axios")
const root_address = '0x93c09dF744060d5C61E994F573F39B114626631F';
const chainId = 10; // optimism
const apiKey = "ckey_2ff81c42792746f894a75bce3ba";
(async() => {
    const TxList = await axios(`https://api.covalenthq.com/v1/${chainId}/address/${root_address}/transactions_v2/?key=${apiKey}`);
    const data = TxList.data.data.items;
    data.forEach(async (result) =>{
        const Hop = await axios(`https://airdrop-api.hop.exchange/v1/airdrop/${result.from_address}`); // Filter Only eligible Address
            console.log(Hop.data.data)
            if(Object.keys(Hop.data.data).length > 0){
                //console.log(Hop.data.data.address); // All eligible has 36 Address
                if(Hop.data.data.hopUserTokens > 0) // Exclude Liquidity Has 17
                {
                    console.log(Hop.data.data.address);
                }

            }
    })
})()