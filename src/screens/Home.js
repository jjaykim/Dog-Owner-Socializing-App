import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

import { Header } from '../components/header/Header';
import colors from '../styles/colors';
import adaptiveIco from '../../assets/australia.png';
import { HomeViewerContext } from '../context/HomeViewer';

const { height } = Dimensions.get('window');

export const Home = ({ navigation }) => {
  const demoImages = [adaptiveIco, adaptiveIco, adaptiveIco, adaptiveIco, adaptiveIco];
  const { viewer } = useContext(HomeViewerContext);

  if (!viewer) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <TextInput style={styles.textInput} placeholder="Enter your address" />

      {/* Parks */}
      <View>
        <FlatList
          data={demoImages}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.demoImagesBox}
                onPress={() => navigation.navigate('DetailScreen')}
              >
                <ImageBackground source={item} style={styles.backgroundImage}>
                  <Text>Parks</Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, idx) => `${item} + ${idx}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    paddingHorizontal: 30,
  },
  menuWrapper: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 14,
  },
  backgroundImage: {
    height: height * 0.3,
    justifyContent: 'space-between',
  },
  demoImagesBox: {
    marginTop: 10,
  },
});
