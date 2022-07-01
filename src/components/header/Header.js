import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../../styles/colors';
import PuppyPalsLogo from '../common/icons/Logo';

export const Header = () => {
  return (
    <SafeAreaView>
      <View style={styles.menuWrapper}>
        <PuppyPalsLogo />

        <TouchableOpacity activeOpacity={0.5} style={styles.loginTouchBox}>
          <View style={styles.loginLabelBox}>
            <Text>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  loginTouchBox: {
    borderRadius: 28,
    borderWidth: 1.4,
    borderStyle: 'solid',
  },
  loginLabelBox: {
    width: 75,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
