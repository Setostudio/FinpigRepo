import React, { Component } from "react";
import { Container, Content, Left, Body, Right, Button } from "native-base";

import { withNavigation } from "react-navigation";
import styles from "./styles";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AppText from "../AppText";

const { width, height } = Dimensions.get("window");
class BasicLayout extends Component {
  render() {
    const containerStyle = this.props.styles
      ? { ...styles.Container, ...this.props.styles }
      : styles.Container;
    return (
      <Container
        style={{
          ...containerStyle,
          backgroundColor: this.props.image ? "#ececec" : "#fff"
        }}
      >
        {!this.props.noHeader && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Left style={{ marginLeft: 20, flex: 1 }}>
              <Button
                transparent
                onPress={() => {
                  if (this.props.customBack) {
                    this.props.customBack();
                  } else {
                    this.props.navigation.goBack();
                  }
                }}
              >
                <Icon name="ios-arrow-back" color="white" size={35} />
              </Button>
            </Left>
            <Body style={{ flex: 6, alignItems: "flex-start" }}>
              <View
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <AppText
                    style={{
                      fontFamily: "iciel-bold",
                      fontSize: 20,
                      color: "#fff"
                    }}
                    numberOfLines={1}
                  >
                    {this.props.title}
                  </AppText>
                </TouchableOpacity>
              </View>
            </Body>
          </View>
        )}

        {this.props.image && (
          <Image
            source={require("../../../../assets/main_screen/background_pink.png")}
            style={{
              width: width,
              height: height / 2,
              position: "absolute",
              zIndex: -1
            }}
          />
        )}
        <View style={{ flex: 1 }}>{this.props.children}</View>
      </Container>
    );
  }
}

export default withNavigation(BasicLayout);
