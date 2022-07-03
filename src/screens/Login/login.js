import React, { useState, useContext, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '../../components/common/backButton/BackButton';
import { ClickButton } from '../../components/common/clickButton/ClickButton';
import { InputBox } from '../../components/common/inputBox/InputBox';
import { HomeViewerContext } from '../../context/HomeViewer';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const { viewer, setViewer } = useContext(HomeViewerContext);

  const login = useCallback(async () => {
    const LoginUser = viewer.UserData.filter((user) => {
      if (user.email !== email && user.password === password) {
        setEmailErrorMsg('Your email doen not match');
      }

      if (user.password !== password && user.email === email) {
        setPasswordErrorMsg('Your password doen not match');
      }

      return user.email === email && user.password === password;
    });

    if (LoginUser.length === 0) {
      Alert.alert('The email or password you entered is incorrect.');
      setEmail('');
      setPassword('');
    } else {
      await setViewer({
        ...viewer,
        LoginUser: LoginUser[0],
      });

      navigation.navigate('HomeScreen');
    }
  });

  const loginDisabled = useMemo(() => {
    return !email || !password;
  }, [email, password]);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <BackButton
        navigation={navigation}
        header="Welcome aboard!"
        subHeader="Ready to discover where you go?"
      />

      <View>
        <InputBox
          placeholder="Email address"
          marginTop={40}
          value={email}
          onChangeText={(payload) => setEmail(payload)}
          errorMsg={emailErrorMsg}
        />
        <InputBox
          placeholder="password"
          secureTextEntry
          marginTop={30}
          value={password}
          onChangeText={(payload) => setPassword(payload)}
          errorMsg={passwordErrorMsg}
        />
      </View>

      <View style={styles.forgotBox}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <ClickButton btnText="Login" onPress={login} disabled={loginDisabled} />

      <View style={styles.signupBox}>
        <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 18, color: '#616161' }}>
          Don&apos;t have an account?
        </Text>

        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.push('SignUp')}>
          <Text>Sign up</Text>
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
