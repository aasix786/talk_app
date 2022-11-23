/** @format */

import { mapFontsSize, TFontSizeValues } from './mapFontsSizes';
import { mapFontsWeights, TFontWeightValues } from './mapFontsWeights';
import { mapFontsTransforms, TFontTransformValues } from './mapFontsTransforms';

export interface TFontValues {
  size: TFontSizeValues;
  weight: TFontWeightValues;
  transform: TFontTransformValues;
}

export const mapFonts: TFontValues = {
  size: mapFontsSize,
  weight: mapFontsWeights,
  transform: mapFontsTransforms,
};
