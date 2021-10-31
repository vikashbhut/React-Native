import * as tabActions from "./tabActions";

const initState = {
  selectedTab: "",
};

const tabReducers = (state = initState, action) => {
  switch (action.type) {
    case tabActions.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload.selectedTab,
      };
    default:
      return state;
  }
};

export default tabReducers;
