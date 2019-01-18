import React, { Component } from "react";
import { FlatList } from "react-native";

import { connect } from "react-redux";

import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import {
  fetchPersonalGoals,
  toggleTypeAction
} from "../../actions/savingActions";
import Icon from "react-native-vector-icons/FontAwesome5";

import CardGoal from "../../components/others/CardGoal";
import FirebaseAuth from "../../services/FirebaseAuth";
class PersonalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPersonal: true
    };
  }
  componentWillMount() {
    let { uid } = FirebaseAuth._checkUserProfile();
  }

  _toggleView = () => {
    this.setState(prevState => ({
      isPersonal: !prevState.isPersonal
    }));
  };
  _keyExtractor = item => item.uid;

  _renderItem = ({ item }) => (
    <CardGoal
      _onAdd={() => {
        this.props._toggleTypeAction(true, item);
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
      <BasicLayout image title="Your savings!">
        <AppView flexSize={1} center>
          <AppView row>
            <AppView
              onPress={() => {
                this.setState({ isPersonal: true });
              }}
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: this.state.isPersonal
                  ? appColor.primaryColor
                  : appColor.lightGrey
              }}
            >
              <AppText>Personal Goals</AppText>
            </AppView>
            <AppView
              onPress={() => {
                this.setState({ isPersonal: false });
              }}
              style={{
                marginLeft: 20,
                padding: 10,
                borderRadius: 10,
                backgroundColor: !this.state.isPersonal
                  ? appColor.primaryColor
                  : appColor.lightGrey
              }}
            >
              <AppText>Group Goals</AppText>
            </AppView>
          </AppView>
          <FlatList
            data={
              this.state.isPersonal
                ? this.props.listPersonalGoal
                : this.props.listGroupGoal
            }
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
  let { listPersonalGoal, isPersonal, listGroupGoal } = state;
  return { listPersonalGoal, isPersonal, listGroupGoal };
};

mapDispatchToProps = dispatch => {
  return {
    _fetchPersonalGoals: uid => dispatch(fetchPersonalGoals(uid)),
    _toggleTypeAction: (uid, currentItem) =>
      dispatch(toggleTypeAction(uid, currentItem))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalScreen);
