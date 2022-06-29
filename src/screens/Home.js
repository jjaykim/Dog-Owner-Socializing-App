import React from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../styles/colors';
import adaptiveIco from '../../assets/australia.png';

const { height } = Dimensions.get('window');

export const Home = ({ navigation }) => {
  const demoImages = [adaptiveIco, adaptiveIco, adaptiveIco, adaptiveIco, adaptiveIco];

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.menuWrapper}>
          <Text>Title</Text>
          <Text>User Name</Text>
        </View>

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
          />
        </View>
      </SafeAreaView>
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
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    marginTop: 10,
  },
});
