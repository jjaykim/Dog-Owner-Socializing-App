import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export const InputBox = ({
  errorMsg,
  placeholder,
  marginTop,
  secureTextEntry,
  width,
  value,
  onChangeText,
  autoCapitalize = 'none',
  editable = true,
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={{ ...styles.inputBox, width }}
        autoCorrect={false}
        marginTop={marginTop}
        placeholderTextColor={colors.darkGray}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
      {errorMsg ? <Text style={{ ...styles.errorMsg, marginLeft: 15 }}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
  },
  errorMsg: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#DC0815',
  },
});
