import Carpalx from "./carpalx";
import { Layout } from "./layout";
import { thai5k } from "../data/thai5k";

const kedmaneeLayout = new Layout({ name: "kedmanee" });
const kedmaneeCarpalx = new Carpalx({ layout: kedmaneeLayout });

const pattachoteLayout = new Layout({ name: "pattachote" });
const pattachoteCarpalx = new Carpalx({ layout: pattachoteLayout });

console.log("Carpalx Typing Effort (Lower is better)");

console.log(
  "Kedmanee Typing Effort (Thai5k triads) :",
  kedmaneeCarpalx.typingEffort(thai5k)
);

console.log(
  "Pattachote Typing Effort (Thai5k triads) :",
  pattachoteCarpalx.typingEffort(thai5k)
);
