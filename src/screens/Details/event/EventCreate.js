import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import { BackButton } from '../../../components/common/backButton/BackButton';
import { ClickButton } from '../../../components/common/clickButton/ClickButton';
import { HomeViewerContext } from '../../../context/HomeViewer';
import { InputBox } from '../../../components/common/inputBox/InputBox';

export const EventCreate = ({ navigation, route }) => {
  const parkInfo = route.params.ParkInfo;

  const { viewer, setViewer } = useContext(HomeViewerContext);
  const [joined, setJoined] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    if (!Object.keys(viewer.LoginUser).length) {
      setJoined(false);
    } else {
      setUserInfo(viewer.LoginUser);
      setJoined(true);
    }
  }, [viewer]);

  const createEvent = useCallback(async () => {
    await setViewer({
      ...viewer,
      EventData: [
        ...viewer.EventData,
        {
          id: viewer.EventData.length + 1,
          title: newTitle,
          date: `${newDate}T${newTime}:00.000Z`,
          parkPlaceId: parkInfo.placeId,
          users: [],
          ownerId: userInfo.id,
        },
      ],
    });

    navigation.navigate('DetailScreen', {
      AllReviews: viewer.ReviewData,
      AllEvents: viewer.EventData,
      AllUsers: viewer.UserData,
      ParkInfo: parkInfo,
    });
  }, []);

  if (!joined) {
    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
        <BackButton
          navigation={navigation}
          header="Log in to see more"
          subHeader="Ready to create your event?"
          logo={false}
        />

        <ClickButton
          btnText="Go to Login"
          onPress={() =>
            navigation.replace('LoginScreen', {
              screen: 'Login',
            })
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <BackButton
        navigation={navigation}
        header={`Welcome ${userInfo.fName} 🙌`}
        subHeader="We are ready to create your event"
        logo={false}
        marginTop={10}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 30 }}>
          {/* Title */}
          <View>
            <Text style={styles.subTitle}>✏️Title</Text>
            <InputBox
              placeholder="Title"
              value={newTitle}
              onChangeText={(payload) => setNewTitle(payload)}
            />
          </View>

          {/* Description */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.subTitle}>📝 Description</Text>
            <InputBox placeholder="Description" />
          </View>

          {/* Date */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.subTitle}>📆 Date &amp; ⏰ Time</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <InputBox
                width={150}
                placeholder="YYYY-MM-DD"
                onChangeText={(payload) => setNewDate(payload)}
              />
              <InputBox
                width={150}
                placeholder="HH:MM"
                onChangeText={(payload) => setNewTime(payload)}
              />
            </View>
          </View>

          {/* Location */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.subTitle}>📍 Location</Text>
            <InputBox value={parkInfo.name} editable={false} />
          </View>
        </View>

        <ClickButton btnText="Create" onPress={createEvent} />
      </ScrollView>
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
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 8,
  },
});
