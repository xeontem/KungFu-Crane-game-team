import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const userAdapter = result => ({ displayName: result.displayName, photoURL: result.photoURL });

const firebaseConfig = {
  apiKey: "AIzaSyDNC2Ne2fbdvsuPfM2eV4G2pqqp3uU4GS8",
  authDomain: "hawks-revenge.firebaseapp.com",
  databaseURL: "https://hawks-revenge.firebaseio.com",
  projectId: "hawks-revenge",
  storageBucket: "hawks-revenge.appspot.com",
  messagingSenderId: "1065646725720",
  appId: "1:1065646725720:web:d72e4bccca9959a94d082d",
  measurementId: "G-B60WBB2S97"
};

firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();
const auth = firebase.auth();
const eventsCollection = DB.collection('events');
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const onAuthStateChanged = new Promise(res => {
  auth.onAuthStateChanged(data => {
    res(data ? userAdapter(data) : null);
  });
});

export const getEvents = cb => eventsCollection.onSnapshot(snap =>
  cb(snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))))

export const updateEvent = ({ id, ...newEvent }) => {
  console.log(newEvent);
  return eventsCollection.doc(id).update(newEvent);
};
  // .catch(e => {
  //   const numberDate = new Date(newEvent.start).getTime();
  //   const newTime = new Date(numberDate + (1000*60*60*24*31*31)).getTime();
  //   console.log(new Date(newTime));
  //   eventsCollection.doc().set({ ...newEvent, start: newTime });
  // });

export const createNewEvent = ({ id, ...newEvent }) => eventsCollection.doc().set(newEvent);


export const login = () => auth.signInWithPopup(provider)
  .then(data => userAdapter(data.user))
  .catch(console.log);

export const logout = () => auth.signOut()
  .catch(console.log);
