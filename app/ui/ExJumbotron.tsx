/** @format */

// #region ::: IMPORT
import React, { FC, memo } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

interface Props {
  children: JSX.Element | JSX.Element[];
  source: any;
  width?: number;
  height?: number;
  style?: any;
  version?: boolean;
}
const styles = StyleSheet.create({
  viewText: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: Platform.OS == 'ios' ? 16 : 0,
    paddingRight: 16,
  },
  text: {
    color: 'white',
    alignItems: 'flex-end',
    fontWeight: '600',
    fontSize: 12,
  },
  imageBackground: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
});

export const ExJumbotron: FC<Props> = memo(
  ({ children, source, width, version, height, style }: Props): JSX.Element => {
    return (
        <ImageBackground source={source} style={[{...style}, { width: width ? width : '100%', height: height ? height : '100%' }]}>
          <View style={{ flex: 1 }}>
            {version &&
              <View style={styles.viewText}>
                <Text style={styles.text}>Version {DeviceInfo.getVersion()} (build {DeviceInfo.getBuildNumber()})</Text>
              </View>
            }
            {children}
          </View>
        </ImageBackground>
    );
  }
);

ExJumbotron.displayName = 'ExJumbotron';
