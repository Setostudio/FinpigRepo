import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";
var config = {
//  
};
export default (firebaseApp = firebase.initializeApp(config));
