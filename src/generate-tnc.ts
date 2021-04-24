import csv from "csv-parser";
import fs from "fs";
import { eachCons } from "./utils";

const triads: Record<string, number> = {};

let count = 0;
fs.createReadStream("./data/tnc5000_withfreq.csv")
  .pipe(csv())
  .on("data", (data: any) => {
    const wordFreq = +data.freq;
    let word = data.word;

    console.log(count++, word, wordFreq);

    if (word.length == 2) {
      word = word + " ";
    }

    if (word.length >= 3) {
      eachCons(word, 3).forEach((triad) => {
        if (triad.length == 3 && !triad.match(/[0-9]/)) {
          triads[triad] ||= 0;
          triads[triad] += wordFreq;
        }
      });
    }
  })
  .on("end", () => {
    const sortedTriads = Object.fromEntries(
      Object.entries(triads)
        .sort(([, a], [, b]) => a - b)
        .reverse()
    );

    fs.writeFileSync(
      "./data/thai5k-freq.json",
      JSON.stringify(sortedTriads, null, 2)
    );
  });
