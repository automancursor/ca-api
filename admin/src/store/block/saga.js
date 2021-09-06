import API from "../../config";
import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { GET_ALL_AREA  } from './actionTypes';
import { getAllAreaSuccessful, getAllAreaFailed } from './actions';

import { getAllAreaMethod } from '../../helpers/fackBackend_Helper';

function* getAllArea() {
    try {
        const data = yield call(getAllAreaMethod, API+'/AreaRecord/claims');
        yield put(getAllAreaSuccessful(data));
    } catch (error) {
        yield put(getAllAreaFailed(error));
    }
}

export function* watchGetAllArea() {
    yield takeEvery(GET_ALL_AREA, getAllArea)
}

function* getAllAreaSaga() {
    yield all([fork(watchGetAllArea)]);
}

export default getAllAreaSaga;
