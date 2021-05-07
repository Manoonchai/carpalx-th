import csv from "csv-parser"
import fs from "fs"

const charsets = {
  "home-basic": "งเรนา่้ว",
  "home-basic-shift": "งเรนา่้วษถแชำขโภ",
  "home-row": "งเรนมอา่้วื",
  "home-row-shift": 'งเรนมอา่้วืษถแชพผำขโภ"',
  "upper-basic": "ใตหลักิบ",
  "upper-basic-shift": "ใตหลักิบฒฏซญึธฐฎ",
  "upper-row": "ใตหลสปักิบ็ฬฯ",
  "upper-row-shift": "ใตหลสปักิบ็ฬฯฒฏซญฟฉึธฐฎฆฑฌ",
  "lower-basic": "ุไทยีดะู",
  "lower-basic-shift": "ุไทยีดะูฤฝๆณ์ศฮ?",
  "lower-row": "ุไทยจคีดะู",
  "lower-row-shift": "ุไทยจคีดะูฤฝๆณ๊๋์ศฮ?",
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
