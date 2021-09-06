import { createReducer } from "./reducerCreator";
import * as types from "../actionTypes/types";

const initialState = {
  isAuthed: false,
  token: null,
  userId: null,
};
// Actions are the only source of information for the store as per Redux official documentation. It carries a payload of information from your application to store. As discussed earlier, actions are plain JavaScript object that must have a type attribute to indicate the type of action performed.
const AuthReducer = createReducer(initialState, {
  [types.LOGIN]: (state = initialState, action) => {
    return {
      isAuthed: true,
      token: action.payload.token,
      userId: action.payload.userId,
    };
  },
  [types.REGISTER]: (state = initialState, action) => {
    return {
      isAuthed: false,
      token: null,
      userId: null,
    };
  },
  [types.LOGOUT]: (state = initialState, action) => {
    return {
      isAuthed: false,
      token: null,
      userId: null,
    };
  },
});

export default AuthReducer;
