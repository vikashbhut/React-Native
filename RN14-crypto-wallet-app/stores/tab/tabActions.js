export const SET_TRADE_MODAL_VISBILITY = "SET_TRADE_MODAL_VISBILITY";

export const setTradeModalVisibilitySuccess = (isVisible) => ({
  type: SET_TRADE_MODAL_VISBILITY,
  payload: { isVisible },
});
export const setTradeModalVisibility = (isVisible) => {
  return (dispatch) => {
    dispatch(setTradeModalVisibilitySuccess(isVisible));
  };
};
