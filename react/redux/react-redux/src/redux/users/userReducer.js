import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './userTypes';

const intialState = {
  loading: true,
  users: [],
  error: '',
};

const userReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { loading: false, users: payload, error: '' };
    case FETCH_USERS_FAILURE:
      return { loading: false, users: [], error: payload };
    default:
      return state;
  }
};

export default userReducer;
