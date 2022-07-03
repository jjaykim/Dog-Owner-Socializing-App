import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import PlusIcon from '../common/icons/PlusIcon';

export const UploadButton = ({ btnText, onPress = null, disabled = false }) => {
  return (
    <View style={styles.wrapView}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.textBox}>
          <Text style={{ paddingRight: 8, color: colors.darkGray }}>{btnText}</Text>
          <PlusIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'dotted',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderColor: '#9E9E9E',
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
