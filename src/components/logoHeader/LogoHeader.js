import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PuppyPalsLogo from '../common/icons/Logo';

export const LogoHeader = ({ onPress }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={{ marginTop: 37, marginBottom: 40 }} onPress={onPress}>
        <PuppyPalsLogo />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
