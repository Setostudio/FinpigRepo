import React, { Component } from "react";
import { View, TextInput } from "react-native";
import AppText from "../../basic/AppText";
import styles from "./styles";
class AppPinkyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <AppText style={styles.textStyle}>{this.props.title}</AppText>
        <TextInput
          placeholder={this.props.placeholder}
          style={this.props.styles ? this.props.styles : styles.inputStyle}
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

export default AppPinkyInput;
