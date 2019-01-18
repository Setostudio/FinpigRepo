import React, { Component } from "react";
import { View, Text } from "react-native";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import savingReducer from "./src/reducers/savingReducer";
import AppStack from "./src/navigator";

const store = createStore(savingReducer, applyMiddleware(thunk));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFView : 
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppStack />
        </Root>
      </Provider>
    );
  }
}

export default App;
