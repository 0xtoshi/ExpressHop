const axios = require('axios');
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

  const ContractList = {
      MultiSend : "0xc82ba627ba29fc4da2d3343e2f0a2d40119c2885",
      BiuBiu : "0x58Fd5D6e69bECDADb2e8AaED9EF7EAc0508Db284",
      MultiSender : "0x491791611AeA5531e5bE9D9abecB428939bd26E3",
      Disperse : "0xD152f549545093347A162Dce210e7293f1452150",
      BulkSender : "0x458b14915e651243Acf89C05859a22d5Cff976A6"
  }

knex.select()
.from('addressesMetadataAllUsers')
.where('totalTxs', '<=', '3')


.then((result) => {
    result.forEach( async (data) => {
        try{
        const checkInternalTx = await axios(`https://api.polygonscan.com/api?module=account&action=txlistinternal&address=${data.address}&startblock=0&endblock=99999999&page=1&offset=50&sort=DESC&apikey=F3TTPZBVHEWA7ZS1QWG2RP8YWGHK1ABCWT`)

        if(checkInternalTx.data.result.length > 0 && checkInternalTx.data.status !== 0)
        {
            try{
          for(let i=0; i<checkInternalTx.data.result.length; i++)
            {
                
                if(checkInternalTx.data.result[i].from.toLowerCase() == ContractList.MultiSend.toLowerCase())
                {
                    console.log(checkInternalTx.data.result[i].hash);
                }else if((checkInternalTx.data.result[i].from.toLowerCase() == ContractList.BiuBiu.toLowerCase())){
                    console.log(checkInternalTx.data.result[i].hash);
                }else if((checkInternalTx.data.result[i].from.toLowerCase() == ContractList.MultiSender.toLowerCase())){
                    console.log(checkInternalTx.data.result[i].hash);
                }else if((checkInternalTx.data.result[i].from.toLowerCase() == ContractList.Disperse.toLowerCase())){
                    console.log(checkInternalTx.data.result[i].hash);
                }else if((checkInternalTx.data.result[i].from.toLowerCase() == ContractList.BulkSender.toLowerCase())){
                    console.log(checkInternalTx.data.result[i].hash);
                }
                
            }
        }catch(err)
        {

        }
            
            await sleep(300)
        }
    }catch(error)
    {
        
    }
    } )
})

const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};