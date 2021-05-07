import csv from "csv-parser"
import fs from "fs"
import { LayoutOptions, LAYOUTS } from "./layout"

const layout: LayoutOptions["name"] =
  (process.argv[2] as LayoutOptions["name"]) || "manoonchai_v03"

const allowedChars: string = LAYOUTS[layout][2].join("")
const allowedCharsRegex = new RegExp(`^[${allowedChars}]+$`)
const wordsWithAllowedChars: string[] = []

fs.createReadStream("./data/tnc5000_withfreq.csv")
  .pipe(csv())
  .on("data", (data: any) => {
    let word = data.word

    if (word.length > 1 && allowedCharsRegex.test(word)) {
      wordsWithAllowedChars.push(word)
    }
  })
  .on("end", () => {
    console.log({
      layout,
      words: wordsWithAllowedChars,
      count: wordsWithAllowedChars.length,
    })
  })
