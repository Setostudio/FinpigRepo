import { combineReducer } from "redux";
import savingReducer from "./savingReducer";
import secondReducer from "./secondReducer";

const allreducer = combineReducer({
  saving: savingReducer,
  second: secondReducer
});
export default allreducer;
