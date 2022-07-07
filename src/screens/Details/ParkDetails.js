import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '../../components/common/backButton/BackButton';

export const ParkDetails = ({ navigation, route }) => {
  const park = route.params.Park;
  console.log(park);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: '8%' }}>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <View style={{ flex: 1 }}>
          <BackButton navigation={navigation} />
        </View>

        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>d</Text>
        </View>
      </View>
    </SafeAreaView>
  );
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

// <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Park Details Screen</Text>

//   <Button title="Go Back" onPress={() => navigation.goBack()} />
//   <Button title="Go People" onPress={() => navigation.navigate('PeopleDetails')} />
//   <Button title="Go Event" onPress={() => navigation.navigate('EventDetails')} />
//   <Button title="Go Review" onPress={() => navigation.navigate('ReviewDetails')} />
// </View>
