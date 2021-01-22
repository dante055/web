import React, { useEffect, useState, useRef } from 'react';

function Timer() {
  const [timmer, setTimmer] = useState(0);
  const [runEffect, setRunEffect] = useState(0);

  const id = useRef(null);

  const state = async state => {
    if (state === 2) {
      clear();
      setTimmer(0);
      setRunEffect(e => e + 1);
    } else if (state === 0) {
      setRunEffect(e => e + 1);
    } else if (state === 1) {
      clear();
    }
  };

  const clear = () => {
    window.clearInterval(id.current);
  };

  useEffect(() => {
    if (runEffect) {
      id.current = window.setInterval(() => {
        setTimmer(t => t + 1);
      }, 1000);
    }

    return clear;
  }, [runEffect]);

  return (
    <div>
      <h1>{timmer}</h1>
      <button onClick={() => state(0)}>start</button>
      <button onClick={() => state(1)}>stop</button>
      <button onClick={() => state(2)}>restart</button>
    </div>
  );
}

export default Timer;
