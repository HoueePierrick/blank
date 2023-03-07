import excelToJson from "convert-excel-to-json";
import fs from "fs";
import todayTomorrow from "./Helpers/tomorrow.js";
import sleep from "./Helpers/sleep.js";

async function excelParser() {
  const { today, tomorrow } = todayTomorrow(new Date());

  const fullData: any = excelToJson({
    source: fs.readFileSync("./Saisie.xlsx"),
  });

  const sheetNames = Object.keys(fullData);
  // console.log(sheetNames);

  fs.mkdir(
    `./Results/${today.Year}-${today.Month}-${today.Date}`,
    { recursive: true },
    (err) => {
      console.log(err);
    }
  );
  await sleep(1000);
  fs.mkdir(
    `./Results/${today.Year}-${today.Month}-${today.Date}/first-thousand`,
    { recursive: true },
    (err) => {
      console.log(err);
    }
  );
  await sleep(1000);
  fs.mkdir(
    `./Results/${today.Year}-${today.Month}-${today.Date}/full`,
    { recursive: true },
    (err) => {
      console.log(err);
    }
  );
  console.log("Folders created");

  for (let i = 0; i < sheetNames.length; i++) {
    // console.log(sheetNames[i]);
    const data = excelToJson({
      sourceFile: "./Saisie.xlsx",
      header: {
        rows: 1,
      },
      sheets: [sheetNames[i]],
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });
    const firstThousand = data[sheetNames[i]].slice(0, 1000);

    const shortResult: any = JSON.stringify(firstThousand);
    const longResult: any = JSON.stringify(data);
    fs.writeFileSync(
      `./Results/${today.Year}-${today.Month}-${today.Date}/first-thousand/${sheetNames[i]}-first-thousand.json`,
      shortResult
    );
    await sleep(1000);
    console.log(`${sheetNames[i]}: short file created`);
    fs.writeFileSync(
      `./Results/${today.Year}-${today.Month}-${today.Date}/full/${sheetNames[i]}-full.json`,
      longResult
    );
    await sleep(1000);
    console.log(`${sheetNames[i]}: long file created`);
  }
}

excelParser();
