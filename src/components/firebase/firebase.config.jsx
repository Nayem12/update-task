// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs1Pp_2iRVztHUBDhyqhxxF5Ww4Z9zpIw",
    authDomain: "doctors-portal-b258f.firebaseapp.com",
    projectId: "doctors-portal-b258f",
    storageBucket: "doctors-portal-b258f.appspot.com",
    messagingSenderId: "583339140084",
    appId: "1:583339140084:web:9af9f5defaeb5a06078fa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app