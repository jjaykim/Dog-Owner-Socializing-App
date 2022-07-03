import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import colors from '../../../styles/colors';
import LeftArrowIcon from '../icons/LeftArrowIcon';
import LogoTitle from '../icons/LogoTitle';

export const BackButton = ({ navigation, header, subHeader }) => {
  return (
    <View>
      <View style={{ marginTop: '8%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrowIcon />
        </TouchableOpacity>
      </View>

      {header && subHeader ? (
        <View style={{ marginTop: 40 }}>
          <LogoTitle />

          <Text style={styles.header}>{header}</Text>

          <Text style={styles.subHeader}>{subHeader}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'left',
    color: '#212121',
    marginTop: 30,
  },
  subHeader: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: colors.darkGray,
    textAlign: 'left',
    marginTop: 10,
  },
});
