import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();
const { Provider } = StateContext;

const StateProvider = ({ reducer, initialState, children }) => {
  // in this value={..initalstate, dispatc}
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;

  // in this value=[ initalState, dispatch]
  //   return (
  //     <Provider value={useReducer(reducer, initialState)}>{children}</Provider>
  //   );
};

// hooks can only be use insid the function
const useStateValue = () => useContext(StateContext);

export { StateContext, StateProvider, useStateValue };
