import React from "react";
import { Image, TouchableOpacity, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import styles from "./styles";
import { Item, Input, Button, Label, Spinner } from "native-base";

import appColor from "../../commonColor";

import AppText from "../../components/basic/AppText";
import AppView from "../../components/basic/AppView";

import getLayout from "../../helpers/getLayout";
import FirebaseAuth from "../../services/FirebaseAuth";
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  componentWillMount() {}
  _onLogin = () => {
    let { email, password } = this.state;

    FirebaseAuth._onSignin(email, password, this.props);
  };

  renderButton = () => {
    if (this.state.isLoading) {
      return <Spinner />;
    } else {
      return (
        <Button
          full
          style={{
            backgroundColor: appColor.secondaryColor,
            borderRadius: 5
          }}
          onPress={this._onLogin}
        >
          <AppText style={{ fontSize: 16 }}>SIGN IN</AppText>
        </Button>
      );
    }
  };
  render() {
    return (
      <AppView style={styles.container}>
        <AppView style={styles.logoContainer}>
          <Image
            source={require("../../../assets/login/logo.png")}
            style={{ width: getLayout.width - 90, height: 80 }}
          />
          <AppText fontSize={18} fontColor={appColor.primaryColor}>
            FOR FUN WITH SAVING
          </AppText>
        </AppView>
        <Item rounded>
          <Input
            placeholder="Your Email!"
            onPress={e => {
              this.setState({ email: e });
            }}
          />
        </Item>
        <Item rounded style={{ marginTop: 10 }}>
          <Input
            secureTextEntry={true}
            placeholder="Your Password!"
            onPress={e => {
              this.setState({ password: e });
            }}
          />
        </Item>
        <AppView style={{ marginTop: 20, width: "100%" }}>
          <this.renderButton />
        </AppView>
        <AppView
          center
          style={{
            marginTop: 15,
            flexDirection: "row"
          }}
        >
          <AppText fontSize={16}>Don't have an account? </AppText>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          >
            <AppText fontColor={appColor.primaryColor} fontSize={16}>
              Register here!
            </AppText>
          </TouchableOpacity>
        </AppView>
        <Image
          source={require("../../../assets/login/image.png")}
          style={{
            width: getLayout.width - 50,
            height: getLayout.height / 3
          }}
        />
      </AppView>
    );
  }
}
export default LoginScreen;
