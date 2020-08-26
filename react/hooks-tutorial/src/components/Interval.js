import React, { useState, useEffect } from 'react';

function Interval() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // setCount(count + 1); // This effect depends on the `count` state and wont work without addint it in the dependecy arry
      // and even after adding it will be wrong way to do tis
      setCount(prevCount => prevCount + 1);
      return () => clearInterval(id);
    }, 1000); // 🔴 Bug: `count` is not specified as a dependency
  }, []);

  return <h1>{count}</h1>;
}

export default Interval;
