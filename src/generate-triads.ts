import csv from "csv-parser";
import fs from "fs";
import { extractTriads } from "./utils";

const triads = {};

let count = 0;
fs.createReadStream("/tmp/thaisum_dataset.csv")
  .pipe(csv())
  .on("data", (data: any) => {
    console.log(count++);
    extractTriads(triads, data.title);
    extractTriads(triads, data.body);
    extractTriads(triads, data.summary);
  })
  .on("end", () => {
    console.log(triads);

    fs.writeFileSync("./triads-data.json", JSON.stringify(triads, null, 2));
  });
