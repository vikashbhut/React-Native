import * as tabActionTypes from "./tabActions";
const initState = {
  isTradeModalVisibal: false,
};

const tabReducers = (state = initState, action) => {
  switch (action.type) {
    case tabActionTypes.SET_TRADE_MODAL_VISBILITY:
      return {
        ...state,
        isTradeModalVisibal: action.payload.isVisible,
      };
    default:
      return state;
  }
};

export default tabReducers;
