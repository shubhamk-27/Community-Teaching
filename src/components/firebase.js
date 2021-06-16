import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDEr4gHWVz2rnyF0mvr1TPQevufgvGaq0U",
  authDomain: "community-teaching.firebaseapp.com",
  projectId: "community-teaching",
  storageBucket: "community-teaching.appspot.com",
  messagingSenderId: "844273984281",
  appId: "1:844273984281:web:fd9df0bb5185d57417db88",
  measurementId: "G-N6SDPYSQE4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()

const db = firebaseApp.firestore()

export {auth, provider}

export default db