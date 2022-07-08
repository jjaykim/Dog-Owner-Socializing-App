import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_MAPS_APIKEY } from '@env';
import forEach from 'lodash/forEach';

import { Header } from '../components/header/Header';
import colors from '../styles/colors';
import { HomeViewerContext } from '../context/HomeViewer';
import { normalizeParkList, fetchParkList } from '../../dummy-data/ParkData';

const { height } = Dimensions.get('window');

export const Home = ({ navigation }) => {
  const { viewer, setViewer } = useContext(HomeViewerContext);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredParkList, setFilteredParkList] = useState([]);

  useEffect(() => {
    if (!viewer) {
      setLoading(true);
    }
  }, [viewer]);

  useEffect(() => {
    if (filteredParkList.length > 0) {
      setViewer({
        ...viewer,
        SearchedData: filteredParkList,
      });

      setFetching(false);
      setSearchInput('');
    }
  }, [filteredParkList]);

  const handleSubmit = async () => {
    const res = await fetchParkList(searchInput);
    const result = await res.json();

    setFilteredParkList(normalizeParkList(result.results, GOOGLE_MAPS_APIKEY));
  };

  const rating = (item) => {
    let rate = 0;

    forEach(viewer.ReviewData, (review) => {
      if (review.parkPlaceId === item.placeId) {
        rate += review.rate;
      }
    });

    return rate === 0 ? rate : (rate / item.reviews.length).toFixed(1);
  };

  if (loading) {
    <View>
      <Text>Sorry, please Re-start our App agian 🙏</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} LoginUser={viewer.LoginUser} />

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="ios-search" size={20} color="#212121" style={{ padding: 10 }} />
        <TextInput
          style={{ flex: 1, fontSize: 14 }}
          placeholder="Enter your address"
          placeholderTextColor={colors.lightGray}
          returnKeyType="search"
          onChangeText={(input) => setSearchInput(input)}
          value={searchInput}
          onSubmitEditing={() => {
            setFetching(true);
            handleSubmit();
          }}
        />
      </View>

      {/* Parks & Loading */}
      {viewer.ParkData.length < 0 || fetching ? (
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ marginBottom: 20, color: colors.darkGray, fontSize: 14 }}>
              Fetching Data...
            </Text>
            <ActivityIndicator color={colors.black} size={20} />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={viewer.SearchedData.length > 0 ? viewer.SearchedData : viewer.ParkData}
            renderItem={({ item }) => {
              if (!item.image) {
                setFetching(true);
              }
              return (
                <TouchableOpacity
                  key={item.placeId}
                  style={styles.imageBox}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.push('DetailScreen', {
                      AllReviews: viewer.ReviewData,
                      AllEvents: viewer.EventData,
                      AllUsers: viewer.UserData,
                      ParkInfo: item,
                      lat: item.latitude,
                      lon: item.longitude,
                    })
                  }
                >
                  <Image source={{ uri: item.image }} style={styles.backgroundImage} />

                  <View style={styles.contextBox}>
                    <View style={{ flexDirection: 'row', marginTop: 4, marginLeft: 15 }}>
                      <Ionicons name="ios-location" size={15} color="#212121" />
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          marginLeft: 4,
                          letterSpacing: 1,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 10,
                        paddingBottom: 4,
                      }}
                    >
                      <View style={{ flexDirection: 'row', marginTop: 4 }}>
                        <Text style={{ marginLeft: 2 }}>⭐️ {rating(item)}</Text>
                      </View>

                      <View style={{ marginTop: 3, marginLeft: 8, flexDirection: 'row' }}>
                        <Ionicons name="ios-person" size={15} color="#212121" />
                        <Text style={{ marginLeft: 4 }}>{item.livePeople.length}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, idx) => `${item} + ${idx}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: '#F5F5F5',
    borderWidth: 1,
  },
  backgroundImage: {
    height: height * 0.3,
    justifyContent: 'space-between',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  imageBox: {
    marginTop: 30,
  },
  contextBox: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftColor: colors.lightGray,
    borderRightColor: colors.lightGray,
    borderBottomColor: colors.lightGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
