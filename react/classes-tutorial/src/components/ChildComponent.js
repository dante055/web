import React from 'react';

function ChildComponent(props) {
  function passDataToParent() {
    props.greetHandeler('child');
  }
  return (
    <div>
      {/* it this way we cant pass data to parent */}
      {/* <button onClick={props.greetHandeler}>Hello Parent</button> */}

      {/* either pass arguments like this or use the 2nd way */}
      {/* <button onClick={passDataToParent}>Hello Parent</button> */}

      {/* we can use arrow functions to pass the data to parent component */}
      <button onClick={() => props.greetHandeler('child')}>Hello Parent</button>
    </div>
  );
}

export default ChildComponent;
