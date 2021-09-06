import { GET_ALL_USERS, GET_ALL_USERS_SUCCESSFUL, GET_ALL_USERS_FAILED } from './actionTypes';

export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS,
        payload: {}
    }
}

export const getAllUsersSuccessful = (data) => {
    return {
        type: GET_ALL_USERS_SUCCESSFUL,
        payload: data
    }
}

export const getAllUsersFailed = () => {
    return {
        type: GET_ALL_USERS_FAILED,
        payload: {}
    }
}
