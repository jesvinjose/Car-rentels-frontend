import { combineReducers } from 'redux';

import userReducer from './UserInfoReducer';

const rootReducer = combineReducers({
    user: userReducer,
    
  });
  
  export default rootReducer;
  
