import firebase from "firebase/app"
import "firebase/firestore"

  const firebaseConfig = {
    apiKey: "AIzaSyC7-FtE0GIGBElZy3DRW9GRwczvbcmvVXA",
    authDomain: "amiable-945a0.firebaseapp.com",
    projectId: "amiable-945a0",
    storageBucket: "amiable-945a0.appspot.com",
    messagingSenderId: "535023941360",
    appId: "1:535023941360:web:aba0163ad1c739ef997435",
    measurementId: "G-1R6JKVEEZG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase