import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';

import getAllUsersSaga from './users/saga';

import getAllAreaSaga from './users/saga';

export default function* rootSaga() {
    yield all([
        
        //public
        accountSaga(),
        loginSaga(),
        forgetSaga(),
        LayoutSaga(),
        getAllUsersSaga(),
        getAllAreaSaga()
    ])
}
