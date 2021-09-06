import { createReducer } from "./reducerCreator";
import * as types from "../actionTypes/types";

const initialState = {
  isShowDownloadAppBanner: true,
};
// This pattern allows you to have multiple states and use a common reducer to update each state based on an additional parameter inside the action object.
const CommonReducer = createReducer(initialState, {
  [types.HIDE_DOWNLOAD_APP_BANNER]: (state = initialState, action) => {
    return {
      ...state,
      isShowDownloadAppBanner: false,
    };
  },
});

export default CommonReducer;
