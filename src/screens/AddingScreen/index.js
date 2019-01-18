import React, { Component } from "react";
import { Alert } from "react-native";

import { connect } from "react-redux";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import Ionicons from "react-native-vector-icons/Ionicons";
import PinkyInput from "../../components/others/PinkyInput";

import { fetchPersonalGoals } from "../../actions/savingActions";
import FirebaseApp from "../../services/FirebaseInit.js";
import FirebaseAuth from "../../services/FirebaseAuth";
class AddingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: 0
    };
  }

  _onAdd = () => {
    let { uid } = FirebaseAuth._checkUserProfile();
    let { currentItem, accountBalance, accountInfo } = this.props;
    let type = this.props.isPersonal ? "personal" : "group";

    if (parseInt(accountBalance) < parseInt(this.state.currentInput)) {
      Alert.alert("You don't have enough money left!");
      return;
    } else {
      FirebaseApp.database()
        .ref(`users/${uid}`)
        .set({
          ...accountInfo,
          balance: parseInt(accountBalance) - parseInt(this.state.currentInput)
        });
      FirebaseApp.database()
        .ref(`goals/${type}/${uid}/${currentItem.key}`)
        .set({
          ...currentItem,
          currentAmount:
            parseInt(currentItem.currentAmount) +
            parseInt(this.state.currentInput)
        });

      if (
        parseInt(accountInfo.piggy.currentExp) +
          parseInt(this.state.currentInput / 100) >
        parseInt(accountInfo.piggy.nextExp)
      ) {
        FirebaseApp.database()
          .ref(`users/${uid}/piggy`)
          .set({
            ...accountInfo.piggy,
            level: accountInfo.piggy.level + 1,
            currentExp:
              parseInt(accountInfo.piggy.currentExp) +
              parseInt(this.state.currentInput / 100) -
              parseInt(accountInfo.piggy.nextExp),
            nextExp: accountInfo.piggy.level * 2000,
            totalExp:
              parseInt(accountInfo.piggy.totalExp) +
              parseInt(this.state.currentInput / 100)
          });
        Alert.alert(`You have reached level ${accountInfo.piggy.level + 1}`);
      } else {
        FirebaseApp.database()
          .ref(`users/${uid}/piggy`)
          .set({
            ...accountInfo.piggy,
            currentExp:
              parseInt(accountInfo.piggy.currentExp) +
              parseInt(this.state.currentInput / 100),
            totalExp:
              parseInt(accountInfo.piggy.totalExp) +
              parseInt(this.state.currentInput / 100)
          });
      }
    }
    this.props.navigation.navigate("Main");
  };
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
              <PinkyInput
                keyboardType="numeric"
                onChangeText={e => {
                  this.setState({ currentInput: e });
                }}
              />
            </AppView>
            <AppView style={{ alignItems: "flex-end", marginTop: 20 }}>
              <AppView
                onPress={this._onAdd}
                center
                style={{
                  padding: 15,
                  backgroundColor: appColor.fullWhite,
                  width: 150,
                  borderRadius: 10
                }}
              >
                <AppText>Add to our saving</AppText>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

mapStateToProps = state => {
  let {
    listPersonalGoal,
    isPersonal,
    currentItem,
    accountBalance,
    accountInfo
  } = state;
  return {
    listPersonalGoal,
    isPersonal,
    currentItem,
    accountBalance,
    accountInfo
  };
};

export default connect(mapStateToProps)(AddingScreen);
