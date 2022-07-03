import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export const ClickButton = ({
  btnText,
  onPress = null,
  disabled = false,
  btnColor = colors.blueGreen,
  textColor = colors.white,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: disabled ? colors.gray : btnColor,
          borderColor: disabled ? colors.gray : btnColor,
        }}
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={{ color: textColor }}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 40,
  },
});
