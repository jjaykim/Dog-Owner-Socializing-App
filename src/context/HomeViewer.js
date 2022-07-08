import React, { createContext, useEffect, useMemo, useState } from 'react';
import { GOOGLE_MAPS_APIKEY } from '@env';

import UserData from '../../dummy-data/UserData';
import EventData from '../../dummy-data/EventData';
import { normalizeParkList, fetchParkList } from '../../dummy-data/ParkData';
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
    UserData,
    EventData,
    ParkData: [],
    ReviewData,
    LoginUser: UserData[0],
    SearchedData: [],
  });
  const [filteredParkList, setFilteredParkList] = useState([]);

  useEffect(() => {
    filterParkList();

    if (filteredParkList.length > 0) {
      setViewer({
        ...viewer,
        ParkData: filteredParkList,
      });
    }
  }, [filteredParkList]);

  const filterParkList = async () => {
    const res = await fetchParkList();
    const fetched = await res.json();
    // console.log(fetched);

    setFilteredParkList(normalizeParkList(fetched.results, GOOGLE_MAPS_APIKEY));
  };

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
