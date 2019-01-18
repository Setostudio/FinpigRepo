import React, { Component } from "react";
import { View, Image, Alert, ProgressBarAndroid } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Toast
} from "native-base";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import FirebaseApp from "../../services/FirebaseInit.js";
import FirebaseAuth from "../../services/FirebaseAuth";
class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  _renderHousing = () => {
    switch (this.props.piggyData.houseLevel) {
      case 1:
        return (
          <Image
            source={require("../../../assets/games/house/lv1.png")}
            style={{ width: getLayout.width - 50, height: 300 }}
            resizeMode="contain"
          />
        );
      case 2:
        return (
          <Image
            source={require("../../../assets/games/house/lv2.png")}
            style={{ width: getLayout.width - 50, height: 300 }}
            resizeMode="contain"
          />
        );
      case 3:
        return (
          <Image
            source={require("../../../assets/games/house/lv3.png")}
            style={{ width: getLayout.width - 50, height: 300 }}
            resizeMode="contain"
          />
        );
      case 4:
        return (
          <Image
            source={require("../../../assets/games/house/lv4.png")}
            style={{ width: getLayout.width - 50, height: 300 }}
            resizeMode="contain"
          />
        );
      case 5:
        return (
          <Image
            source={require("../../../assets/games/house/lv5.png")}
            style={{ width: getLayout.width - 50, height: 300 }}
            resizeMode="contain"
          />
        );
      default:
        return (
          <Image
            source={require("../../../assets/games/house/lv1.png")}
            style={{ width: getLayout.width - 50, height: 300 }}
            resizeMode="contain"
          />
        );
    }
  };
  _onBuy = (cost, gain) => {
    let { accountInfo } = this.props;
    if (cost > this.props.piggyData.totalExp) {
      Toast.show({
        text: "Not enough Gold!",
        buttonText: "Okay"
      });
      return;
    } else {
      let { uid } = FirebaseAuth._checkUserProfile();
      if (
        parseInt(accountInfo.piggy.currentExp) + parseInt(gain) >
        parseInt(accountInfo.piggy.nextExp)
      ) {
        FirebaseApp.database()
          .ref(`users/${uid}/piggy`)
          .set({
            ...accountInfo.piggy,
            level: accountInfo.piggy.level + 1,
            currentExp:
              parseInt(accountInfo.piggy.currentExp) +
              parseInt(gain) -
              parseInt(accountInfo.piggy.nextExp),
            nextExp: accountInfo.piggy.level * 2000,
            totalExp: parseInt(accountInfo.piggy.totalExp) + parseInt(gain)
          });
        Toast.show({
          text: `You have reached level ${accountInfo.piggy.level + 1}`,
          buttonText: "Okay"
        });
      } else {
        FirebaseApp.database()
          .ref(`users/${uid}/piggy`)
          .set({
            ...accountInfo.piggy,
            currentExp: parseInt(accountInfo.piggy.currentExp) + parseInt(gain),
            totalExp: parseInt(accountInfo.piggy.totalExp) - parseInt(cost)
          });
      }
    }
  };

  _renderCharacter = () => {
    if (this.props.piggyData.level <= 2) {
      return (
        <Image
          source={require("../../../assets/games/charlv1.png")}
          style={{ width: 200, height: 200 }}
        />
      );
    } else if (this.props.piggyData.level <= 4) {
      return (
        <Image
          source={require("../../../assets/games/charlv2.png")}
          style={{ width: 200, height: 200 }}
        />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/games/charlv3.png")}
          style={{ width: 200, height: 200 }}
        />
      );
    }
  };
  render() {
    let { piggyData } = this.props;
    return (
      <AppView style={{ flex: 1 }}>
        <AppView
          flexSize={1}
          style={{
            paddingHorizontal: "15%",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <Modal
            isVisible={this.state.isModalVisible}
            onBackButtonPress={() => {
              this.setState({ isModalVisible: false });
            }}
            onBackdropPress={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            <AppView
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <AppView
                center
                style={{
                  padding: 20,
                  backgroundColor: "#FFF",
                  borderRadius: 20
                }}
              >
                <AppView style={{ marginRight: 10 }}>
                  <AppText fontSize={18} fontColor={appColor.primaryColor}>
                    Upgrade Housing :{" "}
                    {this.props.gameData[this.props.piggyData.houseLevel]} Gold
                  </AppText>
                </AppView>
                <AppView row center style={{ marginTop: 15 }}>
                  <AppView
                    flexSize={1}
                    center
                    style={{
                      padding: 10,
                      borderRadius: 20,
                      backgroundColor: appColor.errorColor
                    }}
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <AppText fontColor={appColor.fullWhite} fontSize={16}>
                      No
                    </AppText>
                  </AppView>
                  <AppView
                    flexSize={1}
                    center
                    style={{
                      marginLeft: 10,
                      padding: 10,
                      borderRadius: 20,
                      backgroundColor: appColor.primaryColor
                    }}
                    onPress={this._onBuy}
                  >
                    <AppText fontSize={16} fontColor={appColor.fullWhite}>
                      Yes
                    </AppText>
                  </AppView>
                </AppView>
              </AppView>
            </AppView>
          </Modal>

          <AppView style={{ position: "absolute", top: 20, left: 20 }}>
            <AppView
              style={{ marginRight: 15 }}
              center
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={35} color={appColor.primaryColor} />
            </AppView>
          </AppView>

          <AppView style={{ position: "absolute", top: 10, right: 20 }}>
            <AppView row center>
              <AppView style={{ marginRight: 15 }} center>
                <AppText fontColor={appColor.primaryColor} fontSize={18}>
                  Gold Available: {this.props.piggyData.totalExp}
                </AppText>
              </AppView>
              <AppView
                onPress={() => {
                  this.setState({ isModalVisible: true });
                }}
              >
                <Image
                  source={require("../../../assets/games/house/icon.png")}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
              </AppView>
            </AppView>
          </AppView>
          <AppView flexSize={1} center>
            <this._renderCharacter />
            <AppView row style={{ marginTop: 20 }} center>
              <AppView
                center
                onPress={() => {
                  this._onBuy(200, 300);
                }}
              >
                <Image
                  source={require("../../../assets/games/house/foodlv1.png")}
                  style={{ width: 75, height: 75 }}
                  resizeMode="contain"
                />
                <AppView style={{ marginTop: 10 }}>
                  <AppText fontSize={18}>200 Gold</AppText>
                </AppView>
              </AppView>
              <AppView
                style={{ marginLeft: 20 }}
                center
                onPress={() => {
                  this._onBuy(400, 500);
                }}
              >
                <Image
                  source={require("../../../assets/games/house/foodlv2.png")}
                  style={{ width: 75, height: 75 }}
                  resizeMode="contain"
                />
                <AppView style={{ marginTop: 10 }}>
                  <AppText fontSize={18}>400 Gold</AppText>
                </AppView>
              </AppView>
              <AppView
                style={{ marginLeft: 20 }}
                center
                onPress={() => {
                  this._onBuy(600, 800);
                }}
              >
                <Image
                  source={require("../../../assets/games/house/foodlv3.png")}
                  style={{ width: 75, height: 75 }}
                  resizeMode="contain"
                />
                <AppView style={{ marginTop: 10 }}>
                  <AppText fontSize={18}>600 Gold</AppText>
                </AppView>
              </AppView>
            </AppView>
            <AppView style={{ marginTop: 20, width: 250 }}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={piggyData.currentExp / piggyData.nextExp}
                color={appColor.primaryColor}
              />
              <AppView center>
                <AppText>
                  {((piggyData.currentExp / piggyData.nextExp) * 100).toFixed(
                    2
                  )}
                  % completed to reach {piggyData.level + 1}
                </AppText>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

mapStateToProps = state => {
  let { accountBalance, piggyData, gameData, accountInfo } = state;
  return {
    gameData,
    accountBalance,
    piggyData,
    accountInfo
  };
};

mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameScreen);
