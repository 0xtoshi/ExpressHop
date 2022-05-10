const fs = require('fs');
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

  const eligible = fs.readFileSync('./eligible.txt').toString().split("\n");

//  console.log(eligible);

  for(let i=0; i<eligible.length; i++)
  {
    knex.select()
    .from('addressesMetadataAllUsers')
    .where('addressesMetadataAllUsers.address', eligible[i])
    .then((result) => {
        //console.log(result[0].address);
        if(result[0]){
            console.log();
        }else{
            console.log(eligible[i]);
        }
    }).catch((err) => {
        console.log(eligible[i]);
    });
  }