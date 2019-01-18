import React, { Component } from "react";
import { Animated, Easing, FlatList, Alert } from "react-native";

import { connect } from "react-redux";

import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import { converChartAction } from "../../actions/savingActions";
class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props._converChartAction();
  }
  render() {
    return (
      <BasicLayout
        image
        customBack={() => {
          this.props.navigation.navigate("Main");
        }}
      >
        <AppView flexSize={1} center>
          <AppView style={{ width: 150 }}>
            <AppText fontSize={18}>
              Tính năng liên kết với các đối tác của finpig sẽ được update sau!
            </AppText>
          </AppView>
        </AppView>
      </BasicLayout>
    );
  }
}

mapStateToProps = state => {
  let { listPersonalGoal, listChart } = state;
  return { listPersonalGoal, listChart };
};

mapDispatchToProps = dispatch => {
  return {
    _converChartAction: () => dispatch(converChartAction())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionScreen);
