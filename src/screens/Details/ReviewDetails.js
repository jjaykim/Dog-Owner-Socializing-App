import React from 'react';
import { View, Text, Button } from 'react-native';

export const ReviewDetails = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Review Screen</Text>

      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
