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
        ["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"],
        ["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"],
        ["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"],
      ]);
    });

    it("returns Kedmanee layout", () => {
      const layout = new Layout({ name: "kedmanee" });

      expect(layout.matrix).toBeDefined();

      expect(layout.matrix).toEqual([
        ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล", "ฃ"],
        ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
        ["ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ"],
      ]);
    });
  });

  describe("#getRow", () => {
    let layout: Layout;

    beforeEach(() => {
      layout = new Layout();
    });

    it("returns 0 for top row char", () => {
      expect(layout.getRow("อ")).toEqual(0);
      expect(layout.getRow("ย")).toEqual(0);
      expect(layout.getRow("ต")).toEqual(0);
    });

    it("returns 1 for home row char", () => {
      expect(layout.getRow("ท")).toEqual(1);
      expect(layout.getRow("ง")).toEqual(1);
      expect(layout.getRow("ก")).toEqual(1);
    });

    it("returns 2 for bottom row char", () => {
      expect(layout.getRow("บ")).toEqual(2);
      expect(layout.getRow("ป")).toEqual(2);
      expect(layout.getRow("ล")).toEqual(2);
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
    });
  });
});
