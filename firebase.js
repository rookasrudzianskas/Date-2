import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDz7vT-jEZwHXUdX0S0VDjAkOCeocxk7Oc",
    authDomain: "rookas-tinder.firebaseapp.com",
    projectId: "rookas-tinder",
    storageBucket: "rookas-tinder.appspot.com",
    messagingSenderId: "665993343465",
    appId: "1:665993343465:web:3ab8de68626f4e5e30db78",
    measurementId: "G-CNKMJMPH9D"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};
