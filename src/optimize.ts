import fs from "fs"

import Carpalx from "./carpalx"
import { ILayout, Layout, LayoutOptions } from "./layout"

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

const t0 = 1,
  k = 10,
  p0 = 1,
  N = 2000000

const T = true,
  F = false

// prettier-ignore
const lockedKeys: ILayout<boolean> = [
  // [T,T,T,T,T,T,T,T,T,T,T,T],
  // [F,F,F,F,F,F,F,F,F,F,F,F,F],
  // [F,F,F,F,F,F,F,F,F,F,F],
  // [F,F,F,F,F,F,F,F,F,F],
  // [T,T,T,T,T,T,T,T,T,T,T,T],
  // [T,T,T,T,T,T,T,T,T,T,T,T,T],
  // [T,T,T,T,T,T,T,T,T,T,T],
  // [T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T],
  [F,F,F,F,F,F,F,F,F,F,F,T,T],
  [F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F],
  [T,T,T,T,T,T,T,T,T,T,T,T],
  [F,F,F,F,F,F,F,F,F,F,F,T,T],
  [F,F,F,F,F,F,F,F,F,F,T],
  [F,F,F,F,F,F,F,F,F,T],
]

let currentLayout = new Layout({
  name: layoutName,
  lockedKeys: noLock ? [] : lockedKeys,
})

let pass = 1

const baseCarpalx = new Carpalx({ layout: new Layout({ name: "kedmanee" }) })
const baselineEffort = baseCarpalx.sumTypingEfforts()

const percentRatio = 100 / baselineEffort
let currentSumEffort = 100
let baseSumEffort = 100
let minSumEffort = baselineEffort * percentRatio // Should be 100

console.clear()
console.log("Optimizing")

while (true) {
  // console.clear()
  // const lines = process.stdout.getWindowSize()[1];
  // for(let i = 0; i < lines; i++) {
  //     console.log('\r\n');
  // }

  // console.log("PASS", pass)

  const currentMatrix = JSON.parse(JSON.stringify(currentLayout.matrix))

  for (let i = 0; i < 1 + ~~(Math.random() * 3); i++) {
    currentLayout.swapKeyPairForLayout()
  }
  const currentCarpalx = new Carpalx({ layout: currentLayout })
  currentSumEffort = currentCarpalx.sumTypingEfforts() * percentRatio

  const effortDiff = currentSumEffort - baseSumEffort
  const isImproved = effortDiff < 0

  // Simulated Annealing (Probably accept if not improving to prevent local minima)
  let temperature = t0 * Math.exp((-k * pass) / N) // Range: [t0 -> 0]
  let prob = p0 * Math.exp(-Math.abs(effortDiff) / temperature) // Range: [p0 -> 0]

  if (isImproved || Math.random() < prob) {
    if (isImproved) {
      console.clear()
      console.log("PASS", pass)
      console.log(
        "Found better layout with effort:",
        currentSumEffort,
        "vs",
        baseSumEffort,
        "Diff:",
        effortDiff
      )
    } else {
      console.log("PASS", pass)
      console.log("Simulated Annealing with probability:", prob.toFixed(30))
    }

    baseSumEffort = currentSumEffort

    // console.log(currentLayout.matrix)

    // Write to file only improvements
    if (currentSumEffort < minSumEffort) {
      minSumEffort = currentSumEffort

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
    }
  } else {
    // console.log(
    //   "This layout is not better, skipping ",
    //   currentSumEffort,
    //   "vs",
    //   baseSumEffort
    // )
    currentLayout.matrix = currentMatrix

    // console.log("Annealing Probability (failed)", prob.toFixed(30))
  }

  if (pass >= N) {
    console.log("Run completed.")
    process.exit(0)
  } else {
    pass++
  }
}
