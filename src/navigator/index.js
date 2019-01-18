import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainScreen from "../screens/MainScreen";
import AddingScreen from "../screens/AddingScreen";
import PersonalScreen from "../screens/PersonalScreen";
import WithDrawScreen from "../screens/WithDrawScreen";
import CreateGoalScreen from "../screens/CreateGoalScreen";
import SplashScreen from "../screens/SpalshScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import GroupScreen from "../screens/GroupScreen";
import ContactScreen from "../screens/ContactScreen";
import ChartScreen from "../screens/ChartScreen";
import Icon from "react-native-vector-icons/FontAwesome5";

import appColor from "../commonColor";
import GameScreen from "../screens/GameScreen";
import SearchScreen from "../screens/SearchScreen";

const TabStack = createBottomTabNavigator(
  {
    Sub: SubscriptionScreen,
    Contact: ContactScreen
    // Chart: ChartScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Sub") {
          iconName = `heartbeat`;
        } else if (routeName == "Contact") {
          iconName = "user-md";
        } else if (routeName == "Chart") {
          iconName = "shopping-cart";
        }
        return (
          <Icon name={iconName} size={focused ? 25 : 20} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: appColor.primaryColor,
      inactiveTintColor: appColor.darkGrey,
      style: {
        backgroundColor: "#fafafa"
      }
    }
  }
);
const AppStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen
    },
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    },
    Main: {
      screen: MainScreen
    },
    Adding: {
      screen: AddingScreen
    },
    Withdrawing: {
      screen: WithDrawScreen
    },
    Personal: {
      screen: PersonalScreen
    },
    Group: {
      screen: GroupScreen
    },
    CreateGoal: {
      screen: CreateGoalScreen
    },
    TabStack: {
      screen: TabStack
    },
    Game: {
      screen: GameScreen
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Splash"
  }
);

export default createAppContainer(AppStack);
