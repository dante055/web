import React, { useState, useEffect } from 'react';

function HookEffectCleanUp() {
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);

  useEffect(() => {
    console.log('Adding event listner');
    window.addEventListener('mousemove', logMousePosition);

    return () => {
      console.log('Removing event listner');
      window.removeEventListener('mousemove', logMousePosition);
    };
  }, []);

  const logMousePosition = e => {
    console.log('Log Mouse Position');
    setx(e.clientX);
    sety(e.clientY);
  };

  return (
    <div>
      <h2>
        x: {x}, y: {y}
      </h2>
    </div>
  );
}

export default HookEffectCleanUp;
