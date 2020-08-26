import React, { useState, useEffect } from 'react';

function HookEffectDependency() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Run the efect');
    const interval = setInterval(tick, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /* problem with using setCount(count + 1) with empty dedendency array */
  /*  remember nitial value of state is captured inside the callback passed to useEffect
   and does not get updated in subsequent renders. */
  /*  so What's happened is that the tick function in 5:25 retains a stale value of count state,
   so every 1000ms will always be called tick(){setCount(0+1)} leading no increment in the counter. */

  /* dont do this */
  /*   }, [count]); // will run everytime count value changes
  This way, useEffect will run again making another interval variable, that will create new tick instance,
  that will get the update count and it will keep doing this so it seems the incrementing is working
  but it is badly implemented. */

  const tick = () => {
    // setCount(count + 1);

    /* correct way */
    setCount(prevCount => prevCount + 1);
    /* will run every time event without adding count to the the dependecy array 
      the setCoutn keep track of the count variable
    */
  };

  /* Note: 
    even while passinga function in useEfect which has a state of prop variable always remember to include them in the dependecy array 
    if u want it to re render
  */

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default HookEffectDependency;
