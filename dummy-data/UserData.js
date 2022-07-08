const UserData = [
  {
    id: 1,
    fName: 'Jay',
    lName: 'Kim',
    age: '29',
    email: 'user1@email.com',
    password: 'user1',
    profilePic: require('../assets/User-assets/1-profilePic.png'),
    dogs: [
      // Array of Dog
      {
        dogName: 'Garu',
        dogBreed: 'Toy Poodle',
        dogPic: require('../assets/User-assets/1-dogPic-Puddle.jpeg'),
      },
      {
        dogName: 'DDang',
        dogBreed: 'Jindo',
        dogPic: require('../assets/User-assets/1-dogPic-Jindo.png'),
      },
    ],
    // Array of Event Id
    events: [1, 2],
    // Array of Review Id
    reviews: [1, 2],
  },
  {
    id: 2,
    fName: 'Alvia',
    lName: 'Siraj',
    age: '23',
    email: 'user2@email.com',
    password: 'user2',
    profilePic: require('../assets/User-assets/2-profilePic.png'),
    dogs: [
      // Array of Dog
      {
        dogName: 'TopGun',
        dogBreed: 'Husky',
        dogPic: require('../assets/User-assets/2-husky.jpg'),
      },
    ],
    // Array of Event Id
    events: [1, 2],
    // Array of Review Id
    reviews: [4, 5],
  },
  {
    id: 3,
    fName: 'Yonas',
    lName: 'Klibi',
    age: '18',
    email: 'user3@email.com',
    password: 'user3',
    profilePic: require('../assets/User-assets/3-profilePic.png'),
    dogs: [
      {
        dogName: 'Goldeni',
        dogBreed: 'Golden Retriever',
        dogPic: require('../assets/User-assets/3-golden.png'),
      },
      {
        dogName: 'shap',
        dogBreed: 'German shepherd',
        dogPic: require('../assets/User-assets/3-shepherd.png'),
      },
      {
        dogName: 'pugi',
        dogBreed: 'pug',
        dogPic: require('../assets/User-assets/3-pug.png'),
      },
    ],
    // Array of Event Id
    events: [1, 3],
    // Array of Review Id
    reviews: [3, 6],
  },
];

export default UserData;
