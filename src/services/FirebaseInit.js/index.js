import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";
var config = {
  apiKey: "AIzaSyAVFrGC2eDCleGZcbh423lOkxRB-jqh--c",
  authDomain: "finpig.firebaseapp.com",
  databaseURL: "https://finpig.firebaseio.com",
  projectId: "finpig",
  storageBucket: "",
  messagingSenderId: "312318641838"
};
export default (firebaseApp = firebase.initializeApp(config));
