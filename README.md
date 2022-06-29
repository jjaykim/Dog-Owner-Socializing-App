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
  id: number,
  fName: string.
  lName: string,
  age: number,
  profilePic: string,
  dogPic: string,
  dogBreed: string,
  events: [Event],
  reviews: [Review]
}

interface Event {
  id: number,
  title: string,
  date: Date,
  location: string,
  users: [User]
}

interface Park {
  id: number,
  address: string,
  users: [User]
}

interface Review {
  id: number,
  rate: number,
  comment: string
}
```
