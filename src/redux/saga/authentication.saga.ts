
import { userApi, loginUrl } from 'api';
import { LoginRequest, LoginResponse, PayloadAction, ResponseApiModel, UserResponse } from 'model';
import { fork, call, take, put } from 'redux-saga/effects';
import { LOGIN, loginSuccess, LOGOUT } from 'redux/actions/authentication.action';



function* dispatchLoginSuccess(token: string, refreshToken: string, user: UserResponse) {
  yield put(loginSuccess(token, refreshToken, user));
}

function* handleLogin(payload: LoginRequest) {
  const { status, data }: ResponseApiModel<LoginResponse> = yield call(userApi.login, loginUrl, payload);
  const { message, token, refreshToken, user } = data;

  if(status && message === 'success' && token) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("refreshToken", refreshToken);
    yield call(dispatchLoginSuccess, token, refreshToken, user);
  }
}

function* handleLogout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
  yield 1;
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