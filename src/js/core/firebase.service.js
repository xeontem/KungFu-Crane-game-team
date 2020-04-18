import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

export const getLocalUsers = () => JSON.parse(localStorage.getItem('LOCAL_USERS') || '[]');

export const setLocalUsers = localUsers => {
  localStorage.setItem('LOCAL_USERS', JSON.stringify(localUsers));
};

export const getLocalUser = nickName => getLocalUsers().find(d => d.nickName === nickName);


export const auth = firebase.auth();

const usersData = DB.collection('usersData');
const provider = new firebase.auth.GoogleAuthProvider();

export const onScoresChange = cb => usersData.onSnapshot(snap =>
  cb(snap.docs.map(doc => Object.assign({}, { uid: doc.id }, doc.data()))));

export const setCloudNickName = (id, nickName) => {
  return usersData.doc(id).update({ nickName });
};

export const setCloudSavedState = (id, savedState) => {
  return usersData.doc(id).update({ savedState });
};

export const saveLocalState = state => {
  localStorage.setItem('GAME_STATE', JSON.stringify(state));
};

export const getLocalState = () => {
  return JSON.parse(localStorage.getItem('GAME_STATE')) || null;
};

export const setCloudScore = (id, score) => {
  return usersData.doc(id).update({ score });
};

export const setDefaultData = docId => {
  return usersData.doc(docId).set({
    nickName: '',
    score: '0',
    savedState: null,
  });
};

export const userData = {
  uid: null,
  nickName: localStorage.getItem('USER_NICKNAME') || '',
  score: localStorage.getItem('USER_SCORE') || '0',
  savedState: getLocalState(),
};

onScoresChange(scores => {
  const localUsers = getLocalUsers();
  const filteredLocalScores = localUsers.filter(ud => {
    const scoresUser = scores.find(cu => cu.uid === ud.nickName);

    if (!scoresUser) {
      setDefaultData(ud.nickName).then(() => {
        setCloudNickName(ud.nickName, ud.nickName);
        setCloudScore(ud.nickName, ud.score);
      });
    }

    return !scoresUser;
  });
  setLocalUsers(filteredLocalScores);
});

auth.onAuthStateChanged(user => {
  if (user) {
    usersData.doc(user.uid).get().then(rawData => {
      const userDBData = rawData.data();
      if (userDBData) {
        userData.uid = user.uid;
        userData.nickName = userDBData.nickName;
        userData.score = userDBData.score;

        const savedState = getLocalState();
        if (savedState) {
          setCloudSavedState(userData.uid, savedState);
          saveLocalState(null);
          userData.savedState = savedState;
        } else {
          userData.savedState = userDBData.savedState;
        }

        // delete local user if already in cloud
        const localUsers = getLocalUsers();
        const localUser = getLocalUser(userData.nickName);
        if (localUser) {
          if (+localUser.score > +userData.score) {
            setCloudScore(userData.uid, localUser.score);
          }
          setLocalUsers(localUsers.filter(d => d.nickName !== userData.nickName));
        }
      } else {
        setDefaultData(user.uid);
      }
    });
  } else {
    userData.uid = null;
    saveLocalState(userData.savedState);
  }
});

export const login = () => auth.signInWithPopup(provider)
  .then(data => data.user)
  .catch(console.log);

export const logout = () => auth.signOut()
  .catch(console.log);
