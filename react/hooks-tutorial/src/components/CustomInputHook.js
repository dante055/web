import React from 'react';
import useInputHook from '../customHooks/useInputHook';

function CustomInputHook() {
  const [firstName, bindFirstName, resetFirstName] = useInputHook('');
  const [lastName, bindLastName, resetLastName] = useInputHook('');

  const submitHandler = e => {
    e.preventDefault();
    alert(`Hello ${firstName} ${lastName}`);
    resetFirstName();
    resetLastName();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' {...bindFirstName} />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' {...bindLastName} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default CustomInputHook;
