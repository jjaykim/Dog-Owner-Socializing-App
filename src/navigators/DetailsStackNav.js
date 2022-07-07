import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import map from 'lodash/map';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { ParkDetails } from '../screens/Details/ParkDetails';
import { PeopleDetails } from '../screens/Details/PeopleDetails';
import { ReviewDetails } from '../screens/Details/ReviewDetails';
import { EventDetails } from '../screens/Details/EventDetails';
import colors from '../styles/colors';

const DetailsStack = createNativeStackNavigator();

export const DetailsStackNav = ({ route }) => {
  const parkName = route.params.ParkName;
  const parkAddress = route.params.ParkAddress;
  const image = route.params.Image;
  //Events
  const events = route.params.Events;
  const eventData = route.params.AllEvents;
  const users = route.params.AllUsers;

  const sortEvents = orderBy(
    map(events, (id) => {
      return {
        event: eventData[id - 1],
        owner: `${users[eventData[id - 1].ownerId - 1].fName} ${
          users[eventData[id - 1].ownerId - 1].lName
        }`,
        profilePic: `${users[eventData[id - 1].ownerId - 1].profilePic}`,
        dogpic: `${users[eventData[id - 1].ownerId - 1].dogs.dogPic}`,
      };
    }),
  );

  //Reviews
  const reviews = route.params.Reviews;
  const reviewData = route.params.AllReviews;

  const sortReviews = orderBy(
    map(reviews, (id) => {
      return {
        review: reviewData[id - 1],
        user: `${users[reviewData[id - 1].userId - 1].fName} ${
          users[reviewData[id - 1].userId - 1].lName
        }`,
      };
    }),
  );

  return (
    <ScrollView>
      <View style={styles.content}>
        {/*DOG PARK TITLE */}
        
        <View style={styles.containerBottom}>
          <View style={styles.map}>
            <Image source={image} style={styles.mapImg} />
            <Text style={styles.title}>{parkName}</Text>
            <Text style={styles.parkDetails}> {parkAddress}</Text>
            </View>
        </View>

        {/* <View style={styles.containerBottom}>
          <View style={styles.parkDetails}>
          <Text style={styles.title}>{parkName}</Text>
          </View>
        </View> */}

        
        {/* REVIEWS */}
        <View
          style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text style={{ fontSize: 30, padding: 20 }}>Reviews</Text>
          <Text style={{ alignSelf: 'flex-end', padding: 20, fontSize: 16, color: 'blue' }}>
            View All
          </Text>
        </View>
        <View style={styles.containerBottom}>
          {map(sortReviews, (item, idx) => {
            return (
              <View key={idx} style={styles.reviews}>
                <View>
                  <Text style={{ fontWeight: '700', fontSize: 18 }}>
                    &quot;{item.review.comment}&quot;
                  </Text>
                </View>

                {/* Owner */}
                <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4, padding: 10 }}>
                  <Text style={{ marginLeft: 4, color: colors.darkGray }}>Owner:</Text>
                  <Text style={{ fontWeight: '500' }}>{item.user}</Text>
                </View>

                {/* Rate & Date */}
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingTop: 5,
                  }}
                >
                  {/* Rate */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.2 }}>
                    <Ionicons name="star-sharp" size={15} />
                    <Text style={{ marginTop: 2, marginLeft: 4 }}>{item.review.rate}</Text>
                  </View>

                  <View style={{ borderLeftWidth: 1, borderLeftColor: colors.gray, flex: 0.08 }} />

                  {/* Date */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="ios-calendar" size={15} color="#212121" />

                    <Text style={{ marginLeft: 4, marginTop: 2 }}>
                      {dayjs(item.review.date).format('YYYY-MM-DD')}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/*EVENTS */}
        <View
          style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text style={{ fontSize: 30, padding: 20 }}>Events</Text>
          <Text style={{ alignSelf: 'flex-end', padding: 20, fontSize: 16, color: 'blue' }}>
            View All
          </Text>
        </View>

        <View style={styles.containerBottom}>
          {map(sortEvents, (item, idx) => {
            const convertedDate = dayjs(item.event.date).format('dddd, MMMM DD, YYYY | h:mmA');

            const date = convertedDate.split('|')[0];
            const time = convertedDate.split('|')[1];

            return (
              <View key={idx} style={styles.events}>
                {/* Event Title */}
                <View>
                  <Text style={{ fontWeight: '700', fontSize: 18, paddingBottom: 20 }}>
                    {item.event.title}
                  </Text>
                </View>

                {/*Event Owner */}
                <View
                  style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4, paddingBottom: 20 }}
                >
                  <Text style={{ marginLeft: 4, color: colors.darkGray }}>Owner:</Text>
                  <Text style={{ fontWeight: '500' }}>{item.owner}</Text>
                </View>

                {/* Event Date */}
                <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4 }}>
                  <Ionicons name="ios-calendar" size={15} color="#212121" />
                  <Text style={{ fontWeight: '500', paddingBottom: 10 }}>
                    {date} at {time}{' '}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4 }}>
                  <Image style={styles.profileImg} source={item.profilePic} />
                  {/* below should be dog pic */}
                  <Image style={styles.dogImg} source={item.profilePic} />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviews: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'darkslategray',
    borderRadius: '30%',
    height: '85%',
    width: '25%',
    padding: '5%',
  },
  parkDetails: {
    fontWeight: '100',
    fontSize: 20,
    paddingTop: 10,
    alignSelf: 'stretch',
    marginBottom:-30
  },
  events: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'darkslategray',
    borderRadius: '30',
    height: '85%',
    width: '25%',
    padding: '5%',
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
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    height: '100%',
    width: '100%',
  },
  containerBottom: {
    flex: 1,
    flexDirection: 'row',
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
  mapImg: {
    height: 250,
    width: 400,
    marginTop: 100,
  },
  title: {
    fontWeight: '700',
    fontSize: 30,
    paddingTop: 10,
    alignSelf: 'stretch',
  },
  headerTitle: { fontWeight: 'bold', fontSize: 20, marginLeft: 8, letterSpacing: 2 },
});
