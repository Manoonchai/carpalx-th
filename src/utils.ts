import { Triads } from "./carpalx";

export function extractTriads(triads: Triads = {}, input: string): void {
  const sentences = input.split(/\s+/);

  sentences.forEach((sentence) => {
    eachCons(sentence, 3).forEach((triad) => {
      if (triad.length == 3) {
        triads[triad] ||= 0;
        triads[triad]++;
      }
    });
  });
}

function eachCons(str: string, num: number): string[] {
  let res = [],
    temp = [];
  let start = 0,
    end = 0;
  while (end < num) {
    temp.push(str[end++]);
  }
  for (; end <= str.length; ) {
    if (temp.length === num) {
      res.push(temp);
      start++;
      end = start;
      temp = [];
    }
    temp[end - start] = str[end];
    end++;
  }
  return res.map((r) => r.join(""));
}

export function swapKeyPair(arr: string[][]) {
  // List [i,j] indices for 2d array
  const keys: [number, number][] = arr
    .map((a: string[], i) => a.map((_, j) => [i, j]))
    .flat() as [number, number][];

  const arrLength = keys.length;
  if (arrLength < 2) {
    return arr;
  }

  // Random unique index a & b
  const a = ~~(Math.random() * arrLength);
  let b;
  do {
    b = ~~(Math.random() * arrLength);
  } while (b == a);

  // Extract keys
  const [i, j] = keys[a];
  const [m, n] = keys[b];

  // Swap in place
  [arr[i][j], arr[m][n]] = [arr[m][n], arr[i][j]];

  return arr;
}
