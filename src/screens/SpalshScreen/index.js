import React, { Component } from "react";
import { Vew, Animated, Easing, Picker } from "react-native";

import Modal from "react-native-modal";
import appColor from "../../commonColor";

import AppView from "../../components/basic/AppView";
import FirebaseAuth from "../../services/FirebaseAuth";
import AppText from "../../components/basic/AppText";
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
    setTimeout(() => {
      FirebaseAuth._checkUserStatus(this.props);
    }, 1000);
  }
  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(() => this.spin());
  };
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <AppView center flexSize={1}>
        <AppView>
          <Animated.Image
            style={{
              width: 80,
              height: 80,
              transform: [{ rotate: spin }]
            }}
            source={require("../../../assets/games/charlv3.png")}
          />
        </AppView>
      </AppView>
    );
  }
}

export default SplashScreen;
