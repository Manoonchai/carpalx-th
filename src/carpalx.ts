// Default model params
const kb = 0.3555,
  kp = 0.6423,
  ks = 0.4268,
  // ws = [1, 0.3, 0.3],
  wb = [1, 0.367, 0.235];
// wp = [1, 0.367, 0.235];

// const kShiftMultiplier = 2.0; // Penalty when key is in shifted layout

const [k1, k2, k3] = wb;

const baseEffortMatrix = [
  // [ 4, 4, 4, 4, 5, 6, 4, 4, 4, 4, 5, 6, 7 ], // number row
  [2, 2, 2, 2, 2.5, 3, 2, 2, 2, 2, 2.5, 4, 6], //row 1
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2], //row 2 base
  [2, 2, 2, 2, 3.5, 2, 2, 2, 2, 2], //down row
];

const baseEffortFallback = 6; // fallback for number row

const layout = [
  ["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"],
  ["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"],
  ["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"],
];

// const layoutShifted = [
//   ["๊", "ฤ", "ๆ", "ญ", "ษ", "ึ", "ฝ", "ซ", "ถ", "ฒ", "ฯ", "ฦ", "ฅ"],
//   ["๋", "ธ", "ำ", "ณ", "์", "ื", "ผ", "ช", "โ", "ฆ", "ฑ"],
//   ["ฎ", "ฏ", "ฐ", "ภ", "ั", "ศ", "ฮ", "ฟ", "ฉ", "ฬ"],
// ];

interface Triads {
  [triad: string]: number;
}

// 𝐸=1𝑁∑𝑖𝑛𝑖𝑒𝑖
// E : typingEffort
// N : triadsCount
// 𝑖 : triad
// n𝑖 : unique triad count (Triad.value)
// e𝑖 : triadEffort
export function typingEffort(triads: Triads) {
  const triadsCount = Object.values(triads).reduce((a, b) => a + b);

  const triadEffortSum = Object.entries(triads)
    .map(([triad, count]) => {
      return count * triadEffort(triad);
    })
    .reduce((a, b) => a + b);

  return triadEffortSum / triadsCount;
}

// 𝑒𝑖=𝑘𝑏𝑏𝑖+𝑘𝑝𝑝𝑖+𝑘𝑠𝑠𝑖
// k𝑏 = base weight (constant)
// k𝑝 = penalty weight (constant)
// k𝑠 = stroke path weight (constant)
// b𝑖 = base effort component
// p𝑖 = penalty effort component
// s𝑖 = stroke path effort component
export function triadEffort(triad: string) {
  return (
    kb * baseEffort(triad) +
    kp * penaltyEffort(triad) +
    ks * strokeEffort(triad)
  );
}

// 𝑏𝑖=𝑘1𝑏𝑖1(1+𝑘2𝑏𝑖2(1+𝑘3𝑏𝑖3))
// k1,k2,k3 = triad nth key weight (constant)
// bi1,bi2,bi3 = triad nth key base effort (finger travel distance, 0 for home row keys)
export function baseEffort(triad: string) {
  return (
    k1 *
    baseEffortKey(triad[0]) *
    (1 + k2 * baseEffortKey(triad[1]) * (1 + k3 * baseEffortKey(triad[2])))
  );
}

export function baseEffortKey(char: string) {
  if (char.length !== 1) {
    throw new Error("key length must be 1");
  }

  let effort = baseEffortFallback;

  layout.forEach((layoutRow, rowIdx) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === char);
    if (idx !== -1) {
      effort = baseEffortMatrix[rowIdx][idx];
    }
  });

  return effort;
}

const w0 = 0,
  wh = 1,
  wr = 1.3088,
  wf = 2.5948;

function Pf(i: number) {
  return [1, 0.5, 0, 0, 0, 0, 0, 0, 0.5, 1, 1][i];
}
function Pr(i: number) {
  // return [1.5, 0.5, 0, 1][i]; // With number row
  return [0.5, 0, 1][i]; // Without number row
}
function Ph(hand: "L" | "R") {
  return hand === "L" ? 0.2 : 0; // Righty
}
export function penaltyEffort(triad: string) {
  return (
    k1 *
    penaltyEffortKey(triad[0]) *
    (1 +
      k2 * penaltyEffortKey(triad[1]) * (1 + k3 * penaltyEffortKey(triad[2])))
  );
}

// 𝑝𝑖𝑗=𝑤0+𝑤hand * 𝑃hand𝑗 + 𝑤row * 𝑃row𝑗 + 𝑤finger * 𝑃finger𝑗
//  increased effort of the use of weak fingers (e.g. pinky)
// 𝑝𝑖𝑗 : Penalty of triad 𝑖 at key 𝑗 (j:1,2,3)
// 𝑤 : weights
// 𝑤0 : default penalty (no penalty : 0)
// 𝑤hand :
//
export function penaltyEffortKey(char: string) {
  if (char.length !== 1) {
    throw new Error("key length must be 1");
  }

  return (
    w0 +
    wh * penaltyHand(char) +
    wr * penaltyRow(char) +
    wf * penaltyFinger(char)
  );
}

export function penaltyHand(char: string) {
  let effort = 1;

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === char);
    if (idx !== -1) {
      effort = Ph(idx < 5 ? "L" : "R");
    }
  });

  return effort;
}

export function penaltyRow(char: string) {
  let effort = 1;

  layout.forEach((layoutRow, rowIdx) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === char);
    if (idx !== -1) {
      effort = Pr(rowIdx);
    }
  });

  return effort;
}

export function penaltyFinger(char: string) {
  let effort = 1;

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === char);
    if (idx !== -1) {
      effort = Pf(idx);
    }
  });

  return effort;
}

// 𝑠𝑖=∑(𝑗=hand, row, finger) 𝑓𝑗 * 𝑝𝑗
// 𝑓𝑗 : fh, fr, ff (constant : [1, 0.3, 0.3])
// pj : ph, pr, pf
// 𝑝h : hand-alternation (0 - 2)
// 𝑝r : row-alternation (0 - 7)
// 𝑝f : finger-alternation (0 - 7)
const fh = 1,
  fr = 0.3,
  ff = 0.3;

export function strokeEffort(triad: string) {
  return (
    fh * handAltStrokeEffort(triad) +
    fr * rowAltStrokeEffort(triad) +
    ff * fingerAltStrokeEffort(triad)
  );
}

export function handAltStrokeEffort(triad: string): number {
  const [c1, c2, c3] = triad;
  let c1h, c2h, c3h;

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c1);
    if (idx !== -1) {
      c1h = idx < 5 ? "L" : "R";
    }
  });

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c2);
    if (idx !== -1) {
      c2h = idx < 5 ? "L" : "R";
    }
  });

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c3);
    if (idx !== -1) {
      c3h = idx < 5 ? "L" : "R";
    }
  });

  if (c1h == c3h) {
    if (c2h == c3h) {
      return 2;
    }

    return 1;
  }

  return 0;
}

export function rowAltStrokeEffort(triad: string): number {
  const [c1, c2, c3] = triad;
  let [c1r, c2r, c3r] = [-1, -1, -1];

  layout.forEach((layoutRow, rowIdx) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c1);
    if (idx !== -1) {
      c1r = rowIdx;
    }
  });

  layout.forEach((layoutRow, rowIdx) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c2);
    if (idx !== -1) {
      c2r = rowIdx;
    }
  });

  layout.forEach((layoutRow, rowIdx) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c3);
    if (idx !== -1) {
      c3r = rowIdx;
    }
  });

  if (c1r == c3r && c2r == c3r) {
    return 0;
  }

  // 1 = 2 < 3 or 1 < 2 = 3
  if ((c1r == c2r && c2r < c3r) || (c1r < c2r && c2r == c3r)) {
    return 1;
  }

  // 1 = 2 > 3 or 1 > 2 = 3
  if ((c1r == c2r && c2r > c3r) || (c1r > c2r && c2r == c3r)) {
    return 2;
  }

  // 1 = 3 and 2 is 1 row away
  if (c1r == c3r && Math.abs(c1r - c2r) == 1) {
    return 3;
  }

  // 1 < 2 < 3
  if (c1r < c2r && c2r < c3r) {
    return 4;
  }

  // aqz : 1 > 2 and 3 is more than row away downward
  // qza : 2 > 3 and 1 is more than row away downward
  if ((c1r > c2r && c3r - c2r > 1) || (c2r > c3r && c2r - c1r > 1)) {
    return 5;
  }

  // 1 > 2 > 3
  if (c1r > c2r && c2r > c3r) {
    return 6;
  }

  // azq : 1 < 2 and 3 is more than row away upward
  // zqa : 2 < 3 and 1 is more than row away upward
  if ((c1r < c2r && c2r - c3r > 1) || (c2r < c3r && c1r - c2r > 1)) {
    return 7;
  }

  // impossible!
  throw new Error(`Unhandled case found : ${triad}`);
}

export function fingerAltStrokeEffort(triad: string): number {
  const [c1, c2, c3] = triad;
  let [c1f, c2f, c3f] = [-1, -1, -1];
  const fingerMap = [0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9, 9];

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c1);
    if (idx !== -1) {
      c1f = fingerMap[idx];
    }
  });

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c2);
    if (idx !== -1) {
      c2f = fingerMap[idx];
    }
  });

  layout.forEach((layoutRow) => {
    const idx = layoutRow.findIndex((layoutChar) => layoutChar === c3);
    if (idx !== -1) {
      c3f = fingerMap[idx];
    }
  });

  // 1 < 2 < 3 or 1 > 2 > 3
  if ((c1f < c2f && c2f < c3f) || (c1f > c2f && c2f > c3f)) {
    return 0;
  }

  // 1 = 2 < 3 or 1 < 2 = 3 or 1 = 2 > 3 or 1 > 2 = 3
  // and with key repeat
  if (
    (c1 == c2 && c2f < c3f) ||
    (c1f < c2f && c2 == c3) ||
    (c1 == c2 && c2f > c3f) ||
    (c1f > c2f && c2 == c3)
  ) {
    return 1;
  }

  // 1 > 2 and 1 > 3 and 2 < 3
  // or
  // 1 < 2 and 1 < 3 and 3 < 2
  if (
    (c1f > c2f && c1f > c3f && c2f < c3f) ||
    (c1f < c2f && c1f < c3f && c3f < c2f)
  ) {
    return 2;
  }

  // 1 < 2 and 2 > 3 and 1 > 3
  // or
  // 1 > 2 and 2 < 3 and 1 < 3
  if (
    (c1f < c2f && c2f > c3f && c1f > c3f) ||
    (c1f > c2f && c2f < c3f && c1f < c3f)
  ) {
    return 3;
  }

  // 1 = 3 != 2
  if (c1f == c3f && c1f != c2f) {
    return 4;
  }

  // 1 = 2 = 3
  // with key repeat
  if (c1f == c2f && c2f == c3f && (c1 == c2 || c2 == c3 || c1 == c3)) {
    return 5;
  }

  // 1 = 2 < 3 or 1 < 2 = 3 or 1 = 2 > 3 or 1 > 2 = 3
  // and without key repeat
  if (
    (c1f == c2f && c2f < c3f) ||
    (c1f < c2f && c2f == c3f) ||
    (c1f == c2f && c2f > c3f) ||
    (c1f > c2f && c2f == c3f)
  ) {
    return 6;
  }

  // 1 = 2 = 3
  // without key repeat
  if (c1f == c2f && c2f == c3f && c1 !== c2 && c2 !== c3 && c1 !== c3) {
    return 7;
  }

  // impossible!
  throw new Error(`Unhandled case found : ${triad}`);
}

// const triads: Triads = {
//   ครั: 1,
//   รับ: 2,
// };
// console.log(typingEffort(triads));
