import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import map from 'lodash/map';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../styles/colors';
import { BackButton } from '../../components/common/backButton/BackButton';

dayjs.extend(utc);
dayjs.extend(timezone);

export const Events = ({ navigation, route }) => {
  const user = route.params.userInfo;
  const events = route.params.Events;
  const parks = route.params.Parks;
  const users = route.params.Users;

  const filteredEvent = useMemo(() => {
    const result = {
      previous: [],
      upComming: [],
    };

    map(user.events, (id) => {
      const today = dayjs();

      if (dayjs(events[id - 1].date).isBefore(today)) {
        result.previous = [
          ...result.previous,
          {
            events: events[id - 1],
            parkName: parks[events[id - 1].parkLocation - 1].name,
            owner: `${users[events[id - 1].ownerId - 1].fName} ${
              users[events[id - 1].ownerId - 1].lName
            }`,
          },
        ];
      } else {
        result.upComming = [
          ...result.upComming,
          {
            events: events[id - 1],
            parkName: parks[events[id - 1].parkLocation - 1].name,
            owner: `${users[events[id - 1].ownerId - 1].fName} ${
              users[events[id - 1].ownerId - 1].lName
            }`,
          },
        ];
      }
    });

    return result;
  }, [events]);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <View style={{ flex: 1 }}>
          <BackButton navigation={navigation} />
        </View>

        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Events</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={styles.subTitle}>📅 Up Comming</Text>
          </View>

          {map(filteredEvent.upComming, (event, idx) => {
            const convertedDate = dayjs(event.events.date).format('dddd, MMMM DD, YYYY | h:mmA');

            const date = convertedDate.split('|')[0];
            const time = convertedDate.split('|')[1];

            return (
              <View key={idx} style={styles.eventBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.subTitle}>{event.events.title}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('Edit Event', 'Are you sure?', [
                        { text: 'Cancel', style: 'destructive' },

                        {
                          text: "I'm Sure",
                        },
                      ]);
                    }}
                  >
                    <Ionicons name="ios-pencil" size={15} color="#212121" />
                  </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                    }}
                  >
                    <Ionicons name="ios-calendar" size={15} color="#212121" />

                    <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4 }}>
                      <Text style={{ fontWeight: '500' }}>{date} </Text>
                      <Text style={{ color: colors.darkGray }}>at</Text>
                      <Text style={{ fontWeight: '500' }}>{time}</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                    <Ionicons name="ios-person" size={15} color="#212121" />
                    <Text style={{ marginLeft: 4, color: colors.darkGray }}>Owenr by</Text>
                    <Text style={{ fontWeight: '500', fontSize: 15 }}>{event.owner}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                    <Ionicons name="ios-location" size={15} color="#212121" />
                    <Text style={{ marginLeft: 4 }}>{event.parkName}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={styles.subTitle}>🗄 Previous</Text>
          </View>

          {map(filteredEvent.previous, (event, idx) => {
            const convertedDate = dayjs(event.events.date).format('dddd, MMMM DD, YYYY | h:mmA');

            const date = convertedDate.split('|')[0];
            const time = convertedDate.split('|')[1];

            return (
              <View key={idx} style={styles.eventBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.subTitle}>{event.events.title}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('Delete Event', 'Are you sure?', [
                        { text: 'Cancel', style: 'destructive' },

                        {
                          text: "I'm Sure",
                        },
                      ]);
                    }}
                  >
                    <Ionicons name="trash-bin" size={15} color="#212121" />
                  </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                    }}
                  >
                    <Ionicons name="ios-calendar" size={15} />

                    <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4 }}>
                      <Text style={{ fontWeight: '500' }}>{date} </Text>
                      <Text style={{ color: colors.darkGray }}>at</Text>
                      <Text style={{ fontWeight: '500' }}>{time}</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                    <Ionicons name="ios-person" size={15} color="#212121" />
                    <Text style={{ marginLeft: 4, color: colors.darkGray }}>Owenr by</Text>
                    <Text style={{ fontWeight: '500', fontSize: 15 }}>{event.owner}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                    <Ionicons name="ios-location" size={15} color="#212121" />
                    <Text style={{ marginLeft: 4 }}>{event.parkName}</Text>
                  </View>
                </View>
              </View>
            );
          })}
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
  subTitle: { fontSize: 20, fontWeight: '600', letterSpacing: 1 },
  eventBox: {
    marginTop: 20,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
});
