import React, { Component } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  ProgressBarAndroid
} from "react-native";

import styles from "./styles";

import { connect } from "react-redux";
import Modal from "react-native-modal";
import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

import FirebaseAuth from "../../services/FirebaseAuth";
import {
  fetchBalance,
  fetchPersonalGoals,
  converChartAction,
  fetchExp,
  fetchAccount,
  fetchGroupGoals,
  fetchFriendlist,
  convertFriendlist
} from "../../actions/savingActions";
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      instructionModal: true
    };
    this.positionValue = new Animated.Value(100);
  }

  _renderCharacter = () => {
    if (this.props.piggyData.level <= 2) {
      return (
        <Image
          source={require("../../../assets/games/charlv1.png")}
          style={{ width: 100, height: 100 }}
        />
      );
    } else if (this.props.piggyData.level <= 4) {
      return (
        <Image
          source={require("../../../assets/games/charlv2.png")}
          style={{ width: 100, height: 100 }}
        />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/games/charlv3.png")}
          style={{ width: 100, height: 100 }}
        />
      );
    }
  };

  componentWillMount() {
    let { uid } = FirebaseAuth._checkUserProfile();
    this.props._fetchPersonalGoals(uid);
    this.props._fetchGroupGoals(uid);
    this.props._fetchBalance(uid);
    this.props._fetchExp(uid);
    this.props._fetchAccount(uid);
    this.props._fetchFriendlist(uid);
    this.props._convertFriendlist(this.props.friendList);
  }
  render() {
    let { piggyData } = this.props;
    return (
      <BasicLayout image noHeader>
        <AppView style={styles.container}>
          <AppView style={{ alignItems: "center", marginBottom: 5 }}>
            <AppText
              style={{ color: "#fff", fontSize: 24, fontFamily: "iciel-bold" }}
            >
              Welcome to Finpig
            </AppText>
          </AppView>
          <AppView
            style={{
              backgroundColor: "#fff",
              width: getLayout.width - 50,
              paddingVertical: 12,
              borderRadius: 5
            }}
          >
            <AppView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: "5%",
                paddingBottom: 5,
                borderBottomColor: "#ddd",
                borderBottomWidth: 1
              }}
            >
              <AppText>My Saving: </AppText>
              <AppText>{this.props.accountBalance} VND</AppText>
            </AppView>
            <AppView
              style={{
                flexWrap: "wrap",
                paddingHorizontal: "10%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: "5%",
                paddingBottom: "10%"
              }}
            >
              <AppView
                style={{
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.props.navigation.navigate("CreateGoal")}
              >
                <AppView style={styles.button}>
                  <Image
                    source={require("../../../assets/main_screen/button_main1.png")}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </AppView>

                <AppText>Create Goals</AppText>
              </AppView>
              <AppView
                style={{
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.props.navigation.navigate("Personal")}
              >
                <AppView style={styles.button}>
                  <Image
                    source={require("../../../assets/main_screen/button_main3.png")}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </AppView>
                <AppText>My Goals</AppText>
              </AppView>
              <AppView
                style={{
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.props.navigation.navigate("TabStack")}
              >
                <AppView style={styles.button}>
                  <Image
                    source={require("../../../assets/main_screen/button_main2.png")}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </AppView>
                <AppText>Explore</AppText>
              </AppView>
              <AppView
                style={{
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.props.navigation.navigate("Game")}
              >
                <AppView style={styles.button}>
                  <Image
                    source={require("../../../assets/main_screen/button_main4.png")}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </AppView>

                <AppText>My Piggy</AppText>
              </AppView>
            </AppView>
          </AppView>
          <AppView style={{ marginTop: 15 }}>
            <AppView center>
              <this._renderCharacter />
            </AppView>
            <AppView style={{ marginTop: 10 }}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={piggyData.currentExp / piggyData.nextExp}
                color={appColor.secondaryColor}
              />
            </AppView>
            <AppView center>
              <AppText>
                Need {piggyData.nextExp - piggyData.currentExp} EXP to reach
                level {piggyData.level + 1}
              </AppText>
            </AppView>
          </AppView>
        </AppView>
      </BasicLayout>
    );
  }
}

mapStateToProps = state => {
  let { accountBalance, piggyData, friendList, convertedFriends } = state;
  return {
    accountBalance,
    piggyData,
    friendList,
    convertedFriends
  };
};

mapDispatchToProps = dispatch => {
  return {
    _fetchBalance: uid => dispatch(fetchBalance(uid)),
    _fetchPersonalGoals: uid => dispatch(fetchPersonalGoals(uid)),
    _converChartAction: () => dispatch(converChartAction()),
    _fetchExp: uid => dispatch(fetchExp(uid)),
    _fetchAccount: uid => dispatch(fetchAccount(uid)),
    _fetchGroupGoals: uid => dispatch(fetchGroupGoals(uid)),
    _fetchFriendlist: uid => dispatch(fetchFriendlist(uid)),
    _convertFriendlist: list => dispatch(convertFriendlist(list))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
