import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";

class AppView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let centerProps = {};
    if (this.props.center) {
      centerProps = {
        alignItems: "center",
        justifyContent: "center"
      };
    }
    if (this.props.onPress) {
      return (
        <TouchableOpacity
          onPress={this.props.onPress}
          style={{
            ...centerProps,
            flex: this.props.flexSize,
            flexDirection: this.props.row ? "row" : "column",
            ...this.props.style
          }}
        >
          {this.props.children}
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={{
            ...centerProps,
            flex: this.props.flexSize,
            flexDirection: this.props.row ? "row" : "column",
            ...this.props.style
          }}
        >
          {this.props.children}
        </View>
      );
    }
  }
}

export default AppView;
