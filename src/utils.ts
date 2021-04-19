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
  const keys: [number, number][] = arr
    .map((k, i) => k.map((_kk, ii) => [i, ii]))
    .flat() as [number, number][];

  const arrLength = keys.length;
  if (arrLength < 2) {
    return arr;
  }

  const a = ~~(Math.random() * arrLength);
  let b = ~~(Math.random() * arrLength);

  while (b == a) {
    b = ~~(Math.random() * arrLength);
  }

  const [aa, ab] = keys[a];
  const [ba, bb] = keys[b];

  [arr[aa][ab], arr[ba][bb]] = [arr[ba][bb], arr[aa][ab]];

  return arr;
}
