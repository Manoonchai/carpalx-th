import fs from "fs"

import Carpalx, { Triads } from "./carpalx"
import { ILayout, Layout, LayoutOptions } from "./layout"

import tnc5k from "../data/thai5k-freq.json"
import { wisesight } from "../data/wisesight"
import { wongnai } from "../data/wongnai"
// import thaisumTestset from "../data/thaisum-testset.json"
import thaisum from "../data/thaisum-full.json"

const layoutName = (process.argv[2] as LayoutOptions["name"]) || "kedmanee"
const outputFile = process.argv[3] || "out/result.txt"
const noLock = (process.argv[4] || "").toLowerCase() == "nolock"

console.log("Arguments: ", { outputFile, layoutName, noLock })

// Simulated Annealing constants
// If you want the temperature to drop faster, use a larger value of 𝑘. To start with a cooler system, set a lower 𝑇0.

// Default
// const t0 = 10, // Initial temperature
//   k = 10, // Constant
//   p0 = 1, // Initial probability
//   N = 50000 // Number of iterations until probability reaches 0

const t0 = 10,
  k = 10,
  p0 = 1,
  N = 100000

const T = true,
  F = false

// prettier-ignore
const lockedKeys: ILayout<boolean> = [
  [T,T,T,T,T,T,T,T,T,T,T,T],
  [F,F,F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F],
  [T,T,T,T,T,T,T,T,T,T,T,T],
  [F,F,F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F],
]

let currentLayout = new Layout({
  name: layoutName,
  lockedKeys: noLock ? [] : lockedKeys,
})

let pass = 1

let thai5kEffort = Infinity
let wisesightEffort = Infinity
let wongnaiEffort = Infinity
let thaisumEffort = Infinity

console.log("Optimizing")

while (true) {
  console.log("PASS", pass)
  let currentThai5kEffort = 0,
    currentWisesightEffort = 0,
    currentWongnaiEffort = 0,
    currentThaisumEffort = 0

  const currentMatrix = JSON.parse(JSON.stringify(currentLayout.matrix))

  for (let i = 0; i < 1 + ~~(Math.random() * 2); i++) {
    currentLayout.swapKeyPairForLayout()
  }
  const currentCarpalx = new Carpalx({ layout: currentLayout })

  console.log(
    "Typing Effort (TNC 5000 triads) :",
    (currentThai5kEffort = currentCarpalx.typingEffort(tnc5k))
  )

  console.log(
    "Typing Effort (Wisesight Sentiment triads) :",
    (currentWisesightEffort = currentCarpalx.typingEffort(wisesight))
  )

  console.log(
    "Typing Effort (Wongnai Corpus triads) :",
    (currentWongnaiEffort = currentCarpalx.typingEffort(wongnai))
  )

  console.log(
    "Typing Effort (Thaisum triads) :",
    (currentThaisumEffort = currentCarpalx.typingEffort(thaisum as Triads))
  )

  const currentSumEffort =
    currentThai5kEffort +
    currentWisesightEffort +
    currentWongnaiEffort +
    currentThaisumEffort

  const baseSumEffort =
    thai5kEffort + wisesightEffort + wongnaiEffort + thaisumEffort

  const effortDiff = currentSumEffort - baseSumEffort
  const isImproved = effortDiff < 0

  // Simulated Annealing (Probably accept if not improving to prevent local minima)
  let temperature = t0 * Math.exp((-k * pass) / N) // Range: [t0 -> 0]
  let prob = p0 * Math.exp(-Math.abs(effortDiff) / temperature) // Range: [p0 -> 0]

  if (isImproved || Math.random() < prob) {
    if (isImproved) {
      console.log(
        "Found better layout with effort:",
        currentSumEffort,
        "vs",
        baseSumEffort,
        "Diff:",
        effortDiff
      )
    } else {
      console.log("Simulated Annealing with probability:", prob.toFixed(30))
    }

    thai5kEffort = currentThai5kEffort
    wisesightEffort = currentWisesightEffort
    wongnaiEffort = currentWongnaiEffort
    thaisumEffort = currentThaisumEffort

    // console.log(currentLayout.matrix)

    fs.appendFileSync(
      outputFile,
      `${pass} (Effort: ${currentSumEffort}, Diff: ${
        currentSumEffort - baseSumEffort
      }, Prob: ${prob.toFixed(
        30
      )}, Annealed: ${!isImproved})\n\n${currentLayout.matrix
        .map((l) => JSON.stringify(l))
        .join("\n")}\n==========================\n`,
      "utf-8" //
    )
  } else {
    console.log(
      "This layout is not better, skipping ",
      currentSumEffort,
      "vs",
      baseSumEffort
    )
    currentLayout.matrix = currentMatrix

    console.log("Annealing Probability (failed)", prob.toFixed(30))
  }

  if(pass >= N) {
    console.log("Run completed.")
    process.exit(0)
  } else {
    pass++
  }
}
