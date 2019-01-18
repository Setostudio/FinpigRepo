import React from "react";
import {
  Animated,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Button, Item, Input } from "native-base";

import style from "./style";
import PinkyInput from "../../components/others/PinkyInput";
import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";
import appColor from "../../commonColor";
import getLayout from "../../helpers/getLayout";

import FirebaseAuth from "../../services/FirebaseAuth";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1),
      rePassword: "",
      password: "",
      email: "",
      username: "",
      isLoading: false
    };
  }

  _onRegister = () => {
    let { rePassword, password, email, username } = this.state;
    if (rePassword == password) {
      FirebaseAuth._registerUser(email, password, username, this.props);
    } else {
      Alert.alert("Confirm Password must be correct!");
    }
  };
  render() {
    return (
      <ScrollView>
        <AppView
          center
          style={{
            marginTop: 20
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../../assets/register/icon_phone.png")}
          />
        </AppView>
        <View style={{ alignItems: "center", padding: 20 }}>
          <AppText
            pink
            style={{
              fontWeight: "bold",
              fontSize: 20
            }}
          >
            Registration
          </AppText>
        </View>
        <AppView style={{ padding: 20 }}>
          <AppView center>
            <AppView
              center
              style={{ marginBottom: 20, paddingHorizontal: "15%" }}
            >
              <Item rounded>
                <Input
                  placeholder="Email"
                  onChangeText={e => {
                    this.setState({ email: e });
                  }}
                />
              </Item>
              <Item rounded style={{ marginTop: 10 }}>
                <Input
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={e => {
                    this.setState({ password: e });
                  }}
                />
              </Item>
              <Item rounded style={{ marginTop: 10 }}>
                <Input
                  placeholder="Reconfirm Password"
                  secureTextEntry={true}
                  onChangeText={e => {
                    this.setState({ rePassword: e });
                  }}
                />
              </Item>
              <Item rounded style={{ marginTop: 10 }}>
                <Input
                  placeholder="What's your username?"
                  secureTextEntry={true}
                  onChangeText={e => {
                    this.setState({ username: e });
                  }}
                />
              </Item>
              <Button
                full
                style={{
                  marginTop: 15,
                  backgroundColor: appColor.secondaryColor,
                  borderRadius: 5
                }}
                onPress={this._onRegister}
              >
                <AppText style={{ fontSize: 16 }}>REGISTER</AppText>
              </Button>
              <AppView center row style={{ marginTop: 15 }}>
                <AppText fontSize={16}>Already have an account? </AppText>
                <AppView
                  onPress={() => {
                    this.props.navigation.navigate("Login");
                  }}
                >
                  <AppText fontColor={appColor.primaryColor} fontSize={16}>
                    Login here
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
          <AppView>
            <Image
              style={{
                width: getLayout.width - 50,
                height: getLayout.height / 4
              }}
              source={require("../../../assets/register/img_saving.png")}
            />
          </AppView>
        </AppView>
      </ScrollView>
    );
  }
}

export default Register;
