import React from 'react';

function ErrorComponent({ hero }) {
  if (hero === 'joker') {
    throw new Error('Not a hero!');
  }
  return (
    <div>
      <h1>{hero}</h1>
    </div>
  );
}

export default ErrorComponent;
