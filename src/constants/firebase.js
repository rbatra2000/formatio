import * as firebase from 'firebase';

const config = firebase.initializeApp({
    apiKey: "AIzaSyCP7f-0gM04PNKyg_61zNHrEcoGuv5csww",
    authDomain: "choreox.firebaseapp.com",
    databaseURL: "https://choreox.firebaseio.com",
    projectId: "choreox",
    storageBucket: "choreox.appspot.com",
    messagingSenderId: "282857958796",
    appId: "1:282857958796:web:a4823f4d0f62548ee9baa9",
    measurementId: "G-G85QRHSBW3"
});

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
