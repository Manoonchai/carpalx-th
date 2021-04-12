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

const triads: Triads = {
  ครั: 1,
  รับ: 2,
};

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

export function penaltyEffort(triad: string) {
  return 1 * triad.length;
}

export function strokeEffort(triad: string) {
  return 1 * triad.length;
}

// console.log(typingEffort(triads));
