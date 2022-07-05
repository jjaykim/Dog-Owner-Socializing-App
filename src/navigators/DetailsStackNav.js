import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import map from 'lodash/map';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

// import { ParkDetails } from '../screens/Details/ParkDetails';
// import { PeopleDetails } from '../screens/Details/PeopleDetails';
// import { ReviewDetails } from '../screens/Details/ReviewDetails';
// import { EventDetails } from '../screens/Details/EventDetails';
// import colors from '../styles/colors';

//const DetailsStack = createNativeStackNavigator();

export const DetailsStackNav = ({ route }) => {
  const parkName = route.params.ParkName;
  // const parks = route.params.Park;
  const reviews = route.params.Reviews;

  // const orderReviews = orderBy(
  //   map(parks.reviews, (id) => {
  //     return {
  //       parkName: find(parks, (park) => {
  //         return park.placeId === reviews[id - 1].parkPlaceId;
  //       }).name,
  //     };
  //   }),
  //   ['review.date'],
  //   ['desc'],
  // );

  return (
    <View style={styles.content}>
      {/* <DetailsStack.Navigator screenOptions={{ headerShown: false }}>
      <DetailsStack.Screen name="ParkDetails" component={ParkDetails} />
      <DetailsStack.Screen name="PeopleDetails" component={PeopleDetails} />
      <DetailsStack.Screen name="ReviewDetails" component={ReviewDetails} />
      <DetailsStack.Screen name="EventDetails" component={EventDetails} />
    </DetailsStack.Navigator> */}
      <Text>{parkName}</Text>
     {console.log(parkName)}
     {console.log(reviews)}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontWeight: 'bold', fontSize: 20, marginLeft: 8, letterSpacing: 2 },
});
