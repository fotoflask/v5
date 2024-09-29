// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID; 


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default app;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCZu7Jwzr9lhYqmEqPEeqzOobX_aP5BT8Q",
//   authDomain: "fdfed-d64be.firebaseapp.com",
//   projectId: "fdfed-d64be",
//   storageBucket: "fdfed-d64be.appspot.com",
//   messagingSenderId: "655510753174",
//   appId: "1:655510753174:web:518be7dd75fd72b29297b7"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;