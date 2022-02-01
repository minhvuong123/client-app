import { all } from 'redux-saga/effects';
import authenticationSaga from './authentication.saga';

// watcher saga -> actions -> worker saga

export default function* rootSaga() {
  yield all([
    authenticationSaga()
  ]);
}