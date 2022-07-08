import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';
import repeat from 'lodash/repeat';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import colors from '../../styles/colors';
import { BackButton } from '../../components/common/backButton/BackButton';
import { CircleImage } from '../../components/circle_image/CircleImage';

const { height } = Dimensions.get('window');

export const ParkDetails = ({ navigation, route }) => {
  // Park
  const Park = route.params.ParkInfo;

  // Events
  const eventData = route.params.AllEvents;
  const usersData = route.params.AllUsers;

  // Reviews
  const reviewData = route.params.AllReviews;

  const sortEvents = orderBy(
    map(Park.events, (id) => {
      return {
        event: eventData[id - 1],
        owner: `${usersData[eventData[id - 1].ownerId - 1].fName} ${
          usersData[eventData[id - 1].ownerId - 1].lName
        }`,
        profilePic: usersData[eventData[id - 1].ownerId - 1].profilePic,
      };
    }),
    ['event.date'],
    ['desc'],
  );

  const sortReviews = orderBy(
    map(Park.reviews, (id) => {
      return {
        review: reviewData[id - 1],
        user: `${usersData[reviewData[id - 1].userId - 1].fName} ${
          usersData[reviewData[id - 1].userId - 1].lName
        }`,
      };
    }),
    ['review.date'],
    ['desc'],
  );

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <SafeAreaView style={{ marginHorizontal: '8%' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Map View */}
          <View style={{ marginTop: 10 }}>
            <View style={{ zIndex: 2, position: 'relative', marginLeft: 20 }}>
              <View style={{ marginTop: 10, position: 'absolute' }}>
                <BackButton navigation={navigation} />
              </View>
            </View>

            <MapView
              style={styles.backgroundImage}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: Park.latitude,
                longitude: Park.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
            >
              <Marker
                coordinate={{
                  latitude: Park.latitude,
                  longitude: Park.longitude,
                }}
                title={Park.name}
                description={Park.address}
              />
            </MapView>
          </View>

          {/* DOG PARK TITLE */}
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.parkTitle}>{Park.name}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <Ionicons name="ios-location" size={15} color="#212121" />
                <Text style={styles.parkDetails} onPress={() => Linking.openURL(Park.googleLink)}>
                  {Park.address}
                </Text>
              </View>
            </View>
          </View>

          {/* People in the park */}
          <View style={styles.boxBorder}>
            <View style={styles.reviewHeaderBox}>
              <Text style={{ fontWeight: '700', fontSize: 20, letterSpacing: 1 }}>
                👫 Who is there
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.push('PeopleDetails', {
                    PeopleData: Park.livePeople,
                    UsersData: usersData,
                  })
                }
              >
                <Text style={{ fontSize: 12, color: colors.blueGreen }}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
              {map(Park.livePeople, (id, index) => {
                return (
                  <View key={index} style={styles.livePeopleBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.4 }}>
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
                          {usersData[id - 1].dogs[0].dogName} / {usersData[id - 1].dogs[0].dogBreed}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Parks Details */}
          {/* REVIEWS */}
          <View style={styles.boxBorder}>
            <View style={styles.reviewHeaderBox}>
              <Text style={{ fontWeight: '700', fontSize: 20, letterSpacing: 1 }}>📝 Reviews</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.push('ReviewDetails', {
                    ReviewData: sortReviews,
                    UsersData: usersData,
                  })
                }
              >
                <Text style={{ fontSize: 12, color: colors.blueGreen }}>View All</Text>
              </TouchableOpacity>
            </View>

            <View>
              {map(sortReviews, (item, idx) => {
                return (
                  <View key={idx} style={styles.contentBox}>
                    <View style={styles.contentHeader}>
                      <Text>{repeat('⭐️', item.review.rate)}</Text>
                      <Text style={{ fontWeight: '600', fontSize: 18, marginTop: 4 }}>
                        &quot;{item.review.comment}&quot;
                      </Text>
                    </View>

                    <View style={styles.reviewBox}>
                      {/* Owner */}
                      <View style={styles.ownerBox}>
                        <CircleImage
                          image={usersData[item.review.userId - 1].profilePic}
                          width={30}
                        />
                        <Text style={{ fontWeight: '500', marginLeft: 4 }}>{item.user}</Text>
                      </View>

                      {/* Date */}
                      <View style={styles.dateBox}>
                        <Text>📆 {dayjs(item.review.date).format('YYYY-MM-DD')}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* EVENTS */}
          <View style={styles.eventsHeaderBox}>
            <Text style={{ fontWeight: '700', fontSize: 20, letterSpacing: 1 }}>🎫 Events</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.push('EventNav', {
                  screen: 'EventDetails',
                  params: {
                    EventData: sortEvents,
                    UsersData: usersData,
                    ParkInfo: Park,
                  },
                })
              }
            >
              <Text style={{ fontSize: 12, color: colors.blueGreen }}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {map(sortEvents, (item, idx) => {
              const convertedDate = dayjs(item.event.date).format('dddd, MMMM DD, YYYY | h:mmA');

              const date = convertedDate.split('|')[0];
              const time = convertedDate.split('|')[1];

              return (
                <View key={idx} style={styles.contentBox}>
                  {/* Event Title */}
                  <View style={styles.contentHeader}>
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>{item.event.title}</Text>
                  </View>

                  {/* Event Owner */}
                  <View style={{ ...styles.ownerBox, marginTop: 6 }}>
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

                  <View style={{ flexDirection: 'column', marginTop: 8, marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 6 }}>
                      <Ionicons name="ios-person" size={15} color="#212121" style={{ zIndex: 1 }} />

                      <View style={styles.peopleNumCircle}>
                        <Text style={styles.peopleNum}>{item.event.users.length}</Text>
                      </View>

                      <Text style={{ marginLeft: 4, fontWeight: '500' }}>Participant</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                      {map(item.event.users, (id, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              marginRight: 8,
                              flexDirection: 'row',
                            }}
                          >
                            <View style={{ zIndex: 1 }}>
                              <CircleImage image={usersData[id - 1].profilePic} width={25} />
                            </View>

                            <View style={{ marginLeft: -10, zIndex: 0 }}>
                              <CircleImage image={usersData[id - 1].dogs[0].dogPic} width={25} />
                            </View>
                          </View>
                        );
                      })}
                    </View>
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
  parkTitle: {
    fontWeight: '700',
    fontSize: 24,
    paddingLeft: 10,
  },
  parkDetails: {
    fontWeight: '100',
    fontSize: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  reviewHeaderBox: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentBox: {
    flexDirection: 'column',
    borderWidth: 0.4,
    borderStyle: 'solid',
    borderColor: colors.lightGray,
    borderRadius: 20,
    padding: 14,
    marginTop: 18,
  },
  reviewBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 3,
    paddingRight: 18,
  },
  ownerBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  dateBox: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsHeaderBox: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  events: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'darkslategray',
    borderRadius: 20,
    flexDirection: 'column',
  },

  backgroundImage: {
    height: height * 0.3,
    justifyContent: 'space-between',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: -1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
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
  boxBorder: {
    borderBottomWidth: 0.3,
    borderBottomColor: colors.lightGray,
    paddingBottom: 20,
  },
  livePeopleBox: {
    marginRight: 8,
    flexDirection: 'row',
    borderWidth: 0.4,
    flex: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
