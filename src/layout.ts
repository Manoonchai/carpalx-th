interface LayoutOptions {
  name: "pattachote" | "kedmanee";
}

const LAYOUTS = {
  kedmanee: [
    ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล", "ฃ"],
    ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
    ["ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ"],
  ],
  pattachote: [
    ["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"],
    ["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"],
    ["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"],
  ],
};

export class Layout {
  public name: string;

  constructor(options: LayoutOptions = { name: "pattachote" }) {
    this.name = options.name;
  }

  public get matrix() {
    if (this.name === "kedmanee") {
      return LAYOUTS.kedmanee;
    }
    return LAYOUTS.pattachote;
  }
}
