import { createReducer } from "./reducerCreator";
import * as types from "../actionTypes/types";

const initialState = {
    data: null
};

const StarReducer = createReducer(initialState, {
    [types.USERAREARECORDS]: (state = initialState, action) => {
        return {
            data: action.payload
        };
    }
});

export default StarReducer;
