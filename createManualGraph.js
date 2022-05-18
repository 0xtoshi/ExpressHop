const from_address = "0x4bb7754ba6c4652a57c48503862460c8a7f65300";
const address_list = [
    "0xb401ee5a676fc38b0e25c09591b48710f17aa24a",
    "0x3619866e154cb96c2e4ee72b7d1bbaa31ee77d86",
    "0xf4f4307968241b07d0878669c1acbfe89d17f1b0",
    "0x9e59e818952beda47d20d7eba36f97813c072f01",
    "0x091197e03e83dfde9ab8454407df7d44f99d3af8",
    "0xe66771f9139dc41121f08f8ae785a80bfae70982",
    "0x06c09efd404f9cb0e6fefd7be573516e0343f2f2",
    "0x937bf7cb5cd4014fdf513adb246a7c0ca369d0e5",
    "0x9eb6174405383dc833b9fc59c37e19b4b011b245"
];
var arrData = []

for(let address_to of address_list)
{
    arrData.push([from_address.substring(0, 8), address_to.substring(0, 8)])
}

console.log(arrData);