import React, { useState } from 'react';

function HooksObject() {
  const [name, setName] = useState({ firstName: '', lastName: '' });

  const handelChange = e => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <input
        type='text'
        value={name.firstName}
        name='firstName'
        onChange={handelChange}
      />
      <input
        type='text'
        value={name.lastName}
        name='lastName'
        onChange={handelChange}
      />
      <h2>First name: {name.firstName}</h2>
      <h2>Last name: {name.lastName}</h2>
    </div>
  );
}

export default HooksObject;
