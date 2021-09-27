import firebase from 'firebase';

const config = firebase.initializeApp({
    apiKey: "AIzaSyB1TrouYOIyYfhP-1q6zyYEHn9Qe29KJm4",
    authDomain: "formatio-b4303.firebaseapp.com",
    databaseURL: "https://formatio-b4303-default-rtdb.firebaseio.com",
    projectId: "formatio-b4303",
    storageBucket: "formatio-b4303.appspot.com",
    messagingSenderId: "931966714909",
    appId: "1:931966714909:web:f7559bffb6d557dd7532f4",
    measurementId: "G-Z287JECFKP"
});

const dbh = firebase.firestore();

export {dbh}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
