const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'clone-afa5c.firebaseapp.com',
  databaseURL: 'https://clone-afa5c.firebaseio.com',
  projectId: 'clone-afa5c',
  storageBucket: 'clone-afa5c.appspot.com',
  messagingSenderId: '145242743460',
  appId: '1:145242743460:web:5e1b3337dfbcf514c2bc31',
  measurementId: 'G-S0XP31SFJN',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const firebaseRef = db.collection('');