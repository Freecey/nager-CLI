const { getCode } = require("country-list");
const axios = require("axios").default;

let ArgsInput = process.argv.slice(2);
let CountryInput = ArgsInput[0];
let YearInput = ArgsInput[1];

// console.log(CountryInput);

let CountryCode = getCode(CountryInput);
// console.log(CountryCode);

// let CurrentYear = new Date().getFullYear()
// console.log(YearInput);

let urlAPI ="https://date.nager.at/api/v2/PublicHolidays/"+YearInput+"/"+CountryCode;
// console.log(urlAPI);

axios.get(urlAPI)
.then(function (response) {
  let items = response.data;
  console.log(items);
  items.forEach((item, index) => {
    console.log(
      `${index + 1} : ${item.date} - ${item.name} (${item.localName})`
    );
  });
})
