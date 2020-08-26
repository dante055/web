import React from 'react';

function RefChildFunc() {
  const textInput = React.useRef(null);

  function handleClick() {
    console.log(textInput);
    textInput.current.focus();
  }

  return (
    <div>
      <h2>Child Function Component</h2>
      <input type="text" ref={textInput} />
      <button onClick={handleClick}>Funnction Input focus</button>
    </div>
  );
}

export default RefChildFunc;
