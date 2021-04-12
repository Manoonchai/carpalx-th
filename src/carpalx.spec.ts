import {
  baseEffortKey,
  penaltyEffortKey,
  penaltyFinger,
  penaltyHand,
  penaltyRow,
} from "./carpalx";

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

describe("penaltyEffortKey", () => {
  describe("pattachote", () => {
    it("returns [1, 0.5, 0, 0, 0, 0, 0.5, 1] * wf for at home row", () => {
      expect(penaltyFinger("้")).toEqual(1);
      expect(penaltyFinger("ท")).toEqual(0.5);
      expect(penaltyFinger("ง")).toEqual(0);
      expect(penaltyFinger("ก")).toEqual(0);
      expect(penaltyFinger("ั")).toEqual(0);
      expect(penaltyFinger("ี")).toEqual(0);
      expect(penaltyFinger("า")).toEqual(0);
      expect(penaltyFinger("น")).toEqual(0);
      expect(penaltyFinger("เ")).toEqual(0.5);
      expect(penaltyFinger("ไ")).toEqual(1);
      expect(penaltyFinger("ข")).toEqual(1);
    });

    it("returns with row penalty of [0.5, 0, 1]", () => {
      expect(penaltyRow("ก")).toEqual(0);
      expect(penaltyRow("ห")).toEqual(1);
    });

    it("returns with hand penalty of [0.2,0]", () => {
      expect(penaltyHand("ก")).toEqual(0.2);
      expect(penaltyHand("า")).toEqual(0);
    });

    it("returns full weighted value correctly", () => {
      const wf = 2.5948;
      const wr = 1.3088;
      const wh = 1;

      expect(penaltyEffortKey("บ")).toEqual(wf * 1 + wr * 1 + wh * 0.2);
      expect(penaltyEffortKey("ว")).toEqual(wf * 0.5 + wr * 0.5 + wh * 0);
    });
  });
});
