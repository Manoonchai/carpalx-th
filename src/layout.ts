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

const FINGER_MAP = [0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9, 9];

export class Layout {
  public name: LayoutOptions["name"];
  private rowCache: { [char: string]: number } = {};
  private columnCache: { [char: string]: number } = {};

  constructor(options: LayoutOptions = { name: "pattachote" }) {
    this.name = options.name;
  }

  public get matrix() {
    return LAYOUTS[this.name];
  }

  public getRow(char: string) {
    this.rowCache[char] ||= this.matrix.findIndex((layoutRow) => {
      return layoutRow.findIndex((layoutChar) => layoutChar === char) !== -1;
    });

    return this.rowCache[char];
  }

  public getColumn(char: string) {
    if (this.columnCache[char]) {
      return this.columnCache[char];
    }

    this.matrix.every((layoutRow) => {
      const idx = layoutRow.findIndex((layoutChar) => layoutChar === char);

      if (idx !== -1) {
        this.columnCache[char] = idx;

        return false;
      }

      return true;
    });

    return this.columnCache[char];
  }

  public getFinger(char: string) {
    return FINGER_MAP[this.getColumn(char)];
  }

  public getHand(char: string) {
    return this.getColumn(char) <= 5 ? "L" : "R";
  }
}
