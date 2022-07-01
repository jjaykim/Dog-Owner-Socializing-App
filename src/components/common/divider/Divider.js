import React from 'react';
import { View } from 'react-native';

export const Divider = () => {
  return (
    <View>
      <View
        style={{
          width: '200%',
          marginLeft: -33,
          position: 'absolute',
          borderBottomColor: '#F5F5F5',
          borderBottomWidth: 2,
          marginBottom: 20,
        }}
      />
    </View>
  );
};
