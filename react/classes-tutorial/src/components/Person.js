import React from 'react';

function Person({ person }) {
  return (
    <div>
      <h2>
        {person.name} is a {person.skill}
      </h2>
    </div>
  );
}

export default Person;
