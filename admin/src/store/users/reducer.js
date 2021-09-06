import { GET_ALL_USERS, GET_ALL_USERS_SUCCESSFUL, GET_ALL_USERS_FAILED } from './actionTypes';

const initialState = {
    getAllUsersError: null, getAllUsersData: null, loading: null,
}

const getAllUsers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            state = {
                ...state,
                getAllUsersData: [],
                loading: true,
                getAllUsersError: null
            }
            break;

        case GET_ALL_USERS_SUCCESSFUL:
            state = {
                ...state,
                getAllUsersData: action.payload,
                loading: false,
                getAllUsersError: null
            }
            break;
        case GET_ALL_USERS_FAILED:
            state = {
                ...state,
                loading: false,
                getAllUsersError: true
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default getAllUsers;
