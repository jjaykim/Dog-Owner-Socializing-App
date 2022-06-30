const UserData = [
  {
    id: 1,
    fName: 'Jay',
    lName: 'Kim',
    age: 29,
    email: 'user1@email.com',
    profilePic: require('../assets/User-assets/1-profilePic.png'),
    dogs: [
      {
        dogBreed: 'Toy Poodle',
        dogPic: '../assets/User-assets/1-dogPic.jpeg',
      },
    ],
    // Array of Event Id
    events: [1],
    // Array of Review Id
    reviews: [1, 2],
  },
  {
    id: 2,
    fName: 'Alvia',
    lName: 'Siraj',
    age: 23,
    email: 'user2@email.com',
    profilePic: require('../assets/User-assets/2-profilePic.png'),
    dogs: [
      {
        breed: 'Husky',
        photo: '../assets/User-assets/2-husky.jpeg',
      },
    ],
    // Array of Event Id
    events: [2],
    // Array of Review Id
    reviews: [4, 5],
  },
  {
    id: 3,
    fName: 'Yonas',
    lName: 'Klibi',
    age:18,
    email: 'user3@email.com',
    profilePic: require('../assets/User-assets/3-profilePic.png'),
    dogs: [
      {
        breed: 'Golden Retriever',
        photo: '../assets/User-assets/3-golden.jpeg',
      },
      {
        breed: 'German shepherd',
        photo: '../assets/User-assets/3-shepherd.jpeg',
      },
      {
        breed: 'pug',
        photo: '../assets/User-assets/3-pug.jpeg',
      },
    ],
    // Array of Event Id
    events: [3],
    // Array of Review Id
    reviews: [3, 6],
  },


];

export default UserData;
