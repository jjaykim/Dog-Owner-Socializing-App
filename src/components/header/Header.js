import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Header = () => {
  return (
    <SafeAreaView>
      <View style={styles.menuWrapper}>
        <Text>PuppyPals</Text>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
});
