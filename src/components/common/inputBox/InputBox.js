import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

export const InputBox = ({ errorMsg, placeholder, marginTop, secureTextEntry, width }) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={{ ...styles.inputBox, width }}
        autoCapitalize="none"
        autoCorrect={false}
        marginTop={marginTop}
        placeholderTextColor="#616161"
        secureTextEntry={secureTextEntry}
      />
      {errorMsg ? <Text>{errorMsg}</Text> : null}
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
});
