import React from 'react';
import { View, Text, Button } from 'react-native';

export const ParkDetails = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Park Details Screen</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go People" onPress={() => navigation.navigate('PeopleDetails')} />
      <Button title="Go Event" onPress={() => navigation.navigate('EventDetails')} />
      <Button title="Go Review" onPress={() => navigation.navigate('ReviewDetails')} />
    </View>
  );
};
