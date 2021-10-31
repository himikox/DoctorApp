import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyANVJzW_IfN40s_IWPJm-fec9mPXkvErYY",
    authDomain: "doctorsina-f6209.firebaseapp.com",
    databaseURL: "https://doctorsina-f6209.firebaseio.com",
    projectId: "doctorsina-f6209",
    storageBucket: "doctorsina-f6209.appspot.com",
    messagingSenderId: "xxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxxx"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;
