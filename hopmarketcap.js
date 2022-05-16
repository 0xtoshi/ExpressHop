const total_supply = 10**9;
const initial_supply = Number(total_supply* 8/100);

const compare = {
    Paraswap : (Number(2) * Number(10**9)) * 7.5/100 * 2,
    Uniswap : (Number(10**9) * 15/100) * 2.5,
    oneinch : (Number(1.5) * Number(10**9)) * 16/100 * 2,
}
for(let i=0; i<10; i++)
{   
    var price = Number(i+1);
    var marketCap = (initial_supply * price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      console.log(marketCap);
}

console.log(compare.oneinch);