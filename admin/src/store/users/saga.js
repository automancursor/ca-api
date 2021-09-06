import API from "../../config";
import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

//Account Redux states
import { GET_ALL_USERS } from './actionTypes';
import { getAllUsersSuccessful, getAllUsersFailed } from './actions';

//AUTH related methods
import { getAllUsersMethod } from '../../helpers/fackBackend_Helper';

// Is user register successfull then direct plot user in redux.
function* getAllUsers() {
    try {
        const data = yield call(getAllUsersMethod, API+'/UserProfile');
        yield put(getAllUsersSuccessful(data));
    } catch (error) {
        yield put(getAllUsersFailed(error));
    }
}

export function* watchGetAllUsers() {
    yield takeEvery(GET_ALL_USERS, getAllUsers)
}

function* getAllUsersSaga() {
    yield all([fork(watchGetAllUsers)]);
}

export default getAllUsersSaga;
