import firebase from 'firebase';

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY',
  authDomain: 'todo-app-176d6.firebaseapp.com',
  databaseURL: 'https://todo-app-176d6.firebaseio.com',
  projectId: 'todo-app-176d6',
  storageBucket: 'todo-app-176d6.appspot.com',
  messagingSenderId: '216145751861',
  appId: '1:216145751861:web:8740ece3005d085814a67c',
  measurementId: 'G-YPR4YS60KD',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const firebaseRef = db.collection('toDos');

const createToDo = item => {
  return firebaseRef.add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    toDo: item,
  });
};

// const subscribe = setToDoList => {
//   firebaseRef.orderBy('created', 'desc').onSnapshot(snapshot =>
//     setToDoList(
//       snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//     )
//   );
// };

const getItemWithId = id => {
  firebaseRef
    .doc(id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        return doc.data();
        // console.log('Document data:', doc.data());
      } else {
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
};

const deleteItem = id => {
  firebaseRef.doc(id).delete();
};

const updateItem = (id, newToDo) => {
  firebaseRef.doc(id).set({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    toDo: newToDo,
  });
};

// set
// db.collection('toDos').doc(id).set({}, {nerge: true/false});
// true: append, false: reset

export { db, createToDo, deleteItem, updateItem };
