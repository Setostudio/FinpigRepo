import React, { Component } from "react";

import { withNavigation } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppView from "../AppView";

import AppText from "../AppText";
import appColor from "../../../commonColor";
import getLayout from "../../../helpers/getLayout";
class AppHeader extends Component {
  render() {
    return (
      <AppView
        center
        row
        style={{
          width: getLayout.width,
          height: getLayout.height / 12,
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : "#FFF"
        }}
      >
        <AppView flexSize={1} style={{ marginLeft: 10 }}>
          {this.props.backButton && (
            <AppView
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons
                name="ios-arrow-back"
                size={30}
                color={
                  this.props.backgroundColor ? "#FFF" : appColor.primaryColor
                }
              />
            </AppView>
          )}
        </AppView>
        <AppView flexSize={4} style={{ alignItems: "flex-start" }}>
          <AppText fontSize={18} fontColor={appColor.primaryColor}>
            {this.props.title}
          </AppText>
        </AppView>
        <AppView flexSize={1} row style={{ alignItems: "flex-end" }}>
          {this.props.leftButton && (
            <AppView>
              <Ionicons
                name="ios-menu"
                size={30}
                color={appColor.primaryColor}
              />
            </AppView>
          )}
        </AppView>
      </AppView>
    );
  }
}

export default withNavigation(AppHeader);
