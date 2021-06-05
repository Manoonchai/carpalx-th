import csv from "csv-parser"
import fs from "fs"

const wordsets: Record<string, string[]> = {
  shorts: [],
}

const regExp = new RegExp(`^[ก-๛]+$`)

fs.createReadStream("/Users/narze/Downloads/tncwordfreq-201712.csv")
  .pipe(csv())
  .on("data", (data: any) => {
    let word = data.Word
    let freq = Number(data.Freq)

    if (
      word.length > 1 &&
      word.length <= 5 &&
      freq >= 1000 &&
      regExp.test(word)
    ) {
      wordsets["shorts"].push(word)
    }
  })
  .on("end", () => {
    const stream = fs.createWriteStream("out/training_shorts.txt", {
      flags: "w",
    })

    Object.entries(wordsets).forEach(([set, words]) => {
      stream.write(`${set} (${words.length}) :\n`)
      stream.write(`${words.sort().join(" ")}\n\n`)
    })
  })
