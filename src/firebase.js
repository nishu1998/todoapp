// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQxY6NbdWUAyqP2QIkJkdr8PvRVq-98qw",
    authDomain: "todoapp-f68b2.firebaseapp.com",
    projectId: "todoapp-f68b2",
    storageBucket: "todoapp-f68b2.appspot.com",
    messagingSenderId: "624969487211",
    appId: "1:624969487211:web:7c61580c62f9edef88b22e",
    measurementId: "G-VCP1906CGZ"
  };;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };
