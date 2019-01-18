import React, { Component } from "react";
import { FlatList, Image, Picker, TextInput } from "react-native";
import { Button, Toast, CheckBox } from "native-base";
import { connect } from "react-redux";
import {
  toggleIconAction,
  createPersonalGoalAction,
  fetchPersonalGoals
} from "../../actions/savingActions";

import styles from "./styles";
import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";
import { convertFriendlist, selectFriend } from "../../actions/savingActions";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import PinkyInput from "../../components/others/PinkyInput";
import FirebaseAuth from "../../services/FirebaseAuth";
import FirebaseApp from "../../services/FirebaseInit.js";

class CreateGoalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPersonal: true,
      listDate: [],
      amountSelection: 50000,
      isPersonal: true,
      goalName: "",
      goalAmount: 25000,
      modalGoalAmount: 0,
      goalIcon: {},
      amountModal: false,
      typeModal: false,
      iconModal: false,
      friendModal: false
    };
  }

  componentWillMount() {
    this.props._convertFriendlist([...this.props.friendList]);
  }
  _toggleSelection = () => {
    this.setState(prevState => ({
      isPersonal: !prevState.isPersonal
    }));
  };
  _onSelectItem = id => {
    this.props._toggleIconAction(id);
  };

  _onCreateGoal = (uid, goalAmount, goalIcon, savingType) => {
    if (goalAmount < 25000) {
      Toast.show({
        text: "Your goal must be larger than 25000 VND!",
        buttonText: "Okay"
      });
    } else {
      if (!savingType) {
        FirebaseApp.database()
          .ref(`goals/group/${uid}`)
          .push()
          .set({
            goalAmount,
            goalIcon,
            savingType,
            currentAmount: 0
          });

        this.props.navigation.navigate("Main");
      } else {
        FirebaseApp.database()
          .ref(`goals/personal/${uid}`)
          .push()
          .set({
            goalAmount,
            goalIcon,
            savingType,
            currentAmount: 0
          });

        this.props.navigation.navigate("Main");
      }
    }
  };

  _renderFriends = ({ item }) => {
    return (
      <AppView center style={{ marginTop: 15 }}>
        <AppView style={{ width: 200 }} row center>
          <AppView
            flexSize={3}
            style={{ alignItems: "flex-start", marginRight: 20 }}
          >
            <AppText>{item.username}</AppText>
            <AppView style={{ marginTop: 10 }}>
              <AppText fontColor={item.color}>Level {item.piggy.level}</AppText>
            </AppView>
          </AppView>
          <AppView
            flexSize={1}
            onPress={() => {
              this.props._selectFriend(item.uid);
            }}
          >
            <CheckBox checked={item.isSelected ? true : false} />
          </AppView>
        </AppView>
      </AppView>
    );
  };
  _renderFriendModal = () => {
    return (
      <Modal
        isVisible={this.state.friendModal}
        onBackButtonPress={() => {
          this.setState({ friendModal: false });
        }}
        onBackdropPress={() => {
          this.setState({ friendModal: false });
        }}
      >
        <AppView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AppView
            style={{
              backgroundColor: "#FFF",
              width: (getLayout.width * 2) / 3,
              height: (getLayout.height * 2) / 3,
              borderRadius: 20
            }}
          >
            <AppView flexSize={1} style={{ padding: 20 }}>
              <FlatList
                data={this.props.convertedFriends}
                extraData={this.props}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderFriends}
              />
            </AppView>
          </AppView>
        </AppView>
      </Modal>
    );
  };
  _renderIcon = ({ item }) => {
    return (
      <AppView
        center
        style={{ marginTop: 15 }}
        onPress={() => {
          this.props._toggleIconAction(item.id);
          this.setState({ iconModal: false });
        }}
      >
        <AppView style={{ width: 200 }} row center>
          <AppView
            flexSize={1}
            style={{ alignItems: "flex-start", marginRight: 20 }}
          >
            <Icon name={item.name} size={35} color={item.color} />
          </AppView>
          <AppView flexSize={3}>
            <AppText fontSize={18} fontColor={item.color}>
              {item.title}
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  };
  _renderIconModal = () => {
    return (
      <Modal
        isVisible={this.state.iconModal}
        onBackButtonPress={() => {
          this.setState({ iconModal: false });
        }}
        onBackdropPress={() => {
          this.setState({ iconModal: false });
        }}
      >
        <AppView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AppView
            style={{
              backgroundColor: "#FFF",
              width: (getLayout.width * 2) / 3,
              height: (getLayout.height * 2) / 3,
              borderRadius: 20
            }}
          >
            <AppView flexSize={1} style={{ padding: 20 }}>
              <FlatList
                data={this.props.listSelectionIcon}
                extraData={this.props}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderIcon}
              />
            </AppView>
          </AppView>
        </AppView>
      </Modal>
    );
  };

  _renderAmountModal = () => {
    return (
      <Modal
        isVisible={this.state.amountModal}
        onBackButtonPress={() => {
          this.setState({ amountModal: false });
        }}
        onBackdropPress={() => {
          this.setState({ amountModal: false });
        }}
      >
        <AppView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AppView
            style={{
              backgroundColor: "#FFF",
              width: (getLayout.width * 2) / 3,
              height: getLayout.height / 3,
              borderRadius: 20
            }}
          >
            <AppView flexSize={2} center>
              <AppText>Select your goal!</AppText>
              <TextInput
                placeholder="What's your goal amount?"
                style={{
                  borderBottomColor: appColor.primaryColor,
                  borderBottomWidth: 1,
                  fontFamily: "OpenSans-Regular"
                }}
                keyboardType="numeric"
                onChangeText={e => {
                  this.setState({ modalGoalAmount: e });
                }}
              />
            </AppView>
            <AppView flexSize={1}>
              <AppView row>
                <AppView flexSize={1} style={{ alignItems: "flex-end" }}>
                  <AppView
                    center
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 20,
                      paddingLeft: 20,
                      backgroundColor: appColor.errorColor,
                      borderRadius: 20,
                      marginRight: 10
                    }}
                    onPress={() => {
                      this.setState({ amountModal: false });
                    }}
                  >
                    <AppText fontColor={appColor.fullWhite} fontSize={16} bold>
                      Later
                    </AppText>
                  </AppView>
                </AppView>
                <AppView flexSize={1} style={{ alignItems: "flex-start" }}>
                  <AppView
                    center
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 20,
                      paddingLeft: 20,
                      backgroundColor: appColor.primaryColor,
                      borderRadius: 20,
                      marginLeft: 10
                    }}
                    onPress={() => {
                      this.setState(prevState => ({
                        goalAmount: prevState.modalGoalAmount,
                        amountModal: false
                      }));
                    }}
                  >
                    <AppText fontColor={appColor.fullWhite} fontSize={16} bold>
                      Confirm
                    </AppText>
                  </AppView>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </Modal>
    );
  };
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <AppView
      onPress={() => {
        this._onSelectItem(item.id);
      }}
      center
      style={{
        width: (getLayout.width - 80) / 4,
        marginTop: 10,
        marginleft: 10,
        borderRadius: 5,
        backgroundColor: item.isSelected ? "#FFF" : null
      }}
    >
      <Icon name={item.name} color={item.color} size={25} />
      <AppView>
        <AppText fontColor={item.color}>{item.title}</AppText>
      </AppView>
    </AppView>
  );
  render() {
    return (
      <BasicLayout image>
        <AppView style={styles.container}>
          <this._renderFriendModal />
          <this._renderAmountModal />
          <this._renderIconModal />
          <AppView
            style={{
              backgroundColor: "#fff",
              width: getLayout.width - 50,
              alignItems: "center",
              paddingVertical: 12,
              borderRadius: 5
            }}
          >
            <AppView center>
              <AppText bold fontSize={18} fontColor={appColor.primaryColor}>
                You are set to save:
              </AppText>
            </AppView>
            <AppView style={{ marginTop: 20, width: getLayout.width }} center>
              <AppView row center>
                <AppView
                  onPress={() => {
                    this.setState({ amountModal: true });
                  }}
                  style={{
                    padding: 15,
                    backgroundColor: appColor.primaryColor,
                    borderRadius: 20
                  }}
                >
                  <AppText bold fontSize={15} fontColor={appColor.fullWhite}>
                    {this.state.goalAmount} VND
                  </AppText>
                </AppView>
              </AppView>
              <AppView row style={{ marginTop: 20 }}>
                <AppView
                  onPress={() => {
                    this.setState(prevState => ({
                      isPersonal: !prevState.isPersonal
                    }));
                  }}
                  style={{
                    padding: 15,
                    backgroundColor: appColor.primaryColor,
                    borderRadius: 20
                  }}
                >
                  <AppText bold fontSize={15} fontColor={appColor.fullWhite}>
                    {this.state.isPersonal ? "personally" : "with friends"}
                  </AppText>
                </AppView>
              </AppView>
              <AppView row center style={{ marginTop: 20 }}>
                <AppView>
                  <AppView
                    style={{
                      padding: 15
                    }}
                  >
                    <AppText
                      bold
                      fontSize={15}
                      fontColor={appColor.primaryColor}
                    >
                      for
                    </AppText>
                  </AppView>
                </AppView>
                <AppView>
                  <AppView
                    onPress={() => {
                      this.setState({ iconModal: true });
                    }}
                    style={{
                      padding: 15,
                      backgroundColor: appColor.primaryColor,
                      borderRadius: 20
                    }}
                  >
                    <AppText bold fontSize={15} fontColor={appColor.fullWhite}>
                      {this.props.selectedIcon.title}
                    </AppText>
                  </AppView>
                </AppView>
              </AppView>
            </AppView>
            <AppView center style={{ marginTop: 20 }}>
              <Icon
                name={this.props.selectedIcon.name}
                size={50}
                color={this.props.selectedIcon.color}
              />
            </AppView>
            <AppView row style={{ marginTop: 40 }}>
              <AppView flexSize={1} center>
                <AppView
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingRight: 40,
                    paddingLeft: 40,
                    backgroundColor: appColor.errorColor,
                    borderRadius: 20
                  }}
                >
                  <AppText fontColor={appColor.fullWhite} fontSize={16} bold>
                    Not now
                  </AppText>
                </AppView>
              </AppView>
              <AppView flexSize={1} center>
                <AppView
                  onPress={() => {
                    let { uid } = FirebaseAuth._checkUserProfile();
                    this._onCreateGoal(
                      uid,
                      this.state.goalAmount,
                      this.props.selectedIcon,
                      this.state.isPersonal
                    );
                  }}
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingRight: 40,
                    paddingLeft: 40,
                    backgroundColor: appColor.primaryColor,
                    borderRadius: 20
                  }}
                >
                  <AppText fontColor={appColor.fullWhite} fontSize={16} bold>
                    Let's go
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </BasicLayout>
    );
  }
}

mapStateToProps = state => {
  let {
    listSelectionIcon,
    selectedIcon,
    listPersonalGoal,
    friendList,
    convertedFriends
  } = state;
  return {
    listSelectionIcon,
    selectedIcon,
    listPersonalGoal,
    friendList,
    convertedFriends
  };
};

mapDispatchToProps = dispatch => {
  return {
    _toggleIconAction: id => dispatch(toggleIconAction(id)),
    _createPersonalGoalAction: (uid, goalAmount, goalIcon, type) =>
      dispatch(createPersonalGoalAction(uid, goalAmount, goalIcon, type)),
    _fetchPersonalGoals: uid => dispatch(fetchPersonalGoals(uid)),
    _convertFriendlist: friendlist => dispatch(convertFriendlist(friendlist)),
    _selectFriend: uid => dispatch(selectFriend(uid))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGoalScreen);
