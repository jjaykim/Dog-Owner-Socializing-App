import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import repeat from 'lodash/repeat';

import colors from '../../styles/colors';
import { BackButton } from '../../components/common/backButton/BackButton';
import { CircleImage } from '../../components/circle_image/CircleImage';

const { height } = Dimensions.get('window');

export const ParkDetails = ({ navigation, route }) => {
  // const [lat, setLat] = useState();
  // const [lon, setLon] = useState();

  // useEffect(() => {
  //   if (Park) {
  //     setLat(Park.latitude);
  //     setLon(Park.longitude);
  //   }
  // }, []);

  const Park = route.params.ParkInfo;
  const lati = route.params.lat;
  const long = route.params.lon;

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
  );

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <SafeAreaView style={{ marginHorizontal: '8%' }}>
        {/* Map View */}
        <View style={{ marginTop: 30 }}>
          <View style={{ zIndex: 2, position: 'relative', marginLeft: 20 }}>
            <View style={{ marginTop: 10, position: 'absolute' }}>
              <BackButton navigation={navigation} />
            </View>
          </View>

          <MapView
            style={styles.backgroundImage}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              // latitude: parseFloat(Park.latitude),
              // longitude: parseFloat(Park.longitude),
              latitude: lati,
              longitude: long,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
          >
            <Marker
              coordinate={{
                // latitude: parseFloat(Park.latitude),
                // longitude: parseFloat(Park.longitude),
                latitude: lati,
                longitude: long,
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

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 14 }}>
              <Ionicons name="ios-location" size={15} color="#212121" />
              <Text style={styles.parkDetails}> {Park.address}</Text>
            </View>
          </View>
        </View>

        {/* Parks Details */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, height: height * 1.5 }}
        >
          {/* REVIEWS */}
          <View>
            <View style={styles.reviewHeaderBox}>
              <Text style={{ fontWeight: '700', fontSize: 20, letterSpacing: 1 }}>📝 Reviews</Text>

              <TouchableOpacity>
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
                      <Text style={{ marginTop: 4 }}>
                        📆 {dayjs(item.review.date).format('YYYY-MM-DD')}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* EVENTS */}
          <View style={styles.eventsHeaderBox}>
            <Text style={{ fontWeight: '700', fontSize: 20, letterSpacing: 1 }}>🎫 Events</Text>

            <TouchableOpacity>
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
                  <View style={styles.ownerBox}>
                    <Text style={{ marginLeft: 4, color: colors.darkGray, marginRight: 5 }}>
                      Owner:
                    </Text>

                    <CircleImage image={item.profilePic} width={20} />
                    <Text style={{ fontWeight: '500' }}>{item.owner}</Text>
                  </View>

                  {/* Event Date */}
                  <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 14 }}>
                    <Text style={{ fontWeight: '500', paddingBottom: 10 }}>📆 {date}</Text>
                    <Text style={{ color: colors.lightGray }}>at</Text>
                    <Text>{time}</Text>
                  </View>

                  <View style={{ flexDirection: 'column', marginTop: 1, marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 6 }}>
                      <Ionicons name="ios-person" size={15} color="#212121" />
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
                              <CircleImage image={item.profilePic} width={25} />
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
    paddingLeft: '5%',
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
    borderRadius: '30%',
    padding: '2%',
    marginTop: 18,
  },
  ownerBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 10,
  },
  dateBox: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 10,
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
    borderRadius: '30%',
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

  map: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: '20%',
    height: '50%',
  },

  profileImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  dogImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: -10,
  },
});
