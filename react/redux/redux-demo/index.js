const redux = require('redux');

const createStore = redux.createStore;

// types
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// action creater
function buyCake() {
  return {
    type: BUY_CAKE,
    info: '',
  };
}

function buyIceCreams() {
  return {
    type: BUY_ICECREAM,
    info: '',
  };
}

// initial state
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

// reducer
const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 };
    case BUY_ICECREAM:
      return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
    default:
      return state;
  }
};

// store
// takes reducer as a parameter,
// reducer has the inital state and store hold this state and make state transtion according to the action recieved
const store = createStore(reducer);

console.log('initial state : ', store.getState());

// listen to changes
const unsubscribe = store.subscribe(() =>
  console.log('Updated state : ', store.getState())
);

// dispatch a action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());

// remove listner
unsubscribe();
