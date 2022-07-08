import React from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import map from 'lodash/map';
import repeat from 'lodash/repeat';
import dayjs from 'dayjs';

import colors from '../../styles/colors';
import { BackButton } from '../../components/common/backButton/BackButton';
import { CircleImage } from '../../components/circle_image/CircleImage';
import { ClickButton } from '../../components/common/clickButton/ClickButton';

export const ReviewDetails = ({ navigation, route }) => {
  const reviews = route.params.ReviewData;
  const usersData = route.params.UsersData;

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <SafeAreaView style={{ marginHorizontal: '8%', flex: 1 }}>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <View style={{ flex: 1 }}>
            <BackButton navigation={navigation} />
          </View>

          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>Reviews</Text>
          </View>
        </View>

        <ClickButton
          btnText="Write Reivew"
          onPress={() => {
            Alert.alert('Leave your comment', 'Are you sure?', [
              { text: 'Cancel', style: 'destructive' },

              {
                text: 'Write',
              },
            ]);
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={{ marginTop: 20 }}>
            {map(reviews, (item, idx) => {
              return (
                <View key={idx} style={{ marginTop: 20 }}>
                  <View>
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

                    <View style={{ borderLeftWidth: 1, borderLeftColor: colors.gray, flex: 0.2 }} />

                    {/* Date */}
                    <View style={styles.dateBox}>
                      <Text>📆 {dayjs(item.review.date).format('YYYY-MM-DD')}</Text>
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
  reviewBox: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 0.5,
    paddingBottom: 14,
    paddingTop: 10,
  },
  ownerBox: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.8,
  },
  dateBox: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.8,
  },
});
