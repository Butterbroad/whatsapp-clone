import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDnikrzKT-IlpG212L0mYLsQNGOE9CGKQQ",
    authDomain: "whatsapp-clone-9fe79.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-9fe79.firebaseio.com",
    projectId: "whatsapp-clone-9fe79",
    storageBucket: "whatsapp-clone-9fe79.appspot.com",
    messagingSenderId: "317841873034",
    appId: "1:317841873034:web:e98cb06564f0df29bdf573",
    measurementId: "G-4WEVE8GW01"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();

const auth = firebase.auth();

const FieldValue = firebase.firestore.FieldValue;

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, FieldValue };
export default db;