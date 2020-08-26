// import React, { useReducer } from 'react';

// const initialValue1 = 0;
// const initialValue2 = 10;
// const reducer = (state, action) => {
//   switch (action) {
//     case 'increment':
//       return state + 1;
//     case 'decrement':
//       return state - 1;
//     case 'reset1':
//       return initialValue1;
//     case 'reset2':
//       return initialValue2;
//     default:
//       return state;
//   }
// };

// function HookUseReducerMultiple() {
//   const [count1, dispatch1] = useReducer(reducer, initialValue1);
//   const [count2, dispatch2] = useReducer(reducer, initialValue2);
//   return (
//     <div>
//       <h2>Count 1: {count1}</h2>
//       <button onClick={() => dispatch1('increment')}>Increment</button>
//       <button onClick={() => dispatch1('decrement')}>Decrement</button>
//       <button onClick={() => dispatch1('reset1')}>Reset</button>
//       <br />
//       <h2>Count 2: {count2}</h2>
//       <button onClick={() => dispatch2('increment')}>Increment</button>
//       <button onClick={() => dispatch2('decrement')}>Decrement</button>
//       <button onClick={() => dispatch2('reset2')}>Reset</button>
//     </div>
//   );
// }

// export default HookUseReducerMultiple;

import React, { useReducer } from 'react';

const initialValue1 = 0;
const initialValue2 = 10;
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return action.initialValue;
    default:
      return state;
  }
};

function HookUseReducerMultiple() {
  const [count1, dispatch1] = useReducer(reducer, initialValue1);
  const [count2, dispatch2] = useReducer(reducer, initialValue2);
  return (
    <div>
      <h2>Count 1: {count1}</h2>
      <button onClick={() => dispatch1({ type: 'increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch1({ type: 'decrement' })}>
        Decrement
      </button>
      <button
        onClick={() =>
          dispatch1({ type: 'reset', initialValue: initialValue1 })
        }
      >
        Reset
      </button>

      <br />

      <h2>Count 2: {count2}</h2>
      <button onClick={() => dispatch2({ type: 'increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch2({ type: 'decrement' })}>
        Decrement
      </button>
      <button
        onClick={() =>
          dispatch2({ type: 'reset', initialValue: initialValue2 })
        }
      >
        Reset
      </button>
    </div>
  );
}

export default HookUseReducerMultiple;
