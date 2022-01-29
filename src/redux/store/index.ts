import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'redux/reducers';
import rootSaga from 'redux/saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware() as any;
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      composeEnhancers()
    )
  );
  sagaMiddleware.run(rootSaga)
  return store;
}

export default configureStore;