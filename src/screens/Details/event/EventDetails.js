import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import map from 'lodash/map';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';

import colors from '../../../styles/colors';
import { BackButton } from '../../../components/common/backButton/BackButton';
import { CircleImage } from '../../../components/circle_image/CircleImage';
import { ClickButton } from '../../../components/common/clickButton/ClickButton';
import { HomeViewerContext } from '../../../context/HomeViewer';
import { InputBox } from '../../../components/common/inputBox/InputBox';

export const EventDetails = ({ navigation, route }) => {
  const usersData = route.params.UsersData;
  const parkInfo = route.params.ParkInfo;

  const [events, setEvents] = useState(route.params.EventData);

  const [clickCreate, setClickCreate] = useState(false);
  const { viewer, setViewer } = useContext(HomeViewerContext);
  const [joined, setJoined] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const numOfEvent = useRef(viewer.EventData.length);

  const storeEvent = async () => {
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
          ownerId: viewer.LoginUser.id,
        },
      ],
    });
  };

  useEffect(() => {
    if (!Object.keys(viewer.LoginUser).length) {
      setJoined(false);
    } else {
      setJoined(true);
    }
  }, [viewer]);

  useEffect(() => {
    if (viewer.EventData.length > numOfEvent.current) {
      const filtered = filter(viewer.EventData, (e) => e.parkPlaceId === parkInfo.placeId);
      const sorted = orderBy(
        map(filtered, (e) => {
          return {
            event: e,
            owner: `${usersData[e.ownerId - 1].fName} ${usersData[e.ownerId - 1].lName}`,
            profilePic: usersData[e.ownerId - 1].profilePic,
          };
        }),
        ['event.date'],
        ['desc'],
      );

      setEvents(sorted);
      numOfEvent.current += 1;
    }
  }, [viewer, events, numOfEvent]);

  // user not login
  if (clickCreate && !joined) {
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

  // Create Event form
  if (clickCreate && joined) {
    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
        <BackButton
          navigation={navigation}
          header={`Welcome ${viewer.LoginUser.fName} 🙌`}
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
              <InputBox placeholder="Title" onChangeText={(payload) => setNewTitle(payload)} />
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

          <ClickButton
            btnText="Create"
            onPress={() => {
              storeEvent();
              setClickCreate(false);
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <SafeAreaView style={{ marginHorizontal: '8%', flex: 1 }}>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <View style={{ flex: 1 }}>
            <BackButton navigation={navigation} />
          </View>

          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>Events</Text>
          </View>
        </View>

        <ClickButton btnText="Create Event" onPress={() => setClickCreate(true)} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {map(events, (item, idx) => {
              const convertedDate = dayjs(item.event.date).format('dddd, MMMM DD, YYYY | h:mmA');

              const date = convertedDate.split('|')[0];
              const time = convertedDate.split('|')[1];

              return (
                <View key={idx} style={styles.contentBox}>
                  {/* Event Title */}
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>{item.event.title}</Text>
                  </View>

                  {/* Event Owner */}
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginTop: 6,
                    }}
                  >
                    <Text style={{ marginLeft: 4, color: colors.darkGray, marginRight: 5 }}>
                      Owner:
                    </Text>

                    <CircleImage image={item.profilePic} width={20} />
                    <Text style={{ fontWeight: '500' }}>{item.owner}</Text>
                  </View>

                  {/* Event Date */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 8,
                      marginLeft: 14,
                    }}
                  >
                    <Text style={{ fontWeight: '500' }}>📆 {date}</Text>
                    <Text style={{ color: colors.lightGray }}>at</Text>
                    <Text style={{ fontWeight: '500' }}>{time}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 14,
                      borderBottomColor: colors.lightGray,
                      borderBottomWidth: 0.4,
                      paddingBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    <Ionicons name="ios-person" size={15} color="#212121" style={{ zIndex: 1 }} />

                    <View style={styles.peopleNumCircle}>
                      <Text style={styles.peopleNum}>{item.event.users.length}</Text>
                    </View>

                    <Text style={{ marginLeft: 4, fontWeight: '500' }}>Participant</Text>
                  </View>

                  <View style={{ marginLeft: 10, marginTop: 10 }}>
                    {map(item.event.users, (id, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            paddingBottom: 14,
                            alignItems: 'center',
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                            <CircleImage image={usersData[id - 1].profilePic} width={25} />

                            <Text style={{ marginLeft: 4, fontSize: 15, fontWeight: '600' }}>
                              {usersData[id - 1].fName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                marginTop: 6,
                                color: colors.lightGray,
                                marginLeft: 7,
                              }}
                            >
                              With
                            </Text>
                          </View>

                          <View style={{ flexDirection: 'row', flex: 0.7, alignItems: 'center' }}>
                            <View>
                              <CircleImage image={usersData[id - 1].dogs[0].dogPic} width={25} />
                            </View>

                            <View style={{ marginLeft: 8 }}>
                              <Text style={{ fontSize: 15, fontWeight: '600' }}>
                                {usersData[id - 1].dogs[0].dogName} /{' '}
                                {usersData[id - 1].dogs[0].dogBreed}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 2,
    marginTop: 3,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 4,
    letterSpacing: 2,
    marginTop: 2,
  },
  contentBox: {
    flexDirection: 'column',
    borderWidth: 0.4,
    borderStyle: 'solid',
    borderColor: colors.lightGray,
    borderRadius: 20,
    padding: '2%',
    marginTop: 18,
  },
  peopleNumCircle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueGreen,
    borderColor: colors.blueGreen,
    marginTop: -6,
    marginLeft: -8,
    zIndex: 0,
  },
  peopleNum: {
    fontSize: 9,
    color: colors.white,
    marginLeft: 1,
    marginTop: -1,
  },
});
