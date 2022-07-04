import React, { useContext, useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_MAPS_APIKEY } from '@env';

import { Header } from '../components/header/Header';
import colors from '../styles/colors';
import { HomeViewerContext } from '../context/HomeViewer';
import { normalizeParkList } from '../../dummy-data/ParkData';

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
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput}+dog+park&language=en&key=${GOOGLE_MAPS_APIKEY}`,
    );

    const result = await res.json();

    setFilteredParkList(normalizeParkList(result.results, GOOGLE_MAPS_APIKEY));
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
      {!viewer.ParkData.length || fetching ? (
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
            data={viewer.SearchedData.length ? viewer.SearchedData : viewer.ParkData}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item.placeId}
                  style={styles.demoImagesBox}
                  activeOpacity={0.7}
                  onPress={() => navigation.push('DetailScreen')}
                >
                  <ImageBackground source={{ uri: item.image }} style={styles.backgroundImage}>
                    <Text>Parks</Text>
                  </ImageBackground>
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
  },
  demoImagesBox: {
    marginTop: 20,
  },
});
