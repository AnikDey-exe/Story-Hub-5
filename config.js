import firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCnh9uyHylvj0wV2Lv-vNtViQIxZq1X_cg",
    authDomain: "story-hub-30cae.firebaseapp.com",
    projectId: "story-hub-30cae",
    storageBucket: "story-hub-30cae.appspot.com",
    messagingSenderId: "493705237292",
    appId: "1:493705237292:web:d001e5bb8d890cc9571289"
  };
 
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();