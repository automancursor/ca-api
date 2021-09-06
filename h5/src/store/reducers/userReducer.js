import { createReducer } from "./reducerCreator";
import * as types from "../actionTypes/types";

const initialState = {
    data: null
};

const UserReducer = createReducer(initialState, {
    [types.USER]: (state = initialState, action) => {
        return {
            data: action.payload
        };
    }
});

export default UserReducer;
