import React from 'react';
import { TextInput, View, Text } from 'react-native';

export const InputBox = (props) => {
  const { error } = props;
  return (
    <View>
      <TextInput {...props} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};
