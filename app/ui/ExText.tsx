/** @format */

// #region ::: IMPORT
import React, { FC } from 'react';
import { Text } from 'react-native';
import { mapFontsSize } from '../themes/fonts/mapFontsSizes';
import { mapFontsTransforms } from '../themes/fonts/mapFontsTransforms';
import { mapFontsWeights } from '../themes/fonts/mapFontsWeights';
import { mapColors } from '../themes/mapColors';

interface Props {
    children: any;
    size?: number;
    weight?: any;
    color?: any;
    transform?: any;
    numberOfLines?: number;
    textAlign?: any;
    disabled?: boolean;
    style?: any;
    multiline?: boolean;
}

export const ExText: FC<Props> = ({
 children,
 size = mapFontsSize.f5,
 weight = mapFontsWeights.regular,
 color = mapColors.text,
 transform = mapFontsTransforms.none,
 numberOfLines = 1,
 textAlign = "center",
 disabled = false,
 style = {},
 multiline = false,
}: Props): JSX.Element => {

 return (
  <Text
    style={[{...style}, { fontSize: size, fontWeight: weight, color, textTransform: transform, textAlign }]}
    numberOfLines={multiline ? 0 : numberOfLines}
    disabled={disabled}>
     {children}
  </Text>
 );
};
ExText.displayName = 'ExText';