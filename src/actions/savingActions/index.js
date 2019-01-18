import {
  TOGGLE_ICON,
  CREATE_PERSONAL_GOAL,
  FETCH_PERSONAL_GOALS,
  TOGGLE_TYPE,
  FETCH_GROUP_GOALS,
  FETCH_BALANCE,
  CONVERT_CHART,
  FETCH_EXP,
  BUY_HOUSE,
  FETCH_ACCOUNT_INFO,
  FETCH_FRIEND_LIST,
  CONVERT_FRIEND_LIST,
  FETCH_SEARCHABLE_LIST,
  FILTER_LIST,
  SELECT_ITEM
} from "../types";
import { Alert } from "react-native";
import FirebaseApp from "../../services/FirebaseInit.js";
export const createPersonalGoalAction = (
  uid,
  goalAmount,
  goalIcon,
  savingType
) => {
  return {
    type: CREATE_PERSONAL_GOAL,
    payload: { uid, goalAmount, goalIcon, savingType }
  };
};
export const toggleIconAction = id => {
  return {
    type: TOGGLE_ICON,
    payload: id
  };
};

export const fetchGroupGoals = uid => dispatch => {
  FirebaseApp.database()
    .ref(`goals/group/${uid}`)
    .on("value", snapShot => {
      let items = [];
      snapShot.forEach(child => {
        items.push({ ...child.val(), key: child.key });
      });
      dispatch(fetchGroupGoalAction(items));
    });
};
export const fetchPersonalGoals = uid => dispatch => {
  FirebaseApp.database()
    .ref(`goals/personal/${uid}`)
    .on("value", snapShot => {
      let items = [];
      snapShot.forEach(child => {
        items.push({ ...child.val(), key: child.key });
      });
      dispatch(fetchPersonalGoalsAction(items));
    });
};

const fetchPersonalGoalsAction = items => {
  return {
    type: FETCH_PERSONAL_GOALS,
    payload: items
  };
};

const fetchGroupGoalAction = items => {
  return {
    type: FETCH_GROUP_GOALS,
    payload: items
  };
};
export const toggleTypeAction = (isPersonal, currentItem) => {
  return {
    type: TOGGLE_TYPE,
    payload: { isPersonal, currentItem }
  };
};

const fetchBalanceAction = balance => {
  return {
    type: FETCH_BALANCE,
    payload: balance
  };
};

export const fetchBalance = uid => dispatch => {
  FirebaseApp.database()
    .ref(`users/${uid}`)
    .on("value", snapShot => {
      dispatch(fetchBalanceAction(snapShot.val().balance));
    });
};

export const converChartAction = () => {
  return {
    type: CONVERT_CHART
  };
};

const fetchExpAction = item => {
  return {
    type: FETCH_EXP,
    payload: item
  };
};

export const fetchExp = uid => dispatch => {
  FirebaseApp.database()
    .ref(`users/${uid}/piggy`)
    .on("value", snapShot => {
      dispatch(fetchExpAction(snapShot.val()));
    });
};

const fetchAccountAction = item => {
  return {
    type: FETCH_ACCOUNT_INFO,
    payload: item
  };
};

export const fetchAccount = uid => dispatch => {
  FirebaseApp.database()
    .ref(`users/${uid}`)
    .on("value", snapShot => {
      dispatch(fetchAccountAction(snapShot.val()));
    });
};

const fetchFriendlistAction = item => {
  return {
    type: FETCH_FRIEND_LIST,
    payload: item
  };
};

export const fetchFriendlist = uid => dispatch => {
  FirebaseApp.database()
    .ref(`users/${uid}/friendList`)
    .on("value", snapShot => {
      let items = [];
      snapShot.forEach(child => {
        items.push(child.val().friendID);
      });

      dispatch(fetchFriendlistAction(items));
    });
};

const convertFriendlistAction = item => {
  return {
    type: CONVERT_FRIEND_LIST,
    payload: item
  };
};

export const convertFriendlist = friendList => dispatch => {
  console.log(friendList);
  FirebaseApp.database()
    .ref("users")
    .on("value", snapShot => {
      let items = [];
      console.log(friendList);
      snapShot.forEach(child => {
        if (friendList.includes(child.val().uid)) {
          items.push({ ...child.val() });
        }
      });
      dispatch(convertFriendlistAction(items));
    });
};

const fetchSearchableAction = item => {
  return {
    type: FETCH_SEARCHABLE_LIST,
    payload: item
  };
};

export const fetchSearchable = () => dispatch => {
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
      dispatch(fetchSearchableAction(items));
    });
};

export const filterList = keyWord => {
  return {
    type: FILTER_LIST,
    payload: keyWord
  };
};
export const selectFriend = uid => {
  return {
    type: SELECT_ITEM,
    payload: uid
  };
};
export const buyHouse = (uid, cost) => dispatch => {
  FirebaseApp.database()
    .ref(`users/${uid}/piggy`)
    .once("value")
    .then(snapShot => {
      let currentItem = snapShot;
      FirebaseApp.database()
        .ref(`users/${uid}/piggy`)
        .set({
          ...currentItem,
          totalExp: currentItem.totalExp - cost,
          houseLevel: currentItem.houseLevel + 1
        });
    });
};
