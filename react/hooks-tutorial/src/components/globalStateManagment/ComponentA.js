import React, { useReducer } from 'react';
import ComponentB from './ComponentB';

export const CountContext = React.createContext();
// const CountContext = React.createContext();

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

function ComponentA() {
  const [count, dispatch] = useReducer(reducer, initialState);
  return (
    <CountContext.Provider
      value={{ countState: count, countDispatch: dispatch }}
    >
      <h2>{count}</h2>
      <ComponentB />
    </CountContext.Provider>
  );
}

// export { CountContext };
export default ComponentA;
