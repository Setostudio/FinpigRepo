import React, { Component } from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import appColor from "../../../commonColor";
class GradientView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.green) {
      return (
        <LinearGradient
          colors={[
            appColor.gradientGreen.startingColor,
            appColor.gradientGreen.endingColor
          ]}
          style={{ ...this.props.style }}
        >
          {this.props.children}
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient
          colors={[
            appColor.gradientPink.startingColor,
            appColor.gradientPink.endingColor
          ]}
          style={{ ...this.props.style }}
        >
          {this.props.children}
        </LinearGradient>
      );
    }
  }
}

export default GradientView;
