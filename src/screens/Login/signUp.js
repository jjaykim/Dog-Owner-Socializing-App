import React, { useState, useCallback, useEffect, useMemo, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import map from 'lodash/map';

import { BackButton } from '../../components/common/backButton/BackButton';
import { ClickButton } from '../../components/common/clickButton/ClickButton';
import { InputBox } from '../../components/common/inputBox/InputBox';
import { Divider } from '../../components/common/divider/Divider';
import colors from '../../styles/colors';
import { HomeViewerContext } from '../../context/HomeViewer';
import { UploadButton } from '../../components/uploadButton/UploadButton';

export const SignUp = ({ navigation }) => {
  const { viewer, setViewer } = useContext(HomeViewerContext);
  const [joined, setJoined] = useState(false);
  const [numOfDog, setNumOfDog] = useState(1);
  const [dogInputBox, setDogInputBox] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: viewer.UserData.length + 1,
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    profilePic: require('../../../assets/default-Image/default-profile.png'),
    dogs: [],
    events: [],
    reviews: [],
  });
  const [dogInfo, setDogInfo] = useState({
    dogs: [
      {
        dogName: '',
        dogBreed: '',
        dogPic: require('../../../assets/default-Image/default-dog-profile.png'),
      },
    ],
  });

  useEffect(() => {
    const key = uuid();
    setDogInputBox([
      {
        id: key,
        render: (
          <View key={key}>
            <View style={styles.inputNameBox}>
              <InputBox
                placeholder="Dog Name"
                width={150}
                value={dogInfo.dogs.dogName}
                onChangeText={(payload) => {
                  const updateDog = { ...dogInfo };

                  updateDog.dogs[0] = { ...updateDog.dogs[0], dogName: payload };

                  setDogInfo(updateDog);
                }}
              />
              <InputBox
                placeholder="Dog Breed"
                width={150}
                value={dogInfo.dogs.dogBreed}
                onChangeText={(payload) => {
                  const updateDog = { ...dogInfo };

                  updateDog.dogs[0] = { ...updateDog.dogs[0], dogBreed: payload };

                  setDogInfo(updateDog);
                }}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <UploadButton btnText="Add Dog Image" />
            </View>
          </View>
        ),
      },
    ]);
  }, []);

  const addMore = useCallback(
    (key) => {
      setNumOfDog(numOfDog + 1);

      const addDog = { ...dogInfo };
      addDog.dogs[numOfDog] = { dogName: '', dogBreed: '', dogPic: '' };

      setDogInfo(addDog);

      setDogInputBox([
        ...dogInputBox,
        {
          id: key,
          render: (
            <View key={key} style={{ marginTop: 20 }}>
              <Divider color="#E0E0E0" />

              <View style={styles.inputNameBox}>
                <InputBox
                  placeholder="Dog Name"
                  width={150}
                  value={dogInfo.dogs.dogName}
                  onChangeText={(payload) => {
                    const updateDog = { ...dogInfo };

                    updateDog.dogs[numOfDog] = {
                      ...updateDog.dogs[numOfDog],
                      dogName: payload,
                    };

                    setDogInfo(updateDog);
                  }}
                />
                <InputBox
                  placeholder="Dog Breed"
                  width={150}
                  value={dogInfo.dogs.dogBreed}
                  onChangeText={(payload) => {
                    const updateDog = { ...dogInfo };

                    updateDog.dogs[numOfDog] = {
                      ...updateDog.dogs[numOfDog],
                      dogBreed: payload,
                    };

                    setDogInfo(updateDog);
                  }}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <UploadButton btnText="Add Dog Image" />
              </View>
            </View>
          ),
        },
      ]);
    },
    [numOfDog, dogInputBox, userInfo],
  );

  const removedogInputBox = useCallback(() => {
    setDogInfo({ dogs: dogInfo.dogs.slice(0, numOfDog - 1) });

    setDogInputBox(dogInputBox.slice(0, numOfDog - 1));
    setNumOfDog(numOfDog - 1);
  }, [numOfDog, dogInputBox, dogInfo]);

  const signUpDisabled = useMemo(() => {
    return (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.age ||
      !userInfo.email ||
      !userInfo.password ||
      !dogInfo.dogs[0].dogName ||
      !dogInfo.dogs[0].dogBreed
    );
  }, [userInfo, dogInfo]);

  const StoreUser = useCallback(async () => {
    setUserInfo({ ...userInfo, dogs: dogInfo.dogs });

    const vaildEmail = viewer.UserData.filter((user) => user.email === userInfo.email);

    if (vaildEmail.length !== 0) {
      Alert.alert('You already signed up!');
    } else {
      await setViewer({
        ...viewer,
        UserData: [...viewer.UserData, { ...userInfo, dogs: dogInfo.dogs }],
      });
    }
  }, [userInfo, dogInfo]);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      {!joined ? (
        <>
          <BackButton
            navigation={navigation}
            header="Create an account with us"
            subHeader="Join our PappyPals community to discover where you love!"
          />

          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={styles.inputTitle}>For Owner 👫</Text>

              <View style={styles.inputNameBox}>
                <InputBox
                  placeholder="First Name"
                  width={150}
                  value={userInfo.firstName}
                  onChangeText={(fname) => setUserInfo({ ...userInfo, firstName: fname })}
                />
                <InputBox
                  placeholder="Last Name"
                  width={150}
                  value={userInfo.lastName}
                  onChangeText={(lname) => setUserInfo({ ...userInfo, lastName: lname })}
                />
              </View>

              <View
                style={{
                  ...styles.inputNameBox,
                  marginTop: 20,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <InputBox
                  placeholder="age"
                  width={100}
                  value={userInfo.age}
                  onChangeText={(payload) => setUserInfo({ ...userInfo, age: payload })}
                />

                <UploadButton btnText="Add Profile" />
              </View>

              <InputBox
                placeholder="Email address"
                marginTop={20}
                value={userInfo.email}
                onChangeText={(payload) => setUserInfo({ ...userInfo, email: payload })}
              />
              <InputBox
                placeholder="password"
                secureTextEntry
                marginTop={20}
                value={userInfo.password}
                onChangeText={(payload) => setUserInfo({ ...userInfo, password: payload })}
              />
            </View>

            <View>
              <Text style={styles.inputTitle}>For Your Dogs 🦮</Text>

              {map(dogInputBox, (box) => {
                return box.render;
              })}
              {numOfDog > 1 && (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                  onPress={removedogInputBox}
                >
                  <Ionicons name="trash-bin" size={20} color={colors.darkGray} />
                </TouchableOpacity>
              )}

              <View
                style={{ justifyContent: 'center', flex: 1, alignItems: 'center', marginTop: 18 }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    addMore(uuid());
                  }}
                >
                  <Text>Add More</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ClickButton
              btnText={`Join with ${numOfDog} Dogs`}
              disabled={signUpDisabled}
              onPress={() => {
                StoreUser();
                setJoined(true);
              }}
            />
          </ScrollView>
        </>
      ) : (
        <>
          <BackButton
            navigation={navigation}
            header={`Welcome ${userInfo.firstName}`}
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
    marginTop: 20,
  },
});
