import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import colors from '../../styles/colors';
import { BackButton } from '../../components/common/backButton/BackButton';

export const ReviewDetails = ({ navigation, route }) => {
  const user = route.params.userInfo;
  const reviews = route.params.Reviews;
  const parks = route.params.Parks;

  const orderReviews = orderBy(
    map(user.reviews, (id) => {
      return {
        review: reviews[id - 1],
        parkName: find(parks, (park) => {
          return park.placeId === reviews[id - 1].parkPlaceId;
        }).name,
      };
    }),
    ['review.date'],
    ['desc'],
  );

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <View style={{ flex: 1 }}>
          <BackButton navigation={navigation} />
        </View>

        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Reviews</Text>
          
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <Text style={{ fontWeight: '700', fontSize: 20, letterSpacing: 1 }}>📝 History</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          {map(orderReviews, (item, idx) => {
            return (
              <View
                key={idx}
                style={{
                  paddingVertical: 20,
                  borderBottomColor: colors.gray,
                  borderBottomWidth: 2,
                }}
              >
                {/* Location */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Ionicons name="ios-location" size={15} color="#212121" />
                  <Text style={{ marginLeft: 4 }}>{item.parkName}</Text>
                </View>

                <View>
                  <View>
                    {/* Comment */}
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

                      <View
                        style={{ borderLeftWidth: 1, borderLeftColor: colors.gray, flex: 0.08 }}
                      />

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

                    {/* Edit & Delete */}
                    <View
                      style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <TouchableOpacity
                        style={{ marginRight: 30 }}
                        onPress={() => {
                          Alert.alert('Edit Reviw', 'Are you sure?', [
                            { text: 'Cancel', style: 'destructive' },

                            {
                              text: "I'm Sure",
                            },
                          ]);
                        }}
                      >
                        <Ionicons name="ios-pencil" size={15} color="#274555" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        bleOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          Alert.alert('Delete Review', 'Are you sure?', [
                            { text: 'Cancel' },
                            {
                              text: "I'm Sure",
                              style: 'destructive',
                            },
                          ]);
                        }}
                      >
                        <Ionicons name="trash-bin" size={15} color="#DC0815" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>Review Screen</Text>

  //     <Button
  //       title="Go Back"
  //       onPress={() => {
  //         navigation.goBack();
  //       }}
  //     />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  headerBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 2,
    marginTop: 3,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 20, marginLeft: 8, letterSpacing: 2 },
});
