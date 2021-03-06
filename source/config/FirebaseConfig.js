import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

export default firebaseConfig = {
    /* 임빈영 firebase API */
    apiKey: 'AIzaSyBQLLkB8UURaJzKlJgkSZA_9wI7dhckg_c',
    authDomain: 'delivery-together-ce4d6.firebaseapp.com',
    databaseURL: 'https://delivery-together-ce4d6-default-rtdb.firebaseio.com',
    projectId: 'delivery-together-ce4d6',
    storageBucket: 'delivery-together-ce4d6.appspot.com',
    messagingSenderId: '173212582846',
    appId: '1:173212582846:web:0d87b8f820f474b4856fef',
    measurementId: 'G-K3G7M40Q7L'

    /* 김덕중 firebase API */
    // databaseURL: "https://deliverytogether-fdb-default-rtdb.firebaseio.com",
    // apiKey: "AIzaSyDYkrAmoneTeSMEOsPx6m4Fy_VgPyqolak",
    // authDomain: "deliverytogether-fdb.firebaseapp.com",
    // projectId: "deliverytogether-fdb",
    // storageBucket: "deliverytogether-fdb.appspot.com",
    // messagingSenderId: "318412209859",
    // appId: "1:318412209859:web:1657e53a3eb8ea6584ac76",
    // measurementId: "G-G3G4SB2EV0"
};

let app;

if (firebase.apps.length === 0)
    app = firebase.initializeApp(firebaseConfig);
else
    app = firebase.app();

const auth = firebase.auth();

export { auth };