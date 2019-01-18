import React, { Component } from "react";
import { ProgressBarAndroid } from "react-native";
import { withNavigation } from "react-navigation";
import AppText from "../../basic/AppText";
import AppView from "../../basic/AppView";
import appColor from "../../../commonColor";
import getLayout from "../../../helpers/getLayout";

import ProgressBar from "react-native-progress/Bar";

import Icon from "react-native-vector-icons/FontAwesome5";
class CardGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { goalName, currentAmount, goalAmount, goalIcon } = this.props;
    let percentage = ((currentAmount / goalAmount) * 100).toFixed(2);
    if (percentage >= 100) percentage = 100;
    return (
      <AppView
        row
        style={{
          marginTop: 15,
          backgroundColor: appColor.fullWhite,
          width: getLayout.width - 30,
          height: getLayout.height / 4,
          borderRadius: 10,
          padding: 5
        }}
      >
        <AppView flexSize={2} center>
          <Icon name={goalIcon.name} size={40} color={goalIcon.color} />
        </AppView>
        <AppView flexSize={4}>
          <AppView
            flexSize={1.5}
            style={{ justifyContent: "flex-end", paddingBottom: 5 }}
          >
            <AppText bold fontColor={appColor.darkGrey} fontSize={16}>
              {goalName}
            </AppText>
          </AppView>
          <AppView flexSize={1.5} row style={{ justifyContent: "flex-start" }}>
            <AppView flexSize={2}>
              <AppText fontSize={13} fontColor={appColor.cardGrey}>
                My Amount:
              </AppText>
              <AppView style={{ justifyContent: "center" }}>
                <AppText fontSize={16} bold fontColor={appColor.secondaryColor}>
                  {currentAmount}
                </AppText>
              </AppView>
            </AppView>
            <AppView flexSize={2}>
              <AppText fontColor={appColor.cardGrey}>My Goals:</AppText>
              <AppView style={{ justifyContent: "center" }}>
                <AppText fontSize={16} bold fontColor={appColor.secondaryColor}>
                  {goalAmount}
                </AppText>
              </AppView>
            </AppView>
          </AppView>
          <AppView flexSize={1.5} style={{ justifyContent: "flex-start" }}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={currentAmount / goalAmount}
            />
            <AppText>
              {percentage == 100 ? "Completed!" : `${percentage}% completed!`}
            </AppText>
          </AppView>
        </AppView>
        <AppView
          flexSize={1}
          center
          style={{
            borderLeftWidth: 0.25,
            borderLeftColor: appColor.cardGrey,
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <AppView
            onPress={() => {
              this.props._onAdd();
            }}
            flexSize={1}
            center
            style={{
              borderBottomWidth: 0.25,
              borderBottomColor: appColor.cardGrey
            }}
          >
            <Icon name="plus" size={20} color={appColor.secondaryColor} />
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

export default withNavigation(CardGoal);
