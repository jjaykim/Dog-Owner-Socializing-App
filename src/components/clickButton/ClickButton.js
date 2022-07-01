import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export const ClickButton = ({ btnText, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={onPress}>
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
    backgroundColor: colors.blueGreen,
    borderColor: colors.blueGreen,
    marginTop: 40,
  },
});
