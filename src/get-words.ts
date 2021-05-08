import csv from "csv-parser"
import fs from "fs"

const customCharSet = process.argv[2]
const requiredCharSet = process.argv[3]
const charsetRegex = new RegExp(`^[${customCharSet}]+$`)
const requiredRegex = new RegExp(requiredCharSet)
const wordset: string[] = []

fs.createReadStream("./data/tnc5000_withfreq.csv")
  .pipe(csv())
  .on("data", (data: any) => {
    let word = data.word

    if (word.length > 1) {
      if (charsetRegex.test(word)) {
        if (!requiredCharSet || requiredRegex.test(word)) {
          wordset.push(word)
        }
      }
    }
  })
  .on("end", () => {
    console.log(`Words : ${wordset.length}`)
    console.log(wordset.join(" "))
  })
