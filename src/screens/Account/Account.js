import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { LogoHeader } from '../../components/logoHeader/LogoHeader';
import { CircleImage } from '../../components/circle_image/CircleImage';
import colors from '../../styles/colors';
import { HomeViewerContext } from '../../context/HomeViewer';
import { ClickButton } from '../../components/common/clickButton/ClickButton';
import { Divider } from '../../components/common/divider/Divider';
import { AccountSelection } from '../../components/accountSelection/AccountSelection';

export const Account = ({ navigation }) => {
  const { viewer, setViewer } = useContext(HomeViewerContext);
  const userInfo = viewer.LoginUser;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LogoHeader onPress={() => navigation.navigate('HomeScreen')} />

      {!Object.keys(userInfo).length ? (
        <View style={{ marginTop: 80 }}>
          <Text style={{ fontWeight: '600', fontSize: 18 }}>Please Login to continue</Text>
          <ClickButton btnText="Login" onPress={() => navigation.navigate('LoginScreen')} />
        </View>
      ) : (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <CircleImage image={userInfo.profilePic} width={50} />
            <View style={styles.profileTextBox}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {userInfo.fName} {userInfo.lName}
              </Text>
              <Text style={styles.welcomeText}>Welcom to back!</Text>
            </View>
          </View>

          <View style={{ marginTop: 20, marginLeft: 18 }}>
            <Divider color={colors.lightGray} width="115%" />
          </View>

          <View>
            <AccountSelection
              text="Personal Information"
              onPress={() => navigation.push('PersonalInfoScreen', { userInfo })}
            />
            <AccountSelection
              text="Reviews"
              onPress={() =>
                navigation.push('ReviewsScreen', {
                  userInfo,
                  Reviews: viewer.ReviewData,
                  Parks: viewer.ParkData,
                })
              }
            />
            <AccountSelection
              text="Events"
              onPress={() =>
                navigation.push('EventsScreen', {
                  userInfo,
                  Events: viewer.EventData,
                  Parks: viewer.ParkData,
                  Users: viewer.UserData,
                })
              }
            />
          </View>

          <TouchableOpacity
            style={styles.logoutBox}
            onPress={() => {
              Alert.alert('Log out', 'Are you sure?', [
                { text: 'Cancel', style: 'destructive' },

                {
                  text: "I'm Sure",
                  onPress: async () => {
                    await setViewer({
                      ...viewer,
                      LoginUser: {},
                    });
                    navigation.navigate('HomeScreen');
                  },
                },
              ]);
            }}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  profileTextBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.darkGray,
  },
  logoutBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logoutText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 14,
  },
});
