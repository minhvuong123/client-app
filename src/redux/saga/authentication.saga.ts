
import { fork, call, take, put } from 'redux-saga/effects';
import { LOGIN, loginSuccess, LOGOUT } from 'redux/actions/authentication.action';

function* handleLogin(token: string) {
  localStorage.setItem("access_token", token);
  yield put(loginSuccess(token));
}

function* handleLogout() {
  localStorage.removeItem("access_token")
}

function* flowLogin() {
  while(true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      yield take(LOGIN.LOGIN);
      // call api get token
      yield fork(handleLogin, 'abcddedds')
    }

    yield take(LOGOUT);
    yield call(handleLogout);
  }
}

export default function* authenticationSaga() {
  yield fork(flowLogin);
}