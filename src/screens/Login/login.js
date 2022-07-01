import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LeftArrow from '../../components/common/icons/LeftArrow';
import LogoTitle from '../../components/common/icons/LogoTitle';
import { InputBox } from '../../components/common/inputBox/InputBox';
import colors from '../../styles/colors';

export const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <View style={{ marginTop: '8%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrow />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 40 }}>
        <LogoTitle />

        <Text style={styles.header}>Welcome aboard!</Text>

        <Text style={styles.subHeader}>Ready to discover where you go?</Text>
      </View>

      <View>
        <InputBox
          placeholder="Email address"
          style={styles.inputBox}
          autoCapitalize="none"
          autoCorrect={false}
          marginTop={40}
        />
        <InputBox
          placeholder="password"
          style={styles.inputBox}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          marginTop={30}
        />
      </View>

      <View style={styles.forgotBox}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.loginBtn} activeOpacity={0.5}>
          <Text style={{ color: colors.white }}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupBox}>
        <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 18, color: '#616161' }}>
          Don&apos;t have an account?
        </Text>

        <TouchableOpacity activeOpacity={0.5}>
          <Text>Sin up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'left',
    color: '#212121',
    marginTop: 30,
  },
  subHeader: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#616161',
    textAlign: 'left',
    marginTop: 10,
  },
  inputBox: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
  },
  forgotBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  loginBtn: {
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
  signupBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 55,
  },
});
