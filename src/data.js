import appColor from "./commonColor";
const data = {
  gameData: [200, 400, 500, 700],
  searchableList: [],
  filteredList: [],
  friendList: [],
  convertedFriends: [],
  accountInfo: {},
  accountBalance: 0,
  isPersonal: true,
  listPersonalGoal: [],
  listPersonalChart: [],
  listGroupChart: [],
  listGroupGoal: [],
  piggyData: {
    currentExp: 0,
    nextExp: 1000,
    level: 0
  },
  selectedIcon: {
    id: "006",
    name: "desktop",
    title: "Computer",
    color: appColor.errorColor,
    isSelected: false
  },
  listSelectionIcon: [
    {
      id: "001",
      name: "umbrella-beach",
      title: "Traveling",
      color: appColor.primaryColor,
      isSelected: true
    },
    {
      id: "002",
      name: "dog",
      title: "Pet",
      color: appColor.secondaryColor,
      isSelected: false
    },
    {
      id: "003",
      name: "bicycle",
      title: "Bike",
      color: appColor.errorColor,
      isSelected: false
    },
    {
      id: "004",
      name: "child",
      title: "Fashion",
      color: appColor.primaryColor,
      isSelected: false
    },
    {
      id: "005",
      name: "camera-retro",
      title: "Camera",
      color: appColor.secondaryColor,
      isSelected: false
    },
    {
      id: "006",
      name: "desktop",
      title: "Computer",
      color: appColor.errorColor,
      isSelected: false
    },
    {
      id: "007",
      name: "gift",
      title: "Gift",
      color: appColor.alterBlue,
      isSelected: false
    },
    {
      id: "008",
      name: "motorcycle",
      title: "Motobike",
      color: appColor.secondaryColor,
      isSelected: false
    },
    {
      id: "009",
      name: "palette",
      title: "Recreation",
      color: appColor.alterPurple,
      isSelected: false
    },
    {
      id: "010",
      name: "mortar-pestle",
      title: "Food!",
      color: appColor.alterPurple,
      isSelected: false
    },
    {
      id: "011",
      name: "piggy-bank",
      title: "Backup",
      color: appColor.primaryColor,
      isSelected: false
    },
    {
      id: "012",
      name: "coffee",
      title: "Drink",
      color: appColor.alterPrimary,
      isSelected: false
    },
    {
      id: "011",
      name: "book-open",
      title: "Book",
      color: appColor.secondaryColor,
      isSelected: false
    },
    {
      id: "011",
      name: "piggy-bank",
      title: "Backup",
      color: appColor.primaryColor,
      isSelected: false
    }
  ]
};

export default data;
