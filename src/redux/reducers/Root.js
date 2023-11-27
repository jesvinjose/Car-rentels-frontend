import { combineReducers } from 'redux';

import UserInfoReducer from './UserInfoReducer';

const rootReducer = combineReducers({
  userinfo: UserInfoReducer, 
  });
  
  export default rootReducer;
  
