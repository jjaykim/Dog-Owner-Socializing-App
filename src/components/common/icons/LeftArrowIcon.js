import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftArrowIcon = (props) => (
  <Svg width={9} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M8 1 1 8l7 7"
      stroke="#212121"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LeftArrowIcon;
