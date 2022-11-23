/** @format */

export interface TFontWeightValues {
  thin: string;
  light: string;
  regular: string;
  bold: string;
}

export type TFontWeight = keyof TFontWeightValues;

export const mapFontsWeights: TFontWeightValues = {
  thin : '400',
  light : '600',
  regular : 'normal',
  bold : 'bold',
}
