const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

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
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

// reducer
const cakeReducer = (state = initialCakeState, action) => {
  const { type } = action;
  switch (type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  const { type } = action;
  switch (type) {
    case BUY_ICECREAM:
      return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
    default:
      return state;
  }
};

// root reducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// store
const store = createStore(rootReducer, applyMiddleware(logger));

console.log('initial state : ', store.getState());

// listen to changes
const unsubscribe = store.subscribe(() => {});
// const unsubscribe = store.subscribe(() =>
//   console.log('Updated state : ', store.getState())
// );

// dispatch a action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());

// remove listner
unsubscribe();
