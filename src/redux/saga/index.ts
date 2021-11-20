import { all } from 'redux-saga/effects';
import authenticationSaga from './authentication.saga';

// watcher saga -> actions -> worker saga

export default function* rootSaga() {
  console.log('root saga')
  yield all([
    authenticationSaga()
  ]);
}