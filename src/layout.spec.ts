import { Layout } from "./layout";

describe("Layout", () => {
  it("exists", () => {
    expect(Layout).toBeDefined();
  });

  it("can be instantiated with pattachote layout", () => {
    const layout = new Layout({ name: "pattachote" });
    expect(layout).toBeDefined();

    expect(layout.name).toBe("pattachote");

    const layoutDefault = new Layout();
    expect(layoutDefault.name).toBe("pattachote");
  });

  describe("#getMatrix", () => {
    it("returns pattachote matrix by default", () => {
      const layout = new Layout();

      expect(layout.matrix).toBeDefined();

      expect(layout.matrix).toEqual([
        ["1", "๒", "๓", "๔", "๕", "ู", "๗", "๘", "๙", "๐", "๑", "๖"],
        ["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"],
        ["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"],
        ["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"],
        ["1", '"', "/", ",", "?", "ุ", "_", ".", "(", ")", "-", "%"],
        ["๊", "ฤ", "ๆ", "ญ", "ษ", "ึ", "ฝ", "ซ", "ถ", "ฒ", "ฯ", "ฦ", "ฅ"],
        ["๋", "ธ", "ำ", "ณ", "์", "ื", "ผ", "ช", "โ", "ฆ", "ฑ"],
        ["ฎ", "ฏ", "ฐ", "ภ", "ั", "ศ", "ฮ", "ฟ", "ฉ", "ฬ"],
      ]);
    });

    it("returns Kedmanee layout", () => {
      const layout = new Layout({ name: "kedmanee" });

      expect(layout.matrix).toBeDefined();

      expect(layout.matrix).toEqual([
        ["ๅ", "/", "_", "ภ", "ถ", "ุ", "ึ", "ค", "ต", "จ", "ข", "ช"],
        ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล", "ฃ"],
        ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
        ["ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ"],
        ["+", "๑", "๒", "๓", "๔", "ู", "฿", "๕", "๖", "๗", "๘", "๙"],
        ["๐", '"', "ฎ", "ฑ", "ธ", "ํ", "๊", "ณ", "ฯ", "ญ", "ฐ", ",", "ฅ"],
        ["ฤ", "ฆ", "ฏ", "โ", "ฌ", "็", "๋", "ษ", "ศ", "ซ", "."],
        ["(", ")", "ฉ", "ฮ", "ฺ", "์", "?", "ฒ", "ฬ", "ฦ"],
      ]);
    });
  });

  describe("#getRow", () => {
    let layout: Layout;

    beforeEach(() => {
      layout = new Layout();
    });

    it("returns 0 for number row char", () => {
      expect(layout.getRow("ู")).toEqual(0);
      expect(layout.getRow("๒")).toEqual(0);

      // Shifted
      expect(layout.getRow("ุ")).toEqual(0);
      expect(layout.getRow("_")).toEqual(0);
    });

    it("returns 1 for upper row char", () => {
      expect(layout.getRow("อ")).toEqual(1);
      expect(layout.getRow("ย")).toEqual(1);
      expect(layout.getRow("ต")).toEqual(1);

      // Shifted
      expect(layout.getRow("ฤ")).toEqual(1);
      expect(layout.getRow("ซ")).toEqual(1);
    });

    it("returns 2 for home row char", () => {
      expect(layout.getRow("ท")).toEqual(2);
      expect(layout.getRow("ง")).toEqual(2);
      expect(layout.getRow("ก")).toEqual(2);

      // Shifted
      expect(layout.getRow("โ")).toEqual(2);
      expect(layout.getRow("ฆ")).toEqual(2);
    });

    it("returns 3 for lower row char", () => {
      expect(layout.getRow("บ")).toEqual(3);
      expect(layout.getRow("ป")).toEqual(3);
      expect(layout.getRow("ล")).toEqual(3);

      // Shifted
      expect(layout.getRow("ฏ")).toEqual(3);
      expect(layout.getRow("ฟ")).toEqual(3);
    });
  });

  describe("#getColumn", () => {
    let layout: Layout;

    beforeEach(() => {
      layout = new Layout();
    });

    it("returns its index in any row", () => {
      expect(layout.getColumn("บ")).toEqual(0);
      expect(layout.getColumn("ป")).toEqual(1);
      expect(layout.getColumn("ง")).toEqual(2);
      expect(layout.getColumn("อ")).toEqual(3);
      expect(layout.getColumn("ร")).toEqual(4);
      expect(layout.getColumn("ค")).toEqual(5);
      expect(layout.getColumn("า")).toEqual(6);
      expect(layout.getColumn("ม")).toEqual(7);
      expect(layout.getColumn("ว")).toEqual(8);
      expect(layout.getColumn("แ")).toEqual(9);
      expect(layout.getColumn("ใ")).toEqual(10);
      expect(layout.getColumn("ฌ")).toEqual(11);
      expect(layout.getColumn("ฃ")).toEqual(12);

      // Shifted
      expect(layout.getColumn("ฎ")).toEqual(0);
      expect(layout.getColumn("ฤ")).toEqual(1);
      expect(layout.getColumn("ๆ")).toEqual(2);
      expect(layout.getColumn("ภ")).toEqual(3);
      expect(layout.getColumn("ษ")).toEqual(4);
      expect(layout.getColumn("ศ")).toEqual(5);
      expect(layout.getColumn("ผ")).toEqual(6);
      expect(layout.getColumn("ซ")).toEqual(7);
      expect(layout.getColumn("โ")).toEqual(8);
      expect(layout.getColumn("ฆ")).toEqual(9);
      expect(layout.getColumn("ฯ")).toEqual(10);
      expect(layout.getColumn("ฦ")).toEqual(11);
      expect(layout.getColumn("ฅ")).toEqual(12);
    });
  });

  describe("#getFinger", () => {
    let layout: Layout;

    beforeEach(() => {
      layout = new Layout();
    });

    it("returns 0-3 & 6-9 for its corresponding finger except thumb", () => {
      expect(layout.getFinger("บ")).toEqual(0);
      expect(layout.getFinger("ป")).toEqual(1);
      expect(layout.getFinger("ง")).toEqual(2);
      expect(layout.getFinger("อ")).toEqual(3);
      expect(layout.getFinger("ร")).toEqual(3);
      expect(layout.getFinger("ค")).toEqual(6);
      expect(layout.getFinger("า")).toEqual(6);
      expect(layout.getFinger("ม")).toEqual(7);
      expect(layout.getFinger("ว")).toEqual(8);
      expect(layout.getFinger("แ")).toEqual(9);
      expect(layout.getFinger("ใ")).toEqual(9);
      expect(layout.getFinger("ฌ")).toEqual(9);
      expect(layout.getFinger("ฃ")).toEqual(9);

      expect(layout.getFinger("ฎ")).toEqual(0);
      expect(layout.getFinger("ฤ")).toEqual(1);
      expect(layout.getFinger("ๆ")).toEqual(2);
      expect(layout.getFinger("ญ")).toEqual(3);
      expect(layout.getFinger("ษ")).toEqual(3);
      expect(layout.getFinger("ศ")).toEqual(6);
      expect(layout.getFinger("ผ")).toEqual(6);
      expect(layout.getFinger("ซ")).toEqual(7);
      expect(layout.getFinger("ถ")).toEqual(8);
      expect(layout.getFinger("ฒ")).toEqual(9);
      expect(layout.getFinger("ฯ")).toEqual(9);
      expect(layout.getFinger("ฦ")).toEqual(9);
      expect(layout.getFinger("ฅ")).toEqual(9);
    });
  });

  describe("#getHand", () => {
    let layout: Layout;

    beforeEach(() => {
      layout = new Layout();
    });

    it("returns LEFT if column is <= 5", () => {
      expect(layout.getHand("บ")).toEqual("L");
      expect(layout.getHand("ป")).toEqual("L");
      expect(layout.getHand("ง")).toEqual("L");
      expect(layout.getHand("อ")).toEqual("L");
      expect(layout.getHand("ร")).toEqual("L");
      expect(layout.getHand("ค")).toEqual("L");
      expect(layout.getHand("า")).toEqual("R");
      expect(layout.getHand("ม")).toEqual("R");
      expect(layout.getHand("ว")).toEqual("R");
      expect(layout.getHand("แ")).toEqual("R");
      expect(layout.getHand("ใ")).toEqual("R");
      expect(layout.getHand("ฌ")).toEqual("R");
      expect(layout.getHand("ฃ")).toEqual("R");

      // Shifted
      expect(layout.getHand("ฎ")).toEqual("L");
      expect(layout.getHand("ฤ")).toEqual("L");
      expect(layout.getHand("ๆ")).toEqual("L");
      expect(layout.getHand("ญ")).toEqual("L");
      expect(layout.getHand("ษ")).toEqual("L");
      expect(layout.getHand("ศ")).toEqual("L");
      expect(layout.getHand("ผ")).toEqual("R");
      expect(layout.getHand("ซ")).toEqual("R");
      expect(layout.getHand("ถ")).toEqual("R");
      expect(layout.getHand("ฒ")).toEqual("R");
      expect(layout.getHand("ฯ")).toEqual("R");
      expect(layout.getHand("ฦ")).toEqual("R");
      expect(layout.getHand("ฅ")).toEqual("R");
    });
  });

  describe("isShifted", () => {
    let layout: Layout;

    beforeEach(() => {
      layout = new Layout();
    });

    it("returns false is in non-shifted layer", () => {
      expect(layout.isShifted("บ")).toEqual(false);
      expect(layout.isShifted("ป")).toEqual(false);
      expect(layout.isShifted("ง")).toEqual(false);
      expect(layout.isShifted("อ")).toEqual(false);
      expect(layout.isShifted("ร")).toEqual(false);
      expect(layout.isShifted("ค")).toEqual(false);
      expect(layout.isShifted("า")).toEqual(false);
      expect(layout.isShifted("ม")).toEqual(false);
      expect(layout.isShifted("ว")).toEqual(false);
      expect(layout.isShifted("แ")).toEqual(false);
      expect(layout.isShifted("ใ")).toEqual(false);
      expect(layout.isShifted("ฌ")).toEqual(false);
      expect(layout.isShifted("ฃ")).toEqual(false);
    });

    it("returns true is in shifted layer", () => {
      expect(layout.isShifted("ฎ")).toEqual(true);
      expect(layout.isShifted("ฤ")).toEqual(true);
      expect(layout.isShifted("ๆ")).toEqual(true);
      expect(layout.isShifted("ญ")).toEqual(true);
      expect(layout.isShifted("ษ")).toEqual(true);
      expect(layout.isShifted("ศ")).toEqual(true);
      expect(layout.isShifted("ผ")).toEqual(true);
      expect(layout.isShifted("ซ")).toEqual(true);
      expect(layout.isShifted("ถ")).toEqual(true);
      expect(layout.isShifted("ฒ")).toEqual(true);
      expect(layout.isShifted("ฯ")).toEqual(true);
      expect(layout.isShifted("ฦ")).toEqual(true);
      expect(layout.isShifted("ฅ")).toEqual(true);
    });
  });
});
