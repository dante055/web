import React, { useContext } from 'react';
import { CountContext } from './ComponentA';

function ComponentC() {
  const { countState, countDispatch } = useContext(CountContext);
  return (
    <div>
      ComponentC : {countState}
      <button onClick={() => countDispatch('increment')}>Increment</button>
      <button onClick={() => countDispatch('decrement')}>Decrement</button>
      <button onClick={() => countDispatch('reset')}>Reset</button>
    </div>
  );
}

export default ComponentC;
