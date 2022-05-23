
const starTimestamp = 1623888000;
const endTimestamp = Math.floor(new Date() / 1000);
let split = 86400;
var timestampSplit = starTimestamp;

(async() => {


while(true){

    console.log(timestampSplit, timestampSplit+split)
    //console.log(`Process ${i++}`);
    //shell.exec('ts-node src/cli.ts --transfers');

    timestampSplit = timestampSplit+ split;
    if(timestampSplit >= endTimestamp) break;
}

async function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

})()