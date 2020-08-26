import React, { useState } from 'react';
import HookEffectCleanUp from './HookEffectCleanUp';

function HookEffectCleanUpContainer() {
  const [toggle, setToggle] = useState(true);
  return (
    <div>
      <h2>Mount contaiter: </h2>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      {toggle ? <HookEffectCleanUp /> : null}
    </div>
  );
}

// on unmounting it will give a warning we we dont fo a cleanup
// Warning:  Can't perform a React state update on an unmounted component.

export default HookEffectCleanUpContainer;
