import { combineReducers } from 'redux';
import authenticationReducer from './authentication.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer
});

export default  rootReducer;