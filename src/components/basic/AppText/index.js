import React, { Component } from "react";
import { Text } from "react-native";

import appColor from "../../../commonColor";
class AppText extends Component {
  render() {
    return (
      <Text
        style={{
          fontSize: this.props.fontSize,
          color: this.props.fontColor
            ? this.props.fontColor
            : appColor.fullBlack,
          fontFamily: this.props.bold ? "OpenSans-Bold" : "OpenSans-Regular",
          ...this.props.style
        }}
      >
        {this.props.children}
      </Text>
    );
  }
}

export default AppText;
