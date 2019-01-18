import React, { Component } from "react";
import { Animated, Easing, FlatList, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import { connect } from "react-redux";

import BasicLayout from "../../components/basic/BasicLayout";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import AppHeader from "../../components/basic/AppHeader";
import GradientView from "../../components/basic/GradientView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import Icon from "react-native-vector-icons/FontAwesome5";
import FirebaseAuth from "../../services/FirebaseAuth";
import FirebaseApp from "../../services/FirebaseInit.js";
import { convertFriendlist } from "../../actions/savingActions";
class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.positionValue = new Animated.Value(500);
  }

  _onMove = () => {
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(this.positionValue, {
          toValue: 475,
          duration: 200,
          easing: Easing.linear
        }),
        Animated.timing(this.positionValue, {
          toValue: 500,
          duration: 200,
          easing: Easing.linear
        })
      ]).start(() => {
        this._onMove();
      });
    }, 2000);
  };
  _renderAvatar = item => {
    if (item.piggy.level < 3) {
      return (
        <Thumbnail source={require("../../../assets/games/charlv1.png")} />
      );
    } else if (item.piggy.level < 5) {
      return (
        <Thumbnail source={require("../../../assets/games/charlv2.png")} />
      );
    } else {
      return (
        <Thumbnail source={require("../../../assets/games/charlv3.png")} />
      );
    }
  };

  _onDelete = item => {
    let { uid } = FirebaseAuth._checkUserProfile();

    FirebaseApp.database()
      .ref(`users/${uid}/friendList/${item.uid}`)
      .remove();
  };
  componentWillMount() {
    this._onMove();
    this.props._convertFriendlist([...this.props.friendList]);
  }

  _keyExtractor = (item, index) => item.uid;
  _renderItem = ({ item }) => (
    <ListItem avatar style={{ marginBottom: 10 }}>
      <Left>{this._renderAvatar(item)}</Left>
      <Body>
        <AppText>Username: {item.username}</AppText>
        <AppText note>Piggy Level: {item.piggy.level}</AppText>
      </Body>
      <Right style={{ alignItems: "center", justifyContent: "center" }}>
        <AppView
          onPress={() => {
            this._onDelete(item);
          }}
        >
          <Icon name="trash" size={25} color={appColor.primaryColor} />
        </AppView>
      </Right>
    </ListItem>
  );
  render() {
    return (
      <BasicLayout image noHeader>
        <AppView flexSize={1} style={{ alignItems: "center" }}>
          <AppView style={{ marginBottom: 20 }} center>
            <AppText fontSize={18} fontColor={appColor.fullWhite}>
              Your Friends!
            </AppText>
          </AppView>
          <Animated.View
            style={{
              position: "absolute",
              right: 50,
              top: this.positionValue
            }}
          >
            <AppView>
              <AppView
                onPress={() => {
                  this.props.navigation.navigate("Search");
                }}
                style={{
                  backgroundColor: appColor.primaryColor,
                  padding: 10,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="user-plus" size={25} color="#FFF" />
              </AppView>
            </AppView>
          </Animated.View>
          <AppView
            style={{
              borderRadius: 10,
              width: getLayout.width - 50,
              backgroundColor: appColor.fullWhite
            }}
          >
            <FlatList
              data={this.props.convertedFriends}
              extraData={this.props}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </AppView>
        </AppView>
      </BasicLayout>
    );
  }
}

mapStateToProps = state => {
  let { friendList, convertedFriends } = state;
  return { friendList, convertedFriends };
};

mapDispatchToProps = dispatch => {
  return {
    _convertFriendlist: list => dispatch(convertFriendlist(list))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactScreen);
