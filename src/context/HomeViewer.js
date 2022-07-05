import React, { createContext, useEffect, useMemo, useState } from 'react';

import UserData from '../../dummy-data/UserData';
import EventData from '../../dummy-data/EventData';
import ParkData from '../../dummy-data/ParkData';
import ReviewData from '../../dummy-data/ReviewData';

export const HomeViewerContext = createContext({
  UserData: [],
  EventData: [],
  ParkData: [],
  ReviewData: [],
  LoginUser: {},
  SearchedData: [],
});

function HomeViewerContextProvider({ children }) {
  const [viewer, setViewer] = useState({
    UserData: [],
    EventData: [],
    ParkData: [],
    ReviewData: [],
    LoginUser: {},
    SearchedData: [],
  });
  

  useEffect(() => {
    setViewer({
      UserData,
      EventData,
      ParkData,
      ReviewData,
      LoginUser: UserData[0],
      SearchedData: [],
    });
  }, []);

  const value = useMemo(
    () => ({
      viewer,
      setViewer,
    }),
    [viewer],
  );

  return <HomeViewerContext.Provider value={value}>{children}</HomeViewerContext.Provider>;
}

export default HomeViewerContextProvider;
