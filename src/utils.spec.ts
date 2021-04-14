import { Triads } from "./carpalx";
import { extractTriads } from "./utils";

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
