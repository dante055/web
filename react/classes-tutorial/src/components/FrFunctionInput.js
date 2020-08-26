import React from 'react';

// function FrFunctionInput() {
//   return (
//     <div>
//       <h2>Child Functional Component</h2>
//       <input type="text" />
//     </div>
//   );
// }

const FrFunctionInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <h2>Child Functional Component</h2>
      <input type="text" ref={ref} />
    </div>
  );
});

export default FrFunctionInput;
