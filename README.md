# PuppyPals

- WEB530
- Dog Owner Socializing App

## Start

1. `npm install`
2. `npm run start`

## Navigation Stack

```bash
├──Root
    ├── Home
    │   ├── ParkDetails
    │           └── PeopPleDetails
    │           └── EventDetails
    │           └── ReviewleDetails
    ├── Account
```

## Data Type

```typescript
interface User {
  id: number;
  fName: string;
  lName: string;
  age: number;
  profilePic: string;
  dogPic: [string]; // Array of Dog Picture
  dogBreed: string;
  dogName: string;
  events: [Event]; // Array of Event Id
  reviews: [Review]; // Array of Review Id
}

interface Event {
  id: number;
  title: string;
  date: Date;
  parkLocation: Park; // Park Id
  users: [User]; // Array of User Id
}

interface Park {
  id: number;
  name: string;
  address: string;
  googleLink: string;
  livePeople: [User]; // Array of User Id
}

interface Review {
  id: number;
  rate: number;
  comment: string;
}
```
