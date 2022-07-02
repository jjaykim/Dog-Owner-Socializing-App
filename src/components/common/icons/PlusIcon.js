import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = (props) => (
  <Svg width={12} height={11} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M6.283 6.125h4.146a.625.625 0 1 0 0-1.25l-4.146-.001V.728a.626.626 0 0 0-1.252 0l.001 4.146H.886a.625.625 0 0 0-.447 1.065.593.593 0 0 0 .441.18l4.152.006v4.146c0 .167.066.327.18.44a.593.593 0 0 0 .44.18c.346 0 .626-.28.626-.626l.005-4.14Z"
      fill="#9E9E9E"
    />
  </Svg>
);

export default PlusIcon;
