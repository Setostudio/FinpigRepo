import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

import { connect } from "react-redux";

import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import Icon from "react-native-vector-icons/FontAwesome5";

import { toggleTypeAction, fetchGroupGoals } from "../../actions/savingActions";

import CardGoal from "../../components/others/CardGoal";
import FirebaseAuth from "../../services/FirebaseAuth";
import FirebaseApp from "../../services/FirebaseInit.js";
class GroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    let { uid } = FirebaseAuth._checkUserProfile();
    this.props._fetchGroupGoals(uid);
  }
  _keyExtractor = item => item.uid;

  _renderItem = ({ item }) => (
    <CardGoal
      _onAdd={() => {
        this.props._toggleTypeAction(false, item);
        this.props.navigation.navigate("Adding");
      }}
      goalName={item.goalIcon.title}
      currentAmount={item.currentAmount}
      goalIcon={item.goalIcon}
      goalAmount={item.goalAmount}
    />
  );
  render() {
    return (
      <BasicLayout image title="Your group saving!">
        <AppView flexSize={1} center>
          <FlatList
            data={this.props.listGroupGoal}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </AppView>
      </BasicLayout>
    );
  }
}

mapStateToProps = state => {
  let { listGroupGoal, isPersonal } = state;
  return { listGroupGoal, isPersonal };
};

mapDispatchToProps = dispatch => {
  return {
    _fetchPersonalGoals: uid => dispatch(fetchPersonalGoals(uid)),
    _fetchGroupGoals: uid => dispatch(fetchGroupGoals(uid)),
    _toggleTypeAction: (uid, currentItem) =>
      dispatch(toggleTypeAction(uid, currentItem))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupScreen);
