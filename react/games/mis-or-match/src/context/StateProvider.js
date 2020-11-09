import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();
const { Provider } = StateContext;

const StateProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

// hooks can only be use inside the function
const useStateValue = () => useContext(StateContext);

export { StateContext, StateProvider, useStateValue };
