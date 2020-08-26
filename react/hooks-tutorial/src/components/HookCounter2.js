import React, { useState } from 'react';

function HookCounter2() {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  const incrementFive = () => {
    // unsave way and it wont work
    // for (let i = 0; i < 5; i++) {
    //   setCount(count + 1);
    // }

    // second form of setCount function
    for (let i = 0; i < 5; i++) {
      setCount(prevCount => prevCount + 1);
    }
  };
  return (
    <div>
      Count: {count}
      <br />
      <button onClick={() => setCount(initialCount)}>Reset</button>
      {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
      {/* <button onClick={() => setCount(count - 1)}>Decrement</button> */}
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>
        Decrement
      </button>
      <button onClick={incrementFive}>Increment 5</button>
    </div>
  );
}

export default HookCounter2;
