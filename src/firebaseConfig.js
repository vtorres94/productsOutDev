import firebase from "firebase";
import 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyD2k9ic5BCCcQIRVcx_F26iPMFARI97zT0",
    authDomain: "products-825a7.firebaseapp.com",
    databaseURL: "https://products-825a7-default-rtdb.firebaseio.com",
    projectId: "products-825a7",
    storageBucket: "products-825a7.appspot.com",
    messagingSenderId: "357910972197",
    appId: "1:357910972197:web:5f23a09338aa961cd13ccc"
  };
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore;