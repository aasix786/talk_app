/** @format */

export interface TFontTransformValues {
  lowercase: string;
  uppercase: string;
  capitalize: string;
  none: string;
}

export type TFontTransform = keyof TFontTransformValues;

export const mapFontsTransforms: TFontTransformValues = {
  lowercase : 'lowercase',
  uppercase : 'uppercase',
  capitalize : 'capitalize',
  none : 'none',
}
