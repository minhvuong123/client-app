
import { loginApi, loginUrl } from 'api';
import { LoginRequest, LoginResponse, PayloadAction, ResponseApiModel } from 'model';
import { fork, call, take, put } from 'redux-saga/effects';
import { LOGIN, loginSuccess, LOGOUT } from 'redux/actions/authentication.action';

function* reloadPage() {
  window.location.reload();
  yield 1;
}

function* dispatchAction(token: string) {
  yield put(loginSuccess(token));
}

function* handleLogin(payload: LoginRequest) {
  const { status, data }: ResponseApiModel<LoginResponse> = yield call(loginApi.login, loginUrl, payload);
  const { message, token } = data;

  if(status && message === 'success' && token) {
    localStorage.setItem("access_token", token);
    yield call(dispatchAction, token);
    yield call(reloadPage);
  }
}

function* handleLogout() {
  localStorage.removeItem("access_token");
  yield call(reloadPage);
}

function* flowLogin() {
  while(true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginRequest> = yield take(LOGIN.LOGIN);

      // call api get token
      yield fork(handleLogin, action.payload)
    }

    yield take(LOGOUT);
    yield call(handleLogout);
  }
}

export default function* authenticationSaga() {
  yield fork(flowLogin);
}