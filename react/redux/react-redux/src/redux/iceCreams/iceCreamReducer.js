import { BUY_ICECREAM } from './iceCreamTypes';

const initialState = {
  numOfIceCreams: 20,
};

const iceCreamReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BUY_ICECREAM:
      return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
    default:
      return state;
  }
};

export default iceCreamReducer;
