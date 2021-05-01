import Carpalx from "./carpalx"
import { Layout, LayoutOptions } from "./layout"

import thai5k from "../data/thai5k-freq.json"
import { wisesight } from "../data/wisesight"
import { wongnai } from "../data/wongnai"
import thaisumTestset from "../data/thaisum-testset.json"
import thaisum from "../data/thaisum-full.json"

const layoutNames: Array<LayoutOptions["name"]> = [
  "kedmanee",
  "pattachote",
  "ikbaeb",
  "manoonchai_v01",
  "manoonchai_v02",
]

const datasets = {
  thai5k,
  wisesight,
  wongnai,
  thaisumTestset,
  thaisum,
}

let baseEffortSum: number

const result = layoutNames.map((layoutName) => {
  const layout = new Layout({ name: layoutName })
  const carpalxModel = new Carpalx({ layout })

  const efforts: Array<[string, number]> = Object.entries(datasets).map(
    ([name, dataset]) => {
      return [name, carpalxModel.typingEffort(dataset)]
    }
  )

  const effortSum = efforts.reduce((prev, [_name, eff]) => prev + eff, 0)

  if (!baseEffortSum) {
    baseEffortSum = effortSum
  }

  return {
    name: layoutName,
    efforts: efforts
      .map(([name, score]) => `${name} : ~${score.toFixed(2)}`)
      .join(", "),
    effortSum,
    better: ((baseEffortSum / effortSum) * 100 - 100).toFixed(2) + "%",
  }
})

console.table(result)
