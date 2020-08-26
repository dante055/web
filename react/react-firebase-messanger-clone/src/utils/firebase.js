import firebase from 'firebase';

CONST API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: 'AIzaSyB7HdYp89nJM4moakmKgXsWY_7vlnQN7_U',
  authDomain: 'facebook-messanger-clone-37d00.firebaseapp.com',
  databaseURL: 'https://facebook-messanger-clone-37d00.firebaseio.com',
  projectId: 'facebook-messanger-clone-37d00',
  storageBucket: 'facebook-messanger-clone-37d00.appspot.com',
  messagingSenderId: '987152005718',
  appId: '1:987152005718:web:3cf291871a98ed21e799f7',
  measurementId: 'G-EB9RM0N0C1',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const firebaseRef = db.collection('messages');

const createMessage = (msg, userName) => {
  return firebaseRef.add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    msg: msg,
    userName: userName,
  });
};

export { firebaseRef, createMessage };
