import {
  TOGGLE_ICON,
  CREATE_PERSONAL_GOAL,
  FETCH_PERSONAL_GOALS,
  TOGGLE_TYPE,
  ADD_MONEY_GOAL,
  FETCH_GROUP_GOALS,
  FETCH_BALANCE,
  CONVERT_CHART,
  FETCH_EXP,
  FETCH_ACCOUNT_INFO,
  FETCH_FRIEND_LIST,
  CONVERT_FRIEND_LIST,
  FETCH_SEARCHABLE_LIST,
  FILTER_LIST,
  SELECT_ITEM
} from "../../actions/types";
import { Alert } from "react-native";
import FirebaseApp from "../../services/FirebaseInit.js";
import appColor from "../../commonColor";
import data from "../../data";
const savingReducer = (state = data, action) => {
  switch (action.type) {
    case FETCH_BALANCE:
      return { ...state, accountBalance: action.payload };
    case FETCH_PERSONAL_GOALS:
      return { ...state, listPersonalGoal: action.payload };
    case FETCH_FRIEND_LIST:
      return { ...state, friendList: action.payload };
    case FETCH_ACCOUNT_INFO:
      return { ...state, accountInfo: action.payload };
    case FETCH_GROUP_GOALS:
      return { ...state, listGroupGoal: action.payload };
    case CONVERT_FRIEND_LIST:
      return { ...state, convertedFriends: action.payload };
    case FETCH_SEARCHABLE_LIST:
      return { ...state, searchableList: action.payload };
    case FILTER_LIST:
      let item = [];
      for (let i = 0; i < state.searchableList.length; i++) {
        if (
          state.searchableList[i].username
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ) {
          item.push(state.searchableList[i]);
        }
      }
      return { ...state, filteredList: items };
    case CONVERT_CHART:
      let items = [];
      let currentPersonal = 0;
      let totalPersonal = 0;
      let alterList = [...state.listPersonalGoal];
      for (let i = 0; i < alterList.length; i++) {
        totalPersonal =
          parseInt(totalPersonal) + parseInt(alterList[i].goalAmount);
        currentPersonal =
          parseInt(currentPersonal) + parseInt(alterList[i].currentAmount);
      }

      return {
        ...state,
        listPersonalChart: [
          {
            value: currentPersonal,
            label: "My Saving",
            color: appColor.primaryColor
          },
          {
            value: totalPersonal - currentPersonal,
            label: "My Goals",
            color: appColor.lightGrey
          }
        ]
      };

    case TOGGLE_ICON:
      let alterIcon = [...state.listSelectionIcon];
      for (let i = 0; i < alterIcon.length; i++) {
        if (alterIcon[i].id == action.payload) {
          return { ...state, selectedIcon: alterIcon[i] };
        }
      }
      return { ...state };
    case TOGGLE_TYPE:
      return {
        ...state,
        isPersonal: action.payload.isPersonal,
        currentItem: action.payload.currentItem
      };
    case SELECT_ITEM:
      let listFriends = [...state.convertedFriends];
      let productIndex;
      for (let i = 0; i < listFriends.length; i++) {
        if (listFriends[i].uid == action.payload) {
          listFriends[i].isSelected = true;
        } else {
          listFriends[i].isSelected = false;
        }
      }
      return { ...state, convertedFriends: listFriends };
    case FETCH_EXP:
      return { ...state, piggyData: action.payload };
    default:
      return state;
  }
};

export default savingReducer;
