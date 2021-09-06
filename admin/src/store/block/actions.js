import { GET_ALL_AREA, GET_ALL_AREA_SUCCESSFUL, GET_ALL_AREA_FAILED  } from './actionTypes';

export const getAllArea = () => {
    return {
        type: GET_ALL_AREA,
        payload: {}
    }
}

export const getAllAreaSuccessful = (data) => {
    return {
        type: GET_ALL_AREA_SUCCESSFUL,
        payload: data
    }
}

export const getAllAreaFailed = () => {
    return {
        type: GET_ALL_AREA_FAILED,
        payload: {}
    }
}
