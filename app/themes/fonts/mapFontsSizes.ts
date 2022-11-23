/** @format */

export interface TFontSizeValues {
  f1: number;
  f2: number;
  f3: number;
  f4: number;
  f5: number;
  f6: number;
  f7: number;
  f8: number;
  f9: number;
  f10: number;
  f11: number;
  f12: number;
}

export type TFontSize = keyof TFontSizeValues;

export const mapFontsSize: TFontSizeValues = {
  f1 : 10,
  f2 : 12,
  f3 : 14,
  f4 : 16,
  f5 : 18,
  f6 : 20,
  f7 : 22,
  f8 : 24,
  f9 : 26,
  f10 : 28,
  f11 : 30,
  f12 : 32,
}

