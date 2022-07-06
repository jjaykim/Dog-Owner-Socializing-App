import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
      };
    }),
  );

  return (
    <View style={styles.content}>
      {/* <DetailsStack.Navigator screenOptions={{ headerShown: false }}>
      <DetailsStack.Screen name="ParkDetails" component={ParkDetails} />
      <DetailsStack.Screen name="PeopleDetails" component={PeopleDetails} />
      <DetailsStack.Screen name="ReviewDetails" component={ReviewDetails} />
      <DetailsStack.Screen name="EventDetails" component={EventDetails} />
    </DetailsStack.Navigator> */}
    {/*DOG PARK TITLE */}
    <View>
      <Text style={styles.title}>Hello</Text>
    </View>
      <Text>{parkName}</Text>

      <View style={styles.containerBottom}>
        {map(sortReviews, (item, idx) => {
          return (
            <View
              key={idx}
                style = {styles.reviews}
            >
              <View>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>
                  &quot;{item.review.comment}&quot;
                </Text>
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
                  <Ionicons name="ios-star" size={15} />
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
      <View style={{alignSelf:'stretch',flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{fontSize:30, padding:20}}>Events</Text> 
      <Text style={{alignSelf:'flex-end', padding:20, fontSize:16, color:"blue"}}>View All</Text>

      </View>
     
      <View style={styles.containerBottom}>
      
        {map(sortEvents, (item, idx) => {
          const convertedDate = dayjs(item.event.date).format('dddd, MMMM DD, YYYY | h:mmA');

          const date = convertedDate.split('|')[0];
          const time = convertedDate.split('|')[1];

          return (
            <View
              key={idx}
              style = {styles.events}

            >
              {/* Event Title */}
              <View>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>
                  &quot;{item.event.title}&quot;
                </Text>
              </View>
              
              {/* Event Date */}
              <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4 }}>
              <Ionicons name="ios-calendar" size={15} color="#212121" />
                <Text style={{ fontWeight: '500' }}>{date} </Text>
                <Text style={{ color: colors.darkGray }}>at</Text>
                <Text style={{ fontWeight: '500' }}>{time}</Text>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 1, marginLeft: 4 }}>
              <Ionicons name="ios-person" size={15} color="#212121" />
              <Text style={{ marginLeft: 4, color: colors.darkGray }}>Owner:</Text>
                <Text style={{ fontWeight: '500' }}>{item.owner}</Text>
              </View>
              {/* <View>
            <Ionicons name="ios-calendar" size={15} color="#212121" />
            <Ionicons name="ios-person" size={15} color="#212121" />
            <Ionicons name="ios-location" size={15} color="#212121" />

            </View> */}
            </View>
          );
        })}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  reviews: {
    flexGrow: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
    borderRadius: "40vh",
    height: '25%',
    width: "25%"    
  },
  events: {
    flexGrow: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
    borderRadius: "40vh",
    height: '25%',
    width: "25%"    
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%'
  },
  containerBottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title:{
    fontWeight: '700', 
    fontSize: 30
  },
  headerTitle: { fontWeight: 'bold', fontSize: 20, marginLeft: 8, letterSpacing: 2 },
});
