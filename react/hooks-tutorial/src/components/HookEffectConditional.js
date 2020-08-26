import React, { useState, useEffect } from 'react';

function HookEffectConditional() {
  const [count, setCounter] = useState(0);
  const [input, setInput] = useState('');

  // will  
  useEffect(() => {
    console.log('update the document title');
    document.title = `You cicked ${count} times!`;
  }, [count]);

  return (
    <div>
      <input
        type='text'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={() => setCounter(count + 1)}>Count {count}</button>
    </div>
  );
}

export default HookEffectConditional;
