#!/usr/bin/env node
console.clear();
console.log(
  `\n██╗  ██╗███████╗██╗     ██╗      ██████╗        ███╗   ██╗ ██████╗ ██████╗ ███████╗        ██╗███████╗`
);
console.log(
  `██║  ██║██╔════╝██║     ██║     ██╔═══██╗       ████╗  ██║██╔═══██╗██╔══██╗██╔════╝        ██║██╔════╝`
);
console.log(
  `███████║█████╗  ██║     ██║     ██║   ██║       ██╔██╗ ██║██║   ██║██║  ██║█████╗          ██║███████╗`
);
console.log(
  `██╔══██║██╔══╝  ██║     ██║     ██║   ██║       ██║╚██╗██║██║   ██║██║  ██║██╔══╝     ██   ██║╚════██║`
);
console.log(
  `██║  ██║███████╗███████╗███████╗╚██████╔╝▄█╗    ██║ ╚████║╚██████╔╝██████╔╝███████╗██╗╚█████╔╝███████║`
);
console.log(
  `╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝ ╚════╝ ╚══════╝\n`
);
setTimeout(function2, 3000);
function function2() {
  console.clear();
  console.log(`\nSee public holidays\n\n`);
  const readline = require("readline");
  const { getCode, getName } = require("country-list");
  const axios = require("axios").default;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Year ? ", function (YearInput) {
    rl.question("Country? ", function (CountryInput) {
        console.log(CountryInput);
      const { getCode, getName } = require("country-list");
      const axios = require("axios").default;

      // let ArgsInput = process.argv.slice(2);
      // let CountryInput = ArgsInput[0];
      // let YearInput = ArgsInput[1];
      let CountryCode = getCode(CountryInput);

      if (
        typeof CountryCode !== "undefined" &&
        CountryCode !== null &&
        YearInput.length < 5 &&
        YearInput != 0 &&
        !isNaN(YearInput)
      ) {
        let URLApi =
          "https://date.nager.at/api/v2/PublicHolidays/" +
          YearInput +
          "/" +
          CountryCode;

        axios
          .get(URLApi)
          .then(function (response) {
            Holidays(response.data);
            nbrHolidays = NbHolidays(response.data);
            console.log(
              ` \nDuring the year ` +
                YearInput +
                ` there are ` +
                nbrHolidays +
                ` holidays in ` +
                CountryInput +
                `.`
            );
          })
          .then(function () {
            rl.close();
            // always executed
          });
        function Holidays(jsonList) {
          jsonList.forEach((item, index) => {
            console.log(
              `${index + 1} : ${item.date} - ${item.name} (${item.localName})`
            );
          });
        }
        function NbHolidays(jsonList) {
          return jsonList.length;
        }
      } else {
        if (typeof CountryCode == "undefined" && CountryCode == null) {
          console.log("Country Name Invalid");
          rl.close();
        }
        if (YearInput.length > 4 || YearInput == 0 || isNaN(YearInput)) {
          console.log("Date Invalid must be between 1 and 9999");
          rl.close();
        }
      }
    });
  });

  rl.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
  });
}
