import { combineReducers } from "redux";
import tabReducers from "./tab/tabReducers";
import marketReducer from "./market/marketReducers";
export default combineReducers({
  tabReducers,
  marketReducer,
});
