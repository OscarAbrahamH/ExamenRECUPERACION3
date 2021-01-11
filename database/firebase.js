import firebase from 'firebase/app';
import 'firebase/database';

const config={
    apiKey: "AIzaSyDGbSEXwt2IS0vsJcIKVhh9iCOBc7Ql_rA",
    authDomain: "examenrecuperacionu3.firebaseapp.com",
    projectId: "examenrecuperacionu3",
    storageBucket: "examenrecuperacionu3.appspot.com",
    messagingSenderId: "810719859555",
    appId: "1:810719859555:web:ca38a022732649d52eb956",
    measurementId: "G-JV5ZXX2S44"
}

const db = !firebase.apps.lenght ? firebase.initializeApp(config):firebase.app()

export default db;