import Carpalx from "./carpalx";
import { Layout } from "./layout";

import { thai5k } from "../data/thai5k";
import { wisesight } from "../data/wisesight";
import { wongnai } from "../data/wongnai";
import thaisumTestset from "../data/thaisum-testset.json";

const kedmaneeLayout = new Layout({ name: "kedmanee" });
const kedmaneeCarpalx = new Carpalx({ layout: kedmaneeLayout });

const pattachoteLayout = new Layout({ name: "pattachote" });
const pattachoteCarpalx = new Carpalx({ layout: pattachoteLayout });

const ikbaebLayout = new Layout({ name: "ikbaeb" });
const ikbaebCarpalx = new Carpalx({ layout: ikbaebLayout });

console.log("Carpalx Typing Effort (Lower is better)");

console.log(
  "Kedmanee Typing Effort (Thai5k triads) :",
  kedmaneeCarpalx.typingEffort(thai5k)
);

console.log(
  "Pattachote Typing Effort (Thai5k triads) :",
  pattachoteCarpalx.typingEffort(thai5k)
);

console.log(
  "Ikbaeb Typing Effort (Thai5k triads) :",
  ikbaebCarpalx.typingEffort(thai5k)
);

console.log(
  "Kedmanee Typing Effort (Wisesight Sentiment triads) :",
  kedmaneeCarpalx.typingEffort(wisesight)
);

console.log(
  "Pattachote Typing Effort (Wisesight Sentiment triads) :",
  pattachoteCarpalx.typingEffort(wisesight)
);

console.log(
  "Ikbaeb Typing Effort (Wisesight Sentiment triads) :",
  ikbaebCarpalx.typingEffort(wisesight)
);

console.log(
  "Kedmanee Typing Effort (Wongnai Corpus triads) :",
  kedmaneeCarpalx.typingEffort(wongnai)
);

console.log(
  "Pattachote Typing Effort (Wongnai Corpus triads) :",
  pattachoteCarpalx.typingEffort(wongnai)
);

console.log(
  "Ikbaeb Typing Effort (Wongnai Corpus triads) :",
  ikbaebCarpalx.typingEffort(wongnai)
);

console.log(
  "Kedmanee Typing Effort (ThaisumTestset triads) :",
  kedmaneeCarpalx.typingEffort(thaisumTestset)
);

console.log(
  "Pattachote Typing Effort (ThaisumTestset triads) :",
  pattachoteCarpalx.typingEffort(thaisumTestset)
);

console.log(
  "Ikbaeb Typing Effort (ThaisumTestset triads) :",
  ikbaebCarpalx.typingEffort(thaisumTestset)
);
