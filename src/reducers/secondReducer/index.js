import { DO_SOMETHING } from "../../actions/types";

INITIAL_STATE = {};
const secondReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DO_SOMETHING:
      return state;
    default:
      return state;
  }
};

export default secondReducer;
