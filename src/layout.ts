interface LayoutOptions {
  name: "pattachote" | "kedmanee";
}

type ILayoutMatrix = {
  [name in LayoutOptions["name"]]: string[][];
};

const LAYOUTS: ILayoutMatrix = {
  pattachote: [
    ["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"],
    ["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"],
    ["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"],
  ],
  kedmanee: [
    ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล", "ฃ"],
    ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
    ["ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ"],
  ],
};

export class Layout {
  public name: LayoutOptions["name"];

  constructor(options: LayoutOptions = { name: "pattachote" }) {
    this.name = options.name;
  }

  public get matrix() {
    return LAYOUTS[this.name];
  }
}
