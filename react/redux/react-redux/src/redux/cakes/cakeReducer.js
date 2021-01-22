import { BUY_CAKE } from './cakeTypes';

const initialState = {
  numOfCakes: 10,
};

const cakeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BUY_CAKE:
      // return { ...state, numOfCakes: state.numOfCakes - 1 };
      return { ...state, numOfCakes: state.numOfCakes - payload };
    default:
      return state;
  }
};

export default cakeReducer;
