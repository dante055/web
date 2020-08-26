import React, { useReducer } from 'react';

// const initialState = 0;
const initialState = {
  firstCounter: 0,
  secondCounter: 10,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, firstCounter: state.firstCounter + action.value };
    case 'decrement':
      return { ...state, firstCounter: state.firstCounter - action.value };
    case 'increment5':
      return { ...state, firstCounter: state.firstCounter + action.value };
    case 'decrement5':
      return { ...state, firstCounter: state.firstCounter - action.value };

    case 'increment_Conter2':
      return { ...state, secondCounter: state.secondCounter + action.value };
    case 'decrement_Conter2':
      return { ...state, secondCounter: state.secondCounter - action.value };
    case 'increment5_Conter2':
      return { ...state, secondCounter: state.secondCounter + action.value };
    case 'decrement5_Conter2':
      return { ...state, secondCounter: state.secondCounter - action.value };

    case 'reset':
      return initialState;
    default:
      return state;
  }
};

function HookUseReducerComplex() {
  const [count, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h2>First counter: {count.firstCounter}</h2>
      <h2>Second counter: {count.secondCounter}</h2>
      <button onClick={() => dispatch({ type: 'increment', value: 1 })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'decrement', value: 1 })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: 'increment5', value: 5 })}>
        Increment 5
      </button>
      <button onClick={() => dispatch({ type: 'decrement5', value: 5 })}>
        Decrement 5
      </button>

      <br />

      <button onClick={() => dispatch({ type: 'increment_Conter2', value: 1 })}>
        Increment Conter2
      </button>
      <button onClick={() => dispatch({ type: 'decrement_Conter2', value: 1 })}>
        Decrement Conter2
      </button>
      <button
        onClick={() => dispatch({ type: 'increment5_Conter2', value: 5 })}
      >
        Increment 5 Conter2
      </button>
      <button
        onClick={() => dispatch({ type: 'decrement5_Conter2', value: 5 })}
      >
        Decrement 5 Conter2
      </button>

      <br />

      <button onClick={() => dispatch({ type: 'reset', value: 1 })}>
        Reset
      </button>
    </div>
  );
}

export default HookUseReducerComplex;
