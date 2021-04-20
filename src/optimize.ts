import fs from "fs";

import Carpalx, { Triads } from "./carpalx";
import { ILayout, Layout, LayoutOptions } from "./layout";

import { thai5k } from "../data/thai5k";
import { wisesight } from "../data/wisesight";
import { wongnai } from "../data/wongnai";
import thaisumTestset from "../data/thaisum-testset.json";
import thaisum from "../data/thaisum-full.json";

const layoutName = (process.argv[2] as LayoutOptions["name"]) || "kedmanee";
const outputFile = process.argv[3] || "out/result.txt";

console.log("Arguments: ", { outputFile, layoutName });

const T = true,
  F = false;

// prettier-ignore
const lockedKeys: ILayout<boolean> = [
  [T,T,T,T,T,T,T,T,T,T,F,F],
  [F,F,F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F,F],
  [F,F,F,F,F,F,F,F,F,F],
]

let currentLayout = new Layout({ name: layoutName, lockedKeys });

let pass = 1;

let thai5kEffort = Infinity;
let wisesightEffort = Infinity;
let wongnaiEffort = Infinity;
let thaisumTestsetEffort = Infinity;
let thaisumEffort = Infinity;

console.log("Optimizing");

while (true) {
  console.log("PASS", pass);
  let currentThai5kEffort = 0,
    currentWisesightEffort = 0,
    currentWongnaiEffort = 0,
    currentThaisumTestsetEffort = 0,
    currentThaisumEffort = 0;

  const currentMatrix = JSON.parse(JSON.stringify(currentLayout.matrix));

  for (let i = 0; i < 1 + ~~(Math.random() * 2); i++) {
    currentLayout.swapKeyPairForLayout();
  }
  const currentCarpalx = new Carpalx({ layout: currentLayout });

  console.log(
    "Typing Effort (Thai5k triads) :",
    (currentThai5kEffort = currentCarpalx.typingEffort(thai5k))
  );

  console.log(
    "Typing Effort (Wisesight Sentiment triads) :",
    (currentWisesightEffort = currentCarpalx.typingEffort(wisesight))
  );

  console.log(
    "Typing Effort (Wongnai Corpus triads) :",
    (currentWongnaiEffort = currentCarpalx.typingEffort(wongnai))
  );

  console.log(
    "Typing Effort (ThaisumTestset triads) :",
    (currentThaisumTestsetEffort = currentCarpalx.typingEffort(thaisumTestset))
  );

  console.log(
    "Typing Effort (Thaisum triads) :",
    (currentThaisumEffort = currentCarpalx.typingEffort(thaisum as Triads))
  );

  const currentSumEffort =
    currentThai5kEffort +
    currentWisesightEffort +
    currentWongnaiEffort +
    currentThaisumTestsetEffort +
    currentThaisumEffort;

  const baseSumEffort =
    thai5kEffort +
    wisesightEffort +
    wongnaiEffort +
    thaisumTestsetEffort +
    thaisumEffort;
  if (currentSumEffort < baseSumEffort) {
    console.log(
      "Found better layout with effort:",
      currentSumEffort,
      "vs",
      baseSumEffort
    );
    thai5kEffort = currentThai5kEffort;
    wisesightEffort = currentWisesightEffort;
    wongnaiEffort = currentWongnaiEffort;
    thaisumTestsetEffort = currentThaisumTestsetEffort;
    thaisumEffort = currentThaisumEffort;

    console.log(currentLayout.matrix);

    fs.appendFileSync(
      outputFile,
      `${pass} (Effort: ${currentSumEffort})\n\n${currentLayout.matrix
        .map((l) => JSON.stringify(l))
        .join("\n")}\n==========================\n`,
      "utf-8" //
    );
  } else {
    console.log(
      "This layout is not better, skipping ",
      currentSumEffort,
      "vs",
      baseSumEffort
    );
    currentLayout.matrix = currentMatrix;
  }

  pass++;
}
