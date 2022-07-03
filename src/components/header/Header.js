import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CircleImage } from '../circle_image/CircleImage';
import { Divider } from '../common/divider/Divider';
import PuppyPalsLogo from '../common/icons/Logo';

export const Header = ({ navigation, LoginUser }) => {
  return (
    <SafeAreaView>
      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
          <PuppyPalsLogo />
        </TouchableOpacity>

        {!LoginUser ? (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.loginTouchBox}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <View style={styles.loginLabelBox}>
              <Text>Login</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.profile}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AccountTab')}
          >
            <CircleImage
              image={
                LoginUser.profilePic
                  ? LoginUser.profilePic
                  : require('../../../assets/default-Image/default-profile.png')
              }
            />
          </TouchableOpacity>
        )}
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
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 16,
    paddingTop: 10,
  },
});
