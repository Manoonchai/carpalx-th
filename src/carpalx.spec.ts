import Carpalx, { baseEffortMatrix } from "./carpalx";

let carpalx: Carpalx;

beforeAll(() => {
  carpalx = new Carpalx();
});

describe("baseEffortKey", () => {
  describe("pattachote", () => {
    it("returns 0,2 for home row keys", () => {
      expect(carpalx.baseEffortKey("้")).toEqual(0);
      expect(carpalx.baseEffortKey("ท")).toEqual(0);
      expect(carpalx.baseEffortKey("ง")).toEqual(0);
      expect(carpalx.baseEffortKey("ก")).toEqual(0);
      expect(carpalx.baseEffortKey("ั")).toEqual(2);
      expect(carpalx.baseEffortKey("ี")).toEqual(2);
      expect(carpalx.baseEffortKey("า")).toEqual(0);
      expect(carpalx.baseEffortKey("น")).toEqual(0);
      expect(carpalx.baseEffortKey("เ")).toEqual(0);
      expect(carpalx.baseEffortKey("ไ")).toEqual(0);
      expect(carpalx.baseEffortKey("ข")).toEqual(2);
    });

    it("returns base effort mapping on upper row keys", () => {
      const efforts = "็ตยอร่ดมวแใฌฃ"
        .split("")
        .map((k) => carpalx.baseEffortKey(k));

      expect(efforts).toEqual(baseEffortMatrix[1]);
    });

    it("returns base effort mapping on lower row keys", () => {
      const efforts = "บปลหิคสะจพ"
        .split("")
        .map((k) => carpalx.baseEffortKey(k));

      expect(efforts).toEqual(baseEffortMatrix[3]);
    });

    it("returns base effort mapping on number row keys", () => {
      const efforts = "๛๒๓๔๕ู๗๘๙๐๑๖"
        .split("")
        .map((k) => carpalx.baseEffortKey(k));

      expect(efforts).toEqual(baseEffortMatrix[0]);
    });

    it("raises error if not found", () => {
      expect(() => carpalx.baseEffortKey("a")).toThrow();
      expect(() => carpalx.baseEffortKey("0")).toThrow();
    });

    it("raises error if char is longer than 1", () => {
      expect(() => carpalx.baseEffortKey("อะ")).toThrow();
    });
  });
});

describe("penaltyEffortKey", () => {
  describe("pattachote", () => {
    it("returns [1, 0.5, 0, 0, 0, 0, 0.5, 1] * wf for at home row", () => {
      expect(carpalx.penaltyFinger("้")).toEqual(1);
      expect(carpalx.penaltyFinger("ท")).toEqual(0.5);
      expect(carpalx.penaltyFinger("ง")).toEqual(0);
      expect(carpalx.penaltyFinger("ก")).toEqual(0);
      expect(carpalx.penaltyFinger("ั")).toEqual(0);
      expect(carpalx.penaltyFinger("ี")).toEqual(0);
      expect(carpalx.penaltyFinger("า")).toEqual(0);
      expect(carpalx.penaltyFinger("น")).toEqual(0);
      expect(carpalx.penaltyFinger("เ")).toEqual(0.5);
      expect(carpalx.penaltyFinger("ไ")).toEqual(1);
      expect(carpalx.penaltyFinger("ข")).toEqual(1);
    });

    it("returns with row penalty of [0.5, 0, 1]", () => {
      expect(carpalx.penaltyRow("ก")).toEqual(0);
      expect(carpalx.penaltyRow("ห")).toEqual(1);
    });

    it("returns with hand penalty of [0.2,0]", () => {
      expect(carpalx.penaltyHand("ก")).toEqual(0.2);
      expect(carpalx.penaltyHand("า")).toEqual(0);
    });

    it("returns full weighted value correctly", () => {
      const wf = 2.5948;
      const wr = 1.3088;
      const wh = 1;

      expect(carpalx.penaltyEffortKey("บ")).toEqual(wf * 1 + wr * 1 + wh * 0.2);
      expect(carpalx.penaltyEffortKey("ว")).toEqual(
        wf * 0.5 + wr * 0.5 + wh * 0
      );
    });

    it("returns 0 for space", () => {
      expect(carpalx.penaltyHand(" ")).toEqual(0);
    });
  });
});

describe("strokeEffort", () => {
  it("ultimately returns 0 for งาน, ทาน", () => {
    expect(carpalx.strokeEffort("งาน")).toEqual(0);
    expect(carpalx.strokeEffort("ทาน")).toEqual(0);

    // unchanged effort for spaces
    expect(carpalx.strokeEffort("งา ")).toEqual(0);
    expect(carpalx.strokeEffort("ทา ")).toEqual(0);
  });

  describe("handAltStrokeEffort", () => {
    it("returns 0 for triads which use both of hand, without alternating back", () => {
      expect(carpalx.handAltStrokeEffort("ยาว")).toEqual(0);
      expect(carpalx.handAltStrokeEffort("ไทย")).toEqual(0);
    });

    it("returns 1 for triads which use both of hand, with alternating back", () => {
      expect(carpalx.handAltStrokeEffort("กาง")).toEqual(1);
      expect(carpalx.handAltStrokeEffort("จอด")).toEqual(1);
    });

    it("returns 2 for triads which use only one hand", () => {
      expect(carpalx.handAltStrokeEffort("กลบ")).toEqual(2);
      expect(carpalx.handAltStrokeEffort("ดาว")).toEqual(2);
    });

    describe("with space at the end (duet)", () => {
      it("returns 0 for duets with both hands", () => {
        expect(carpalx.handAltStrokeEffort("ยา ")).toEqual(0);
        expect(carpalx.handAltStrokeEffort("เท ")).toEqual(0);
      });

      it("returns 1 for duets with same hand", () => {
        expect(carpalx.handAltStrokeEffort("กล ")).toEqual(1);
        expect(carpalx.handAltStrokeEffort("นา ")).toEqual(1);
      });
    });
  });

  describe("rowAltStrokeEffort", () => {
    it("returns 0 for triads which use same row", () => {
      expect(carpalx.rowAltStrokeEffort("กาง")).toEqual(0);
      expect(carpalx.rowAltStrokeEffort("ตอม")).toEqual(0);
      expect(carpalx.rowAltStrokeEffort("หลบ")).toEqual(0);

      expect(carpalx.rowAltStrokeEffort("ตอ ")).toEqual(0);
    });

    it("returns 1 for triads which use downward progression row, with repetition", () => {
      expect(carpalx.rowAltStrokeEffort("ตอน")).toEqual(1);
      expect(carpalx.rowAltStrokeEffort("แมง")).toEqual(1);
      expect(carpalx.rowAltStrokeEffort("เกจ")).toEqual(1);

      expect(carpalx.rowAltStrokeEffort("แก ")).toEqual(1);
    });

    it("returns 2 for triads which use upward progression row, with repetition", () => {
      expect(carpalx.rowAltStrokeEffort("ลาน")).toEqual(2);
      expect(carpalx.rowAltStrokeEffort("งวด")).toEqual(2);
      expect(carpalx.rowAltStrokeEffort("จอย")).toEqual(2);

      expect(carpalx.rowAltStrokeEffort("ลา ")).toEqual(2);
      expect(carpalx.rowAltStrokeEffort("จอ ")).toEqual(2);
    });

    it("returns 3 for triads which have some different row, not monotonic, max row change 1", () => {
      expect(carpalx.rowAltStrokeEffort("เอก")).toEqual(3);
      expect(carpalx.rowAltStrokeEffort("มาย")).toEqual(3);
      expect(carpalx.rowAltStrokeEffort("เบา")).toEqual(3);
    });

    it("returns 4 for triads which use downward progression row, without repetition", () => {
      expect(carpalx.rowAltStrokeEffort("วาบ")).toEqual(4);
      expect(carpalx.rowAltStrokeEffort("ตาล")).toEqual(4);
      expect(carpalx.rowAltStrokeEffort("วีล")).toEqual(4);
    });

    it("returns 5 for triads which have some different, not monotonic, max row change downward >1", () => {
      expect(carpalx.rowAltStrokeEffort("เวบ")).toEqual(5);
      expect(carpalx.rowAltStrokeEffort("กอบ")).toEqual(5);
      expect(carpalx.rowAltStrokeEffort("ทอส")).toEqual(5);
      expect(carpalx.rowAltStrokeEffort("อลั")).toEqual(5);
    });

    it("returns 6 for triads which use upward progression row, without repetition", () => {
      expect(carpalx.rowAltStrokeEffort("บ้อ")).toEqual(6);
      expect(carpalx.rowAltStrokeEffort("พาย")).toEqual(6);
      expect(carpalx.rowAltStrokeEffort("ลาว")).toEqual(6);
    });

    it("returns 7 for triads which have some different, not monotonic, max row change upward >1", () => {
      expect(carpalx.rowAltStrokeEffort("กลอ")).toEqual(7);
      expect(carpalx.rowAltStrokeEffort("ทลว")).toEqual(7);
      expect(carpalx.rowAltStrokeEffort("ไพร")).toEqual(7);
      expect(carpalx.rowAltStrokeEffort("ครั")).toEqual(7);
    });
  });

  describe("fingerAltStrokeEffort", () => {
    it("returns 0 for triads which use all different, monotonic progression", () => {
      expect(carpalx.fingerAltStrokeEffort("ทอน")).toEqual(0);
      expect(carpalx.fingerAltStrokeEffort("บอด")).toEqual(0);
      expect(carpalx.fingerAltStrokeEffort("ลอา")).toEqual(0);

      expect(carpalx.fingerAltStrokeEffort("ลา ")).toEqual(0);
      expect(carpalx.fingerAltStrokeEffort("บอ ")).toEqual(0);
      expect(carpalx.fingerAltStrokeEffort("ทอ ")).toEqual(0);
    });

    it("returns 1 for triads which use some different, key repeat, monotonic progression", () => {
      expect(carpalx.fingerAltStrokeEffort("แดด")).toEqual(1);
      expect(carpalx.fingerAltStrokeEffort("เกก")).toEqual(1);
      expect(carpalx.fingerAltStrokeEffort("แบบ")).toEqual(1);

      expect(carpalx.fingerAltStrokeEffort("บบ ")).toEqual(1);
      expect(carpalx.fingerAltStrokeEffort("กก ")).toEqual(1);
    });

    it("returns 2 for triads which use rolling-in fingers", () => {
      expect(carpalx.fingerAltStrokeEffort("เท่")).toEqual(2);
      expect(carpalx.fingerAltStrokeEffort("ขัน")).toEqual(2);
      expect(carpalx.fingerAltStrokeEffort("เบา")).toEqual(2);
      expect(carpalx.fingerAltStrokeEffort("เอา")).toEqual(2);
    });

    it("returns 3 for triads which use all different fingers, not monotonic", () => {
      expect(carpalx.fingerAltStrokeEffort("ท้า")).toEqual(3);
      expect(carpalx.fingerAltStrokeEffort("เข้")).toEqual(3);
      expect(carpalx.fingerAltStrokeEffort("อ้น")).toEqual(3);
    });

    it("returns 4 for triads which use some different fingers, not monotonic progression", () => {
      expect(carpalx.fingerAltStrokeEffort("สกา")).toEqual(4);
      expect(carpalx.fingerAltStrokeEffort("เลว")).toEqual(4);
      expect(carpalx.fingerAltStrokeEffort("ดอด")).toEqual(4);
    });

    it("returns 5 for triads which use same finger, key repeat", () => {
      expect(carpalx.fingerAltStrokeEffort("ออก")).toEqual(5);
      expect(carpalx.fingerAltStrokeEffort("ววจ")).toEqual(5);
      expect(carpalx.fingerAltStrokeEffort("ปทท")).toEqual(5);
    });

    it("returns 6 for triads which use some different fingers, no key repeat, monotonic progression", () => {
      expect(carpalx.fingerAltStrokeEffort("แอก")).toEqual(6);
      expect(carpalx.fingerAltStrokeEffort("ไลย")).toEqual(6);
      expect(carpalx.fingerAltStrokeEffort("เบ็")).toEqual(6);
    });

    it("returns 7 for triads which same finger, no key repeat", () => {
      expect(carpalx.fingerAltStrokeEffort("ริก")).toEqual(7);
      expect(carpalx.fingerAltStrokeEffort("สาด")).toEqual(7);
      expect(carpalx.fingerAltStrokeEffort("หอก")).toEqual(7);
    });
  });
});

describe("layerChangeEffort", () => {
  it("returns 0 for triads without shifted keys", () => {
    expect(carpalx.layerChangeEffort("ทอน")).toEqual(0);
    expect(carpalx.layerChangeEffort("บอด")).toEqual(0);
    expect(carpalx.layerChangeEffort("ลอา")).toEqual(0);
  });

  it("returns 1 for triads with 1 shifted key", () => {
    expect(carpalx.layerChangeEffort("ฆ่า")).toEqual(1);
    expect(carpalx.layerChangeEffort("เณร")).toEqual(1);
    expect(carpalx.layerChangeEffort("กาฬ")).toEqual(1);
  });

  it("returns 2 for triads with monotonic 2-3 shifted keys", () => {
    expect(carpalx.layerChangeEffort("ฟืน")).toEqual(2);
    expect(carpalx.layerChangeEffort("พืช")).toEqual(2);
    expect(carpalx.layerChangeEffort("โฆษ")).toEqual(2);
  });

  it("returns 3 for triads non-monotonic 2 shifted keys (shift-nonshift-shift)", () => {
    expect(carpalx.layerChangeEffort("ฟาซ")).toEqual(3);
    expect(carpalx.layerChangeEffort("ฑัณ")).toEqual(3);
    expect(carpalx.layerChangeEffort("ฮาๆ")).toEqual(3);
  });

  describe("with space at the end (duet)", () => {
    it("returns 0 for duets without shifted key", () => {
      expect(carpalx.layerChangeEffort("กด ")).toEqual(0);
      expect(carpalx.layerChangeEffort("ตี ")).toEqual(0);
    });

    it("returns 1 for duets with 1 shifted key", () => {
      expect(carpalx.layerChangeEffort("โก ")).toEqual(1);
      expect(carpalx.layerChangeEffort("กฏ ")).toEqual(1);
    });

    it("also returns 1 for duets with 1 shifted key", () => {
      expect(carpalx.layerChangeEffort("โธ ")).toEqual(1);
      expect(carpalx.layerChangeEffort("ฉำ ")).toEqual(1);
    });
  });
});
