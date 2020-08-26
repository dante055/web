import React, { useContext } from 'react';
import { CountContext } from './ComponentA';
import ComponentC from './ComponentC';

function ComponentB() {
  const { countState, countDispatch } = useContext(CountContext);
  //   const countContext = useContext(CountContext);
  return (
    <div>
      ComponentB : {countState}
      {/* ComponentB : {countContext.countState} */}
      <button onClick={() => countDispatch('increment')}>Increment</button>
      <button onClick={() => countDispatch('decrement')}>Decrement</button>
      <button onClick={() => countDispatch('reset')}>Reset</button>
      <ComponentC />
    </div>
  );
}

export default ComponentB;
