import React, { Component } from "react";
import { Alert } from "react-native";
import { Toast } from "native-base";
import FirebaseApp from "./FirebaseInit.js";
class FirebaseAuth extends Component {
  _onTest = () => {
    Alert.alert("Test");
  };
  _onSignin = (email, password, navigationProps) => {
    FirebaseApp.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigationProps.navigation.navigate("Main");
      })
      .catch(err => {
        Toast.show({
          text: "Signin Failed!",
          buttonText: "Okay"
        });
      });
  };
  _checkUserStatus = newProps => {
    FirebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        newProps.navigation.navigate("Main");
      } else {
        newProps.navigation.navigate("Login");
      }
    });
  };
  _checkUserProfile = () => {
    let authenData = FirebaseApp.auth().currentUser;
    return {
      name: authenData.displayName,
      email: authenData.email,
      uid: authenData.uid,
      photoUrl: authenData.photoUrl
    };
  };
  _registerUser = (email, password, username, navigationProps) => {
    FirebaseApp.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let { uid, email } = this._checkUserProfile();
        FirebaseApp.database()
          .ref(`users/${uid}`)
          .set({
            username: username,
            balance: 200000,
            email,
            uid: uid,
            piggy: {
              totalExp: 0,
              houseLevel: 0,
              currentExp: 0,
              level: 0,
              nextExp: 1000
            }
          });
        navigationProps.navigation.navigate("Main");
      })
      .catch(err => {
        Toast.show({
          text: "Register Failed!",
          buttonText: "Okay"
        });
      });
  };
}

export default new FirebaseAuth();
