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
  Text,
  Item,
  Form,
  Input
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
import {
  fetchSearchable,
  filterList,
  fetchFriendlist,
  convertFriendlist
} from "../../actions/savingActions";
import FirebaseApp from "../../services/FirebaseInit.js";
import FirebaseAuth from "../../services/FirebaseAuth";
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      listSearchable: [],
      filterList: []
    };
  }

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
  _onAdd = item => {
    let { uid } = FirebaseAuth._checkUserProfile();
    FirebaseApp.database()
      .ref(`users/${uid}/friendList/${item.uid}`)
      .set({
        friendID: item.uid
      });
    this.props._fetchFriendlist(uid);
    this.props._convertFriendlist(this.props.friendList);
  };
  _onSearch = () => {
    let item = [];
    for (let i = 0; i < this.prop.searchableList.length; i++) {
      if (
        this.prop.searchableList[i].username
          .toLowerCase()
          .includes(this.state.searchInput.toLowerCase())
      ) {
        item.push(this.prop.searchableList[i]);
      }
    }
    this.setState({ filterList: item });
  };
  componentWillMount() {
    FirebaseApp.database()
      .ref("users")
      .once("value")
      .then(snapShot => {
        let items = [];
        snapShot.forEach(child => {
          items.push({
            username: child.val().username ? child.val().username : "",
            uid: child.val().uid,
            piggy: child.val().piggy
          });
        });
        this.setState({ filterList: items });
      });
  }
  render() {
    return (
      <BasicLayout image>
        <AppView flexSize={1} style={{ alignItems: "center" }}>
          <AppView
            style={{
              borderRadius: 10,
              width: getLayout.width - 50,
              backgroundColor: appColor.fullWhite
            }}
          >
            <AppView
              style={{ marginBottom: 20, alignItems: "flex-end" }}
              center
            >
              <Item rounded>
                <Input
                  placeholder="Search Friends By Username"
                  onChangeText={e => {
                    this.setState({ searchInput: e });
                  }}
                />
                <AppView
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    this.props._filterList(this.state.searchInput);
                  }}
                >
                  <Icon name="search" size={25} color={appColor.primaryColor} />
                </AppView>
              </Item>
            </AppView>
            <List
              dataArray={this.state.filterList}
              renderRow={item => (
                <ListItem avatar style={{ marginBottom: 10 }}>
                  <Left>{this._renderAvatar(item)}</Left>
                  <Body>
                    <AppText>Username: {item.username}</AppText>
                    <AppText note>Piggy Level: {item.piggy.level}</AppText>
                  </Body>
                  <Right
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <AppView
                      onPress={() => {
                        this._onAdd(item);
                      }}
                    >
                      {this.props.friendList.includes(item.uid) && (
                        <Icon
                          name="user-check"
                          size={25}
                          color={appColor.primaryColor}
                        />
                      )}
                      {!this.props.friendList.includes(item.uid) && (
                        <Icon
                          name="user-plus"
                          size={25}
                          color={appColor.primaryColor}
                        />
                      )}
                    </AppView>
                  </Right>
                </ListItem>
              )}
            />
          </AppView>
        </AppView>
      </BasicLayout>
    );
  }
}

mapStateToProps = state => {
  let {
    listPersonalGoal,
    listChart,
    friendList,
    searchableList,
    filteredList
  } = state;
  return {
    listPersonalGoal,
    listChart,
    friendList,
    searchableList,
    filteredList
  };
};

mapDispatchToProps = dispatch => {
  return {
    _fetchSearchable: () => dispatch(fetchSearchable()),
    _fetchFriendlist: uid => dispatch(fetchFriendlist(uid)),
    _convertFriendlist: listFriend => dispatch(convertFriendlist(listFriend)),
    _filterList: keyword => dispatch(filterList(keyword))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
