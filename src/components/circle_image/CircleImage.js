import React from 'react';
import { Image } from 'react-native';

export const CircleImage = ({ image, borderRadius = 40, width = 40 }) => {
  return <Image style={{ height: width, width, borderRadius }} source={image} />;
};
