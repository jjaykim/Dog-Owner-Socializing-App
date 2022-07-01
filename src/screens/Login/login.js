import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '../../components/backButton/BackButton';
import { ClickButton } from '../../components/clickButton/ClickButton';
import { InputBox } from '../../components/common/inputBox/InputBox';

export const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <BackButton
        navigation={navigation}
        header="Welcome aboard!"
        subHeader="Ready to discover where you go?"
      />

      <View>
        <InputBox placeholder="Email address" marginTop={40} />
        <InputBox placeholder="password" secureTextEntry marginTop={30} />
      </View>

      <View style={styles.forgotBox}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <ClickButton btnText="Login" />

      <View style={styles.signupBox}>
        <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 18, color: '#616161' }}>
          Don&apos;t have an account?
        </Text>

        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SignUp')}>
          <Text>Sin up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 16,
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
