const express = require('express')
const app = express()
const port = 3000

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

app.get('/', (req, res) => {
  res.send(Airdrop.FindAddress())
})

app.get('/airdrop/address/:address', (req, res) => {
    const address = req.params.address; 
    knex.select()
    .from('addressesMetadataAllUsers')
    .join('finalDistribution', 'addressesMetadataAllUsers.address','finalDistribution.address')
    .where('addressesMetadataAllUsers.address', address)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send('Error');
    });
    //res.send(sql);

})

app.get('/airdrop/totalTxs/:count', (req,res) => {
    const count = req.params.count; 
    knex.select()
    .from('addressesMetadataAllUsers')
    .where('totalTxs', count)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send('Error');
        console.log(err);
    });
})

app.get('/airdrop/totalTxs/:count/Volume/:min/:max', (req,res) => {
    const count = req.params.count; 
    const maxVol = req.params.max; 
    const minVol = req.params.min; 
    knex.select()
    .from('addressesMetadataAllUsers')
    .where('totalTxs', count)
    .where('totalVolume','>=', minVol)
    .where('totalVolume','<', maxVol)
    .orderBy('totalVolume','ASC')
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send('Error');
        console.log(err);
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})