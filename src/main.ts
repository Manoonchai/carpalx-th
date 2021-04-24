import Carpalx, { Triads } from "./carpalx"
import { Layout } from "./layout"

import thai5k from "../data/thai5k-freq.json"
import { wisesight } from "../data/wisesight"
import { wongnai } from "../data/wongnai"
import thaisumTestset from "../data/thaisum-testset.json"
import thaisum from "../data/thaisum-full.json"

const kedmaneeLayout = new Layout({ name: "kedmanee" })
const kedmaneeCarpalx = new Carpalx({ layout: kedmaneeLayout })

const pattachoteLayout = new Layout({ name: "pattachote" })
const pattachoteCarpalx = new Carpalx({ layout: pattachoteLayout })

const ikbaebLayout = new Layout({ name: "ikbaeb" })
const ikbaebCarpalx = new Carpalx({ layout: ikbaebLayout })

const hr = () => console.log("========================================")

console.log("Carpalx Typing Effort (Lower is better)")

hr()

let kedmaneeEffort = 0,
  pattachoteEffort = 0,
  ikbaebEffort = 0,
  effort = 0

console.log(
  "Kedmanee Typing Effort (Thai5k-freq triads) :",
  (effort = kedmaneeCarpalx.typingEffort(thai5k))
)
kedmaneeEffort += effort

console.log(
  "Pattachote Typing Effort (Thai5k-freq triads) :",
  (effort = pattachoteCarpalx.typingEffort(thai5k))
)
pattachoteEffort += effort

console.log(
  "Ikbaeb Typing Effort (Thai5k-freq triads) :",
  (effort = ikbaebCarpalx.typingEffort(thai5k))
)
ikbaebEffort += effort

hr()

console.log(
  "Kedmanee Typing Effort (Wisesight Sentiment triads) :",
  (effort = kedmaneeCarpalx.typingEffort(wisesight))
)
kedmaneeEffort += effort

console.log(
  "Pattachote Typing Effort (Wisesight Sentiment triads) :",
  (effort = pattachoteCarpalx.typingEffort(wisesight))
)
pattachoteEffort += effort

console.log(
  "Ikbaeb Typing Effort (Wisesight Sentiment triads) :",
  (effort = ikbaebCarpalx.typingEffort(wisesight))
)
ikbaebEffort += effort

hr()

console.log(
  "Kedmanee Typing Effort (Wongnai Corpus triads) :",
  (effort = kedmaneeCarpalx.typingEffort(wongnai))
)
kedmaneeEffort += effort

console.log(
  "Pattachote Typing Effort (Wongnai Corpus triads) :",
  (effort = pattachoteCarpalx.typingEffort(wongnai))
)
pattachoteEffort += effort

console.log(
  "Ikbaeb Typing Effort (Wongnai Corpus triads) :",
  (effort = ikbaebCarpalx.typingEffort(wongnai))
)
ikbaebEffort += effort

hr()

console.log(
  "Kedmanee Typing Effort (ThaisumTestset triads) :",
  (effort = kedmaneeCarpalx.typingEffort(thaisumTestset))
)
kedmaneeEffort += effort

console.log(
  "Pattachote Typing Effort (ThaisumTestset triads) :",
  (effort = pattachoteCarpalx.typingEffort(thaisumTestset))
)
pattachoteEffort += effort

console.log(
  "Ikbaeb Typing Effort (ThaisumTestset triads) :",
  (effort = ikbaebCarpalx.typingEffort(thaisumTestset))
)
ikbaebEffort += effort

hr()

console.log(
  "Kedmanee Typing Effort (Thaisum triads) :",
  (effort = kedmaneeCarpalx.typingEffort(thaisum as Triads))
)
kedmaneeEffort += effort

console.log(
  "Pattachote Typing Effort (Thaisum triads) :",
  (effort = pattachoteCarpalx.typingEffort(thaisum as Triads))
)
pattachoteEffort += effort

console.log(
  "Ikbaeb Typing Effort (Thaisum triads) :",
  (effort = ikbaebCarpalx.typingEffort(thaisum as Triads))
)
ikbaebEffort += effort

hr()

console.info("SUMMARY")
console.info({ kedmaneeEffort, pattachoteEffort, ikbaebEffort })
