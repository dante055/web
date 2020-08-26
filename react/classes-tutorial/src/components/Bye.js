import React from 'react';

function Bye() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      { id: 'bye', className: 'dummyClass' },
      'Bye Dante (Using pure JSX)'
    )
  );
}

// React.createElement(element/HTML_tag type, optional properties/attributes , children)

export default Bye;
