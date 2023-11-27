import { USER_INFO, CLEAR_USER_INFO } from "../actions/types";

const initialState = {
  userDetail: null,
};

const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userDetail: action.payload,
      };
    case CLEAR_USER_INFO:
      return {
        ...state,
        userDetail: null,
      };
    default:
      return state;
  }
};

export default UserInfoReducer;
