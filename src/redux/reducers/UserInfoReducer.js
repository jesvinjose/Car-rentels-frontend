import { USER_INFO } from "../actions/types";


const initialState = 
{
    userData : null,
    
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_INFO:
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;

