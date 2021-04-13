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
});
