import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export const ClickButton = ({ btnText, onPress = null, disabled = false }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: disabled ? colors.gray : colors.blueGreen,
          borderColor: disabled ? colors.gray : colors.blueGreen,
        }}
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={{ color: colors.white }}>{btnText}</Text>
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
