import csv from "csv-parser"
import fs from "fs"

const charsets = {
  "home-basic": "งเรนา่้ว",
  "home-row": "งเรนมอา่้วื",
  "upper-basic": "ใตหลักิบ",
  "upper-row": "ใตหลสปักิบ็",
  "upper-full": "ใตหลสปักิบ็ฬฯ",
  "lower-basic": "ุไทยีดะู",
  "lower-row": "ุไทยจคีดะู",
}

const wordsets: Record<string, string[]> = {}

fs.createReadStream("./data/tnc5000_withfreq.csv")
  .pipe(csv())
  .on("data", (data: any) => {
    let word = data.word

    if (word.length > 1) {
      Object.entries(charsets).forEach(([set, chars]) => {
        wordsets[set] ||= []

        if (new RegExp(`^[${chars}]+$`).test(word)) {
          wordsets[set].push(word)
        }
      })
    }
  })
  .on("end", () => {
    const stream = fs.createWriteStream("training.txt", { flags: "w" })

    Object.entries(wordsets).forEach(([set, words]) => {
      stream.write(`${set} (${words.length}) :\n`)
      stream.write(`${words.sort().join(" ")}\n\n`)
    })
  })
