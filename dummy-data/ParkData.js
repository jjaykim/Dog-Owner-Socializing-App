import map from 'lodash/map';
import { GOOGLE_MAPS_APIKEY } from '@env';

const ParkData = [
  {
    id: 1,
    name: 'Ramsden Dog Park',
    addrss: 'Toronto, ON, Canada',
    googleLink: `https://www.google.com/maps/place?q=Ramsden+Dog+Park`,
    image: `https://maps.googleapis.com/maps/api/staticmap?center=RamsdenDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CRamsdenDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6763088',
    longitude: '-79.3960547',
    placeId: 'ChIJQVNuOPc1K4gRHN6f3m2Kgdg',
    // Array of User Id
    livePeople: [1],
    // Array of Review Id
    reviews: [1, 4],
    // Array of Event Id
    events: [1],
  },
  {
    id: 2,
    name: 'Cherry Beach Off Leash Dog Park',
    addrss: '1 Cherry St, Toronto, ON M5A 0B7, Canada',
    googleLink: 'https://www.google.com/maps/place?q=Cherry+Beach+Off+Leash+Dog+Park',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=CherryBeachOffLeashDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CCherryBeachOffLeashDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6367497',
    longitude: '-79.3453069',
    placeId: 'ChIJ6dDqUP3K1IkRPJvqDTNdKV0',
    // Array of User Id
    livePeople: [2],
    // Array of Review Id
    reviews: [2, 5],
    // Array of Event Id
    events: [2],
  },
  {
    id: 3,
    name: 'Power Street Off Leash Dog Park',
    addrss: '51 Power St, Toronto, ON M5A 3A6, Canada',
    googleLink: 'https://www.google.com/maps/place?q=Power+Street+Off+Leash+Dog+Park',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=PowerStreetOffLeashDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CPowerStreetOffLeashDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6545909',
    longitude: '-79.3624608',
    placeId: 'ChIJfW6I2D7L1IkRBuVHnciWKyc',
    // Array of User Id
    livePeople: [3],
    // Array of Review Id
    reviews: [3, 6],
    // Array of Event Id
    events: [3],
  },
  {
    id: 4,
    name: "St. Andrew's Playground Dog Park",
    addrss: '450 Adelaide St W, Toronto, ON M5V 1S9, Canada',
    googleLink: "https://www.google.com/maps/place?q=St.+Andrew's+Playground+Dog+Park",
    image: `https://maps.googleapis.com/maps/api/staticmap?center=St.Andrew'sPlaygroundDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CSt.Andrew'sPlaygroundDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6462848',
    longitude: '-79.3994946',
    placeId: 'ChIJB3racZ01K4gRCbUUxLObRWk',
    // Array of User Id
    livePeople: [1, 2, 3],
    // Array of Review Id
    reviews: [],
    // Array of Event Id
    events: [],
  },
  {
    id: 5,
    name: 'Grange Park Dog Off Leash Area',
    addrss: 'Beverly Street &, McCaul St, Toronto, ON M5T 1C3, Canada',
    googleLink: 'https://www.google.com/maps/place?q=Grange+Park+Dog+Off+Leash+Area',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=GrangeParkDogOffLeashArea&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CGrangeParkDogOffLeashArea&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6520762',
    longitude: '-79.39216809999999',
    placeId: 'ChIJMTman7c1K4gRcXiKONqT_Rk',
    // Array of User Id
    livePeople: [],
    // Array of Review Id
    reviews: [],
    // Array of Event Id
    events: [],
  },
  {
    id: 6,
    name: 'Sunnybrook Dog Park',
    addrss: 'Toronto, ON M4G 2S9, Canada',
    googleLink: 'https://www.google.com/maps/place?q=Sunnybrook+Dog+Park',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=SunnybrookDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CSunnybrookDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.7223745',
    longitude: '-79.36557859999999',
    placeId: 'ChIJTeQH5iTN1IkRkzdk0eGU3fc',
    // Array of User Id
    livePeople: [],
    // Array of Review Id
    reviews: [],
    // Array of Event Id
    events: [],
  },
  {
    id: 7,
    name: 'Coronation Park Dog Park',
    addrss: 'Toronto, ON M5V 1A7, Canada',
    googleLink: 'https://www.google.com/maps/place?q=Coronation+Park+Dog+Park',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=CoronationParkDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CCoronationParkDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6338637',
    longitude: '-79.4038805',
    placeId: 'ChIJ63Qvbxg1K4gRdK_hBqadb1o',
    // Array of User Id
    livePeople: [],
    // Array of Review Id
    reviews: [],
    // Array of Event Id
    events: [],
  },
  {
    id: 8,
    name: 'Coxwell Ravine Dog Park',
    addrss: 'Toronto, ON M4J 2W6, Canada',
    googleLink: 'https://www.google.com/maps/place?q=Coxwell+Ravine+Dog+Park',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=CoxwellRavineDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CCoxwellRavineDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6986472',
    longitude: '-79.3322506',
    placeId: 'ChIJ3ViRUWLN1IkRzazWcFDJ5ss',
    // Array of User Id
    livePeople: [],
    // Array of Review Id
    reviews: [],
    // Array of Event Id
    events: [],
  },
  {
    id: 9,
    name: 'Regent Dog Park',
    addrss: '251 Sackville St, Toronto, ON M5A 3G1, Canada',
    googleLink: 'https://www.google.com/maps/place?q=Regent+Dog+Park',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=RegentDogPark&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CRegentDogPark&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6607642',
    longitude: '-79.3629318',
    placeId: 'ChIJoz3OVgLL1IkRCXpdLcmVcac',
    // Array of User Id
    livePeople: [],
    // Array of Review Id
    reviews: [],
    // Array of Event Id
    events: [],
  },
  {
    id: 10,
    name: 'High Park Dog Off Leash Area',
    addrss: '1873 Bloor St W, Toronto, ON M6R 2Z3, Canada',
    googleLink: 'https://www.google.com/maps/place?q=High+Park+Dog+Off+Leash+Area',
    image: `https://maps.googleapis.com/maps/api/staticmap?center=HighParkDogOffLeashArea&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7CHighParkDogOffLeashArea&key=${GOOGLE_MAPS_APIKEY}`,
    latitude: '43.6469105',
    longitude: '-79.4634667',
    placeId: 'ChIJt4XTyyw0K4gR92sx1k1ChHQ',
    // Array of User Id
    livePeople: [],
    // Array of Review Id
    reviews: [],
    // Array of Event Id
    events: [],
  },
];

export default ParkData;

export const normalizeParkList = (data, key) => {
  return map(data, (park, idx) => {
    const convertedName = park.name.replace(/(\s*)/g, '');
    const searchName = park.name.replace(/ /g, '+');

    // Dummy Data 1
    if (park.place_id === 'ChIJQVNuOPc1K4gRHN6f3m2Kgdg') {
      return {
        id: idx + 1,
        addrss: park.formatted_address,
        latitude: park.geometry.location.lat.toString(),
        longitude: park.geometry.location.lng.toString(),
        name: park.name,
        placeId: park.place_id,
        image: `https://maps.googleapis.com/maps/api/staticmap?center=${convertedName}&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C${convertedName}&key=${key}`,
        googleLink: `https://www.google.com/maps/place?q=${searchName}`,
        livePeople: [1],
        reviews: [1, 4],
        events: [1],
      };
    }

    if (park.placeId === 'ChIJ6dDqUP3K1IkRPJvqDTNdKV0') {
      return {
        id: idx + 1,
        addrss: park.formatted_address,
        latitude: park.geometry.location.lat.toString(),
        longitude: park.geometry.location.lng.toString(),
        name: park.name,
        placeId: park.place_id,
        image: `https://maps.googleapis.com/maps/api/staticmap?center=${convertedName}&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C${convertedName}&key=${key}`,
        googleLink: `https://www.google.com/maps/place?q=${searchName}`,
        livePeople: [2],
        reviews: [2, 5],
        events: [2],
      };
    }

    if (park.placeId === 'ChIJ6dDqUP3K1IkRPJvqDTNdKV0') {
      return {
        id: idx + 1,
        addrss: park.formatted_address,
        latitude: park.geometry.location.lat.toString(),
        longitude: park.geometry.location.lng.toString(),
        name: park.name,
        placeId: park.place_id,
        image: `https://maps.googleapis.com/maps/api/staticmap?center=${convertedName}&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C${convertedName}&key=${key}`,
        googleLink: `https://www.google.com/maps/place?q=${searchName}`,
        livePeople: [3],
        reviews: [3, 6],
        events: [3],
      };
    }
    return {
      id: idx + 1,
      addrss: park.formatted_address,
      latitude: park.geometry.location.lat.toString(),
      longitude: park.geometry.location.lng.toString(),
      name: park.name,
      placeId: park.place_id,
      image: `https://maps.googleapis.com/maps/api/staticmap?center=${convertedName}&zoom=14&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C${convertedName}&key=${key}`,
      googleLink: `https://www.google.com/maps/place?q=${searchName}`,
      livePeople: [],
      reviews: [],
      events: [],
    };
  });
};

export const fetchParkList = (searchInput = 'Toronto') => {
  return new Promise((resolve) => {
    resolve(
      fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput}+dog+park&language=en&key=${GOOGLE_MAPS_APIKEY}`,
      ),
    );
  });
};
