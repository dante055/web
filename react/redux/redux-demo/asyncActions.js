const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const intialState = {
  loading: true,
  users: [],
  error: '',
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// action creater
const fetchUsers = () => async dispatch => {
  try {
    dispatch(fetchUsersRequest());
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    const users = data.map(user => user.id);
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    console.log(error.message);
    dispatch(fetchUsersFailure(error.message));
  }
};

const reducer = (state = intialState, action) => {
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

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log('Updated state : ', store.getState()));

store.dispatch(fetchUsers());
