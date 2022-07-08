import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import map from 'lodash/map';

import colors from '../../styles/colors';
import { BackButton } from '../../components/common/backButton/BackButton';
import { CircleImage } from '../../components/circle_image/CircleImage';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const PeopleDetails = ({ navigation, route }) => {
  const peopleData = route.params.PeopleData;
  const usersData = route.params.UsersData;

  const [click, setClick] = useState(false);
  const [clickImage, setClickImage] = useState();

  if (click) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => setClick(!click)}>
          <Image source={clickImage} style={{ height, width }} />
        </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Dog Owners</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={styles.ownerBox}>
            {map(peopleData, (id, index) => {
              return (
                <View key={index}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View>
                      <Text style={{ marginLeft: 4, color: colors.darkGray }}>Owner:</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 4 }}>
                      <CircleImage image={usersData[id - 1].profilePic} width={35} />

                      <Text style={{ marginLeft: 4, fontSize: 15, fontWeight: '600' }}>
                        {usersData[id - 1].fName}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
                    <View>
                      <Text style={{ marginLeft: 4, color: colors.darkGray }}>Dogs:</Text>
                    </View>

                    <View>
                      {map(usersData[id - 1].dogs, (dog, idx) => {
                        return (
                          <View
                            key={idx}
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                          >
                            <View style={{ marginLeft: 14 }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setClickImage(dog.dogPic);
                                  setClick(!click);
                                }}
                              >
                                <CircleImage image={dog.dogPic} width={35} />
                              </TouchableOpacity>
                            </View>

                            <View style={{ marginLeft: 8 }}>
                              <Text style={{ fontSize: 15, fontWeight: '600' }}>
                                {dog.dogName} / {dog.dogBreed}
                              </Text>
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
  headerBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 2,
    marginTop: 3,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
    marginTop: 2,
  },
  ownerBox: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 40,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 0.4,
    paddingBottom: 10,
  },
});
