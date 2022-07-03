import React from 'react';
import { View } from 'react-native';

export const Divider = ({ color = '#F5F5F5', width = '200%' }) => {
  return (
    <View>
      <View
        style={{
          width,
          marginLeft: -33,
          position: 'absolute',
          borderBottomColor: color,
          borderBottomWidth: 2,
          marginBottom: 20,
        }}
      />
    </View>
  );
};
