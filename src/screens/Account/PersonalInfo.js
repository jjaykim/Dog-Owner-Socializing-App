import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import map from 'lodash/map';

import colors from '../../styles/colors';
import { BackButton } from '../../components/common/backButton/BackButton';
import { CircleImage } from '../../components/circle_image/CircleImage';

export const PersonalInfo = ({ navigation, route }) => {
  const user = route.params.userInfo;
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <View style={{ flex: 1 }}>
          <BackButton navigation={navigation} />
        </View>

        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: 'row' }}>
            <CircleImage image={user.profilePic} width={50} />
            <View style={styles.profileTextBox}>
              <Text style={styles.profileText}>Hello {user.fName}!</Text>
              <TouchableOpacity>
                <Text style={styles.welcomeText}>Update photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: '5%', marginTop: 30 }}>
          <View>
            <Text style={styles.subTitle}>For Owner 👫</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.itemBox, flex: 1 }}>
              <Text style={styles.itemTitle}>First Name</Text>
              <Text style={{ fontSize: 18 }}>{user.fName}</Text>
            </View>

            <View style={{ flex: 0.2 }} />

            <View style={{ ...styles.itemBox, flex: 1 }}>
              <Text style={styles.itemTitle}>Last Name</Text>
              <Text style={{ fontSize: 18 }}>{user.lName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.itemBox, flex: 1 }}>
              <Text style={styles.itemTitle}>Email address</Text>
              <Text style={{ fontSize: 18 }}>{user.email}</Text>
            </View>

            <View style={{ flex: 0.2 }} />

            <View style={{ ...styles.itemBox, flex: 0.2 }}>
              <Text style={styles.itemTitle}>Age</Text>
              <Text style={{ fontSize: 18 }}>{user.age}</Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.subTitle}>For Dogs 🦮</Text>

            {map(user.dogs, (dog, idx) => {
              return (
                <View style={{ flexDirection: 'row' }} key={idx}>
                  <View style={{ ...styles.itemBox, flex: 1 }}>
                    <Text style={styles.itemTitle}>Dog Name</Text>
                    <Text style={{ fontSize: 18 }}>{dog.dogName}</Text>
                  </View>

                  <View style={{ flex: 0.2 }} />

                  <View style={{ ...styles.itemBox, flex: 1 }}>
                    <Text style={styles.itemTitle}>Dog Breed</Text>
                    <Text style={{ fontSize: 18 }}>{dog.dogBreed}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              style={styles.resetBtn}
              activeOpacity={0.5}
              onPress={() => {
                Alert.alert('Reset Password', 'Are you sure?', [
                  { text: 'Cancel', style: 'destructive' },

                  {
                    text: "I'm Sure",
                  },
                ]);
              }}
            >
              <Text style={{ textDecorationLine: 'underline' }}>Reset password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 2,
    marginTop: 3,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 20, marginLeft: 8, letterSpacing: 2 },
  profileTextBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  profileText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.darkGray,
  },
  subTitle: { fontSize: 20, fontWeight: '600', letterSpacing: 1, marginLeft: -10 },
  itemBox: {
    flexDirection: 'column',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    height: 60,
    marginTop: 20,
  },
  itemTitle: {
    fontWeight: '400',
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 12,
  },
  resetBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 40,
  },
});
