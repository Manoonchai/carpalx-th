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
