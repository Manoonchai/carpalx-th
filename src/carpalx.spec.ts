import { baseEffortKey } from "./carpalx";

describe("baseEffortKey", () => {
  describe("pattachote", () => {
    it("returns 0,2 for home row keys", () => {
      expect(baseEffortKey("้")).toEqual(0);
      expect(baseEffortKey("ท")).toEqual(0);
      expect(baseEffortKey("ง")).toEqual(0);
      expect(baseEffortKey("ก")).toEqual(0);
      expect(baseEffortKey("ั")).toEqual(2);
      expect(baseEffortKey("ี")).toEqual(2);
      expect(baseEffortKey("า")).toEqual(0);
      expect(baseEffortKey("น")).toEqual(0);
      expect(baseEffortKey("เ")).toEqual(0);
      expect(baseEffortKey("ไ")).toEqual(0);
      expect(baseEffortKey("ข")).toEqual(2);
    });

    it("returns [2, 2, 2, 2, 2.5, 3, 2, 2, 2, 2, 2.5, 4, 6] on upper row keys", () => {
      const efforts = "็ตยอร่ดมวแใฌฃ".split("").map((k) => baseEffortKey(k));

      expect(efforts).toEqual([2, 2, 2, 2, 2.5, 3, 2, 2, 2, 2, 2.5, 4, 6]);
    });

    it("returns [2, 2, 2, 2, 3.5, 2, 2, 2, 2, 2], on lower row keys", () => {
      const efforts = "บปลหิคสะจพ".split("").map((k) => baseEffortKey(k));

      expect(efforts).toEqual([2, 2, 2, 2, 3.5, 2, 2, 2, 2, 2]);
    });

    it("falls back to 6 if not found", () => {
      expect(baseEffortKey("ู")).toEqual(6);
      expect(baseEffortKey("ุ")).toEqual(6);
      expect(baseEffortKey("a")).toEqual(6);
      expect(baseEffortKey("๑")).toEqual(6);
    });

    it("raises error if char is longer than 1", () => {
      expect(() => baseEffortKey("อะ")).toThrow();
    });
  });
});
