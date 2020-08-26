import React from 'react';

function FunctionClick() {
  function clickHndeler() {
    alert('function button click');
  }
  return (
    <div>
      <button onClick={clickHndeler}>Function Click</button>
    </div>
  );
}

export default FunctionClick;
