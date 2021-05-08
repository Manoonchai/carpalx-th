import csv from "csv-parser"
import fs from "fs"

interface ILesson {
  name: string
  newChars: string[]
  newWords?: string[]
  chars?: string[]
  words?: string[]
  wordset?: string
  newWordset?: string
  wordCount?: number
  newWordCount?: number
}

// Manoonchai v0.3 lessons
const NAME_PREFIX = "Manoonchai v0.3"
const lessons: ILesson[] = [
  // Home
  { name: "Home 01 - นิ้วชี้", newChars: ["น", "ม", "อ", "า"] },
  { name: "Home 02 - ร", newChars: ["ร"] },
  { name: "Home 03 - สระเอ", newChars: ["เ"] },
  { name: "Home 04 - ง", newChars: ["ง"] },
  { name: "Home 05 - ไม้เอก", newChars: ["่"] },
  { name: "Home 06 - ไม้โท", newChars: ["้"] },
  { name: "Home 07 - ว", newChars: ["ว"] },
  { name: "Home 08 - สระอือ", newChars: ["ื"] },

  // Pointing Finger
  { name: "Pointing 01 - นิ้วชี้แถวล่าง - ย", newChars: ["ย"] },
  { name: "Pointing 02 - นิ้วชี้แถวล่าง - สระอี", newChars: ["ี"] },
  { name: "Pointing 03 - นิ้วชี้แถวบน - ล", newChars: ["ล"] },
  { name: "Pointing 04 - นิ้วชี้แถวบน - ไม้หันอากาศ", newChars: ["ั"] },

  // Middle Finger
  { name: "Middle 01 - นิ้วกลางแถวล่าง - ท", newChars: ["ท"] },
  { name: "Middle 02 - นิ้วกลางแถวล่าง - ด", newChars: ["ด"] },
  { name: "Middle 03 - นิ้วกลางแถวบน - ห", newChars: ["ห"] },
  { name: "Middle 04 - นิ้วกลางแถวบน - ก", newChars: ["ก"] },

  // Ring Finger
  { name: "Ring 01 - นิ้วนางแถวล่าง - สระไอ", newChars: ["ไ"] },
  { name: "Ring 02 - นิ้วนางแถวล่าง - สระอะ", newChars: ["ะ"] },
  { name: "Ring 03 - นิ้วนางแถวบน - ต", newChars: ["ต"] },
  { name: "Ring 04 - นิ้วนางแถวบน - สระอิ", newChars: ["ิ"] },

  // Little Finger
  { name: "Little 01 - นิ้วก้อยแถวล่าง - สระอุ", newChars: ["ุ"] },
  { name: "Little 02 - นิ้วก้อยแถวล่าง - สระอู", newChars: ["ู"] },
  { name: "Little 03 - นิ้วก้อยแถวบน - สระใอ", newChars: ["ใ"] },
  { name: "Little 04 - นิ้วก้อยแถวบน - บ", newChars: ["บ"] },
  { name: "Little 05 - นิ้วก้อยแถวบน - ไม้ไต่คู้", newChars: ["็"] },

  // Pointing Finger (2)
  { name: "Pointing 05 - นิ้วชี้แถวล่าง - จ", newChars: ["จ"] },
  { name: "Pointing 06 - นิ้วชี้แถวล่าง - ค", newChars: ["ค"] },
  { name: "Pointing 07 - นิ้วชี้แถวบน - ส", newChars: ["ส"] },
  { name: "Pointing 08 - นิ้วชี้แถวบน - ป", newChars: ["ป"] },
]

const totalChars: string[] = []

lessons.forEach((lesson, idx) => {
  lesson.name = `${NAME_PREFIX} [${(idx + 1).toString().padStart(3, "0")}] ${
    lesson.name
  }`
  totalChars.push(...lesson.newChars)
  lesson.chars = Object.assign([], totalChars)
})

// ["ใ", "ต", "ห", "ล", "ส", "ป", "ั", "ก", "ิ", "บ", "็", "ฬ", "ฯ"],
// ["ง", "เ", "ร", "น", "ม", "อ", "า", "่", "้", "ว", "ื"],
// ["ุ", "ไ", "ท", "ย", "จ", "ค", "ี", "ด", "ะ", "ู"],

// ["ฒ", "ฏ", "ซ", "ญ", "ฟ", "ฉ", "ึ", "ธ", "ฐ", "ฎ", "ฆ", "ฑ", "ฌ"],
// ["ษ", "ถ", "แ", "ช", "พ", "ผ", "ำ", "ข", "โ", "ภ", '"'],
// ["ฤ", "ฝ", "ๆ", "ณ", "๊", "๋", "์", "ศ", "ฮ", "?"],

fs.createReadStream("./data/tnc5000_withfreq.csv")
  .pipe(csv())
  .on("data", (data: any) => {
    let word = data.word

    if (word.length > 1) {
      lessons.forEach((lesson) => {
        lesson.chars ||= []
        lesson.words ||= []
        lesson.newWords ||= []

        const newCharRegex = new RegExp(`[${lesson.newChars.join("")}]`)
        const charsetRegex = new RegExp(`^[${lesson.chars.join("")}]+$`)

        if (charsetRegex.test(word)) {
          if (newCharRegex.test(word)) {
            lesson.newWords.push(word)
          }

          lesson.words.push(word)

          lesson.newWordset = lesson.newWords.join(" ")
          lesson.wordset = lesson.words.join(" ")

          lesson.newWordCount = lesson.newWords.length
          lesson.wordCount = lesson.words.length
        }
      })
    }
  })
  .on("end", () => {
    lessons.forEach((lesson, i) => {
      console.log(`Lesson ${i + 1} : ${lesson.name}`)
      console.log({ lesson })
    })

    // Also generate lessons for Manoontype
    lessons.forEach((lesson, idx) => {
      const defaultLesson = {
        name: "",
        leftToRight: true,
        words: [],
      }

      const newLesson = Object.assign({}, defaultLesson, {
        name: `${lesson.name} [+${lesson.newWords?.length}w]`,
        words: lesson.newWords,
      })
      const accLesson = Object.assign({}, defaultLesson, {
        name: `${lesson.name} [${lesson.words?.length}w]`,
        words: lesson.words,
      })

      // Ignore first lesson
      if (idx !== 0) {
        fs.writeFileSync(
          `./data/manoontype/${newLesson.name}.json`,
          JSON.stringify(newLesson, null, 2)
        )
      }

      fs.writeFileSync(
        `./data/manoontype/${accLesson.name}.json`,
        JSON.stringify(accLesson, null, 2)
      )
    })

    // Copy to static/languages/_list.json
    const defaultList = [
      "-------------To be continued-------------",
      "thai_manoonchai_home_row",
      "thai_manoonchai_home_row_shift",
      "thai_manoonchai_upper_basic",
      "thai_manoonchai_upper_basic_shift",
      "thai_manoonchai_upper_row",
      "thai_manoonchai_upper_row_shift",
      "thai_manoonchai_lower_basic",
      "thai_manoonchai_lower_basic_shift",
      "thai_manoonchai_lower_row",
      "thai_manoonchai_lower_row_shift",
      "thai_300",
      "thai",
      "english",
    ]
    fs.writeFileSync(
      "./data/manoontype/_list.json",
      JSON.stringify(
        [
          ...lessons.flatMap((lesson) => [
            `${lesson.name} [+${lesson.newWords?.length}w]`,
            `${lesson.name} [${lesson.words?.length}w]`,
          ]),
          ...defaultList,
        ].slice(1), // Remove first lesson
        null,
        2
      )
    )

    console.log(
      "Files written to data/manoonchai, copy them to manoontype to apply changes"
    )
  })
