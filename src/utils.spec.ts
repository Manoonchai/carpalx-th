import { Triads } from "./carpalx";
import { extractTriads, swapKeyPair } from "./utils";

describe("extractTriads", () => {
  it("returns output with triads count", () => {
    const triads = {} as Triads;

    extractTriads(triads, "abcdefg hij kl m bcde e e");

    expect(triads["abc"]).toEqual(1);
    expect(triads["bcd"]).toEqual(2);
    expect(triads["cde"]).toEqual(2);
    expect(triads["def"]).toEqual(1);
    expect(triads["efg"]).toEqual(1);
    expect(triads["hij"]).toEqual(1);
    expect(triads["g h"]).toBeUndefined();
    expect(triads["e e"]).toBeUndefined();
  });
});

describe("swapKeyPair", () => {
  it("swaps a pair of key from 2d array in-place", () => {
    // Don't do anything to 0-1 length arrays
    expect(swapKeyPair([[]])).toEqual([[]]);
    expect(swapKeyPair([["a"]])).toEqual([["a"]]);

    // Guarantee 2 element swap
    expect(swapKeyPair([["a", "b"]])).toEqual([["b", "a"]]);
    expect(swapKeyPair([["a"], ["b"]])).toEqual([["b"], ["a"]]);

    // Guarantee swapping
    expect(swapKeyPair([["a", "b"], ["c"]])).not.toEqual([["a", "b"], ["c"]]);
    expect(swapKeyPair([["a", "b"], ["c"]])[0].length).toEqual(2);
    expect(swapKeyPair([["a", "b"], ["c"]])[1].length).toEqual(1);
  });
});
