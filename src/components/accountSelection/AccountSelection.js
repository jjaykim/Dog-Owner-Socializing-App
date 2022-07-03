import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import RightArrowIcon from '../common/icons/RightArrowIcon';

export const AccountSelection = ({ text, onPress }) => {
  return (
    <View style={{ borderBottomColor: '#F5F5F5', borderBottomWidth: 2 }}>
      <TouchableOpacity style={styles.accountBox} onPress={onPress} activeOpacity={0.7}>
        <Text>{text}</Text>
        <RightArrowIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  accountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 34,
    paddingBottom: 30,
  },
});
