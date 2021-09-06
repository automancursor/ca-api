import { GET_ALL_AREA, GET_ALL_AREA_SUCCESSFUL, GET_ALL_AREA_FAILED  } from './actionTypes';

const initialState = {
    allArea: null, 
}

const getAllArea = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_AREA:
            state = {
                ...state,
            }
            break;
        case GET_ALL_AREA_SUCCESSFUL:
            state = {
                ...state,
                allArea: action.payload,
            }
            break;
        case GET_ALL_AREA_FAILED:
            state = {
                ...state,
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default getAllArea;
