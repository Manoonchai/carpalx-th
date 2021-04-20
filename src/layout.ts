import { swapKeyPair } from "./utils";
interface LayoutOptions {
  name: "pattachote" | "kedmanee" | "ikbaeb" | "custom";
  lockedKeys?: boolean[][];
}

type ILayoutMatrix = {
  [name in LayoutOptions["name"]]: ILayout<string>;
};

// prettier-ignore
export type ILayout<T> = [
  [T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T],
]

const LAYOUTS: ILayoutMatrix = {
  pattachote: [
    [" ", "๒", "๓", "๔", "๕", "ู", "๗", "๘", "๙", "๐", "๑", "๖"],
    ["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"],
    ["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"],
    ["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"],
    ["1", '"', "/", ",", "?", "ุ", "_", ".", "(", ")", "-", "%"],
    ["๊", "ฤ", "ๆ", "ญ", "ษ", "ึ", "ฝ", "ซ", "ถ", "ฒ", "ฯ", "ฦ", "ฅ"],
    ["๋", "ธ", "ำ", "ณ", "์", "ื", "ผ", "ช", "โ", "ฆ", "ฑ"],
    ["ฎ", "ฏ", "ฐ", "ภ", "ั", "ศ", "ฮ", "ฟ", "ฉ", "ฬ"],
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
  ikbaeb: [
    // https://gitlab.com/sahabandha/ikbaeb-th
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["ผ", "ป", "ง", "ล", "ต", "แ", "ิ", "่", "้", "ใ", "์", "ๆ", "฿"],
    ["ห", "ก", "ร", "น", "ด", "ี", "า", "ย", "อ", "ว", "ู"],
    ["บ", "ท", "ส", "ม", "ค", "ั", "เ", "ะ", "ไ", "ุ"],
    ["!", '"', "#", ",", "%", "?", ".", "_", "(", ")", "~", "+"],
    ["ฎ", "ษ", "ภ", "ถ", "ฏ", "ฝ", "ึ", "๋", "็", "ฆ", "ฯ", "๏", "|"],
    ["ฟ", "ซ", "ข", "จ", "ธ", "ื", "ำ", "พ", "ช", "โ", "ฬ"],
    ["ฒ", "ฉ", "ฐ", "ณ", "ญ", "ฮ", "ฑ", "ศ", "๊", "ฤ"],
  ],
  custom: [
    ["๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙", "๐", "(", ")"],
    ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล", "ต"],
    ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
    ["ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ"],
    ["+", "๏", "/", "_", '"', "๏", "฿", ",", "๏", "๏", "๏", "๏"],
    ["จ", "ภ", "ฎ", "ฑ", "ธ", "ุ", "๊", "ณ", "ฯ", "ญ", "ฐ", "ถ", "ค"],
    ["ฤ", "ฆ", "ฏ", "โ", "ฌ", "็", "๋", "ษ", "ศ", "ซ", "."],
    ["ข", "ช", "ฉ", "ฮ", "ึ", "์", "?", "ฒ", "ฬ", "ู"],
  ],
};

const FINGER_MAP = [0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9, 9];

export class Layout {
  public name: LayoutOptions["name"];
  public lockedKeys: ILayout<boolean>;
  private currentLayout: ILayout<string>;
  private rawRowCache: { [char: string]: number } = {};
  private columnCache: { [char: string]: number } = {};

  constructor(options: LayoutOptions = { name: "pattachote" }) {
    this.name = options.name;
    this.currentLayout = LAYOUTS[this.name];
    this.lockedKeys = (options.lockedKeys || []) as ILayout<boolean>;
  }

  public get matrix() {
    return this.currentLayout;
  }

  public set matrix(layout: ILayout<string>) {
    this.clearCache();
    this.currentLayout = layout;
  }

  public clearCache() {
    this.rawRowCache = {};
    this.columnCache = {};
  }

  public swapKeyPairForLayout() {
    this.currentLayout = swapKeyPair(
      this.currentLayout,
      this.lockedKeys
    ) as ILayout<string>;
    this.clearCache();
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

  public getColumn(char: string): number | undefined {
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
    return FINGER_MAP[this.getColumn(char)!];
  }

  public getHand(char: string) {
    return this.getColumn(char)! <= 5 ? "L" : "R";
  }
}
