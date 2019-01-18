import React, { Component } from "react";
import {} from "react-native";

import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import Ionicons from "react-native-vector-icons/Ionicons";
import PinkyInput from "../../components/others/PinkyInput";
class WithDrawScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AppView flexSize={1}>
        <AppHeader backgroundColor={appColor.secondaryColor} backButton />
        <AppView
          style={{
            backgroundColor: appColor.secondaryColor,
            width: getLayout.width,
            height: (getLayout.height * 11) / 12
          }}
        >
          <AppView style={{ flex: 1, marginLeft: 25, marginRight: 25 }}>
            <AppView>
              <PinkyInput keyboardType="numeric" />
            </AppView>
            <AppView style={{ alignItems: "flex-end", marginTop: 20 }}>
              <AppView
                center
                style={{
                  padding: 15,
                  backgroundColor: appColor.fullWhite,
                  width: 150,
                  borderRadius: 10
                }}
              >
                <AppText>Withdraw money</AppText>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

export default WithDrawScreen;
