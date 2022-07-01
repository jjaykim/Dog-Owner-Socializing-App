import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Divider } from '../common/divider/Divider';
import PuppyPalsLogo from '../common/icons/Logo';

export const Header = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.menuWrapper}>
        <PuppyPalsLogo />

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.loginTouchBox}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <View style={styles.loginLabelBox}>
            <Text>Login</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Divider />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 30,
    marginBottom: 10,
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
    borderColor: '#E0E0E0',
  },
  loginLabelBox: {
    width: 75,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
