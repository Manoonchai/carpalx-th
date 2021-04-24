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

export function eachCons(str: string, num: number): string[] {
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

export function swapKeyPair(arr: string[][], lockedKeys: boolean[][] = []) {
  // List [i,j] indices for 2d array
  const keys: [number, number][] = arr
    .map((a: string[], i) => a.map((_, j) => [i, j]))
    .flat() as [number, number][];

  const arrLength = keys.length;
  const lockedKeysCount = lockedKeys.flat().filter((v) => v).length;

  if (arrLength - lockedKeysCount < 2) {
    return arr;
  }

  // Random unique index a & b
  // Re-random if found locked keys or b = a
  let a, b, x, y;
  do {
    a = ~~(Math.random() * arrLength);
    [x, y] = keys[a];
  } while (lockedKeys[x] && lockedKeys[x][y]);

  do {
    b = ~~(Math.random() * arrLength);
    [x, y] = keys[b];
  } while (b == a || (lockedKeys[x] && lockedKeys[x][y]));

  // Extract keys
  const [i, j] = keys[a];
  const [m, n] = keys[b];

  // Swap in place
  [arr[i][j], arr[m][n]] = [arr[m][n], arr[i][j]];

  return arr;
}
