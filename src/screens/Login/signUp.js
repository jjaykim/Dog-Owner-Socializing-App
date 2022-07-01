import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '../../components/backButton/BackButton';
import { ClickButton } from '../../components/clickButton/ClickButton';
import { InputBox } from '../../components/common/inputBox/InputBox';

export const SignUp = ({ navigation }) => {
  const [joined, SetJoined] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      {!joined ? (
        <>
          <BackButton
            navigation={navigation}
            header="Create an account with us"
            subHeader="Join our PappyPals community to discover where you love!"
          />

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View>
              <Text style={styles.inputTitle}>For Owner 👫</Text>

              <View style={styles.inputNameBox}>
                <InputBox placeholder="First Name" width={150} />
                <InputBox placeholder="Last Name" width={150} />
              </View>

              <View style={{ ...styles.inputNameBox, marginTop: 20 }}>
                <InputBox placeholder="age" width={100} />
                <InputBox placeholder="Upload Profil Picture" width={200} />
              </View>

              <InputBox placeholder="Email address" marginTop={20} />
              <InputBox placeholder="password" secureTextEntry marginTop={20} />
            </View>

            <View>
              <Text style={styles.inputTitle}>For Your Dog 🦮</Text>

              <View style={styles.inputNameBox}>
                <InputBox placeholder="Dog Name" width={150} />
                <InputBox placeholder="Dog Breed" width={150} />
              </View>

              <InputBox placeholder="Upload Dog Pictures" marginTop={20} />
            </View>

            <ClickButton btnText="Join" onPress={() => SetJoined(true)} />
          </ScrollView>
        </>
      ) : (
        <>
          <BackButton
            navigation={navigation}
            header="Welcome UserName and DogName"
            subHeader="Discover wonderful parks with us!"
          />

          <ClickButton btnText="Go to Login" onPress={() => navigation.navigate('Login')} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    marginTop: 40,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
  },
  inputNameBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
