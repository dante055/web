import React, { useState, useEffect } from 'react';

function HookEffect1() {
  const [count, setCounter] = useState(0);
  const [initial, setInital] = useState('initial');

  // first component will render then effect will be run
  // if state changes in useEffect then after changing of state the component will rerender and then again useeffect will be run

  // takes a fun that will run on every rerender
  useEffect(() => {
    console.log('runEffect', initial, count);
    document.title = `You cicked ${count} times!`;
    // if (initial === 'initial') setInital('after effect');
  });

  console.log('render', initial, count);
  return (
    <div>
      <button onClick={() => setCounter(count + 1)}>Count {count}</button>
    </div>
  );
}

export default HookEffect1;
