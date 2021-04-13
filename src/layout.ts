interface LayoutOptions {
  name: "pattachote" | "kedmanee";
}

type ILayoutMatrix = {
  [name in LayoutOptions["name"]]: string[][];
};

const LAYOUTS: ILayoutMatrix = {
  pattachote: [
    ["1", "๒", "๓", "๔", "๕", "ู", "๗", "๘", "๙", "๐", "๑", "๖"],
    ["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"],
    ["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"],
    ["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"],
    ["1", '"', "/", ",", "?", "ุ", "_", ".", "(", ")", "-", "%"],
    ["๊", "ฤ", "ๆ", "ญ", "ษ", "ึ", "ฝ", "ซ", "ถ", "ฒ", "ฯ", "ฦ", "ฅ"],
    ["๋", "ธ", "ำ", "ณ", "์", "ื", "ผ", "ช", "โ", "ฆ", "ฑ"],
    ["ฎ", "ฏ", "ฐ", "ภ", "ั", "ศ", "ฮ", "ฟ", "ฉ", "พ"],
  ],
  kedmanee: [
    ["ๅ", "/", "_", "ภ", "ถ", "ุ", "ึ", "ค", "ต", "จ", "ข", "ช"],
    ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล", "ฃ"],
    ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
    ["ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ"],
    ["+", "๑", "๒", "๓", "๔", "ู", "฿", "๕", "๖", "๗", "๘", "๙"],
    ["๐", '"', "ฎ", "ฑ", "ธ", "ํ", "๊", "ณ", "ฯ", "ญ", "ฐ", ",", "ฅ"],
    ["ฤ", "ฆ", "ฏ", "โ", "ฌ", "็", "๋", "ษ", "ศ", "ซ", "."],
    ["(", ")", "ฉ", "ฮ", "ฺ", "์", "?", "ฒ", "ฬ", "ฦ"],
  ],
};

const FINGER_MAP = [0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9, 9];

export class Layout {
  public name: LayoutOptions["name"];
  private rawRowCache: { [char: string]: number } = {};
  private columnCache: { [char: string]: number } = {};

  constructor(options: LayoutOptions = { name: "pattachote" }) {
    this.name = options.name;
  }

  public get matrix() {
    return LAYOUTS[this.name];
  }

  public getRow(char: string) {
    return this.getRawRow(char) % 4;
  }

  public isShifted(char: string) {
    return this.getRawRow(char) >= 4;
  }

  private getRawRow(char: string) {
    this.rawRowCache[char] ||= this.matrix.findIndex((layoutRow) => {
      return layoutRow.findIndex((layoutChar) => layoutChar === char) !== -1;
    });

    return this.rawRowCache[char];
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
