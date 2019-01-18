import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { connect } from "react-redux";

import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import PureChart from "react-native-pure-chart";

import { converChartAction } from "../../actions/savingActions";
class ChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}
  render() {
    return (
      <AppView image noHeader>
        <PureChart data={this.props.listPersonalChart} type="pie" />
      </AppView>
    );
  }
}
mapStateToProps = state => {
  let { listPersonalGoal, listPersonalChart, listGroupChart } = state;
  return { listPersonalGoal, listPersonalChart, listGroupChart };
};

mapDispatchToProps = dispatch => {
  return {
    _fetchPersonalGoals: uid => dispatch(fetchPersonalGoals(uid))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartScreen);
