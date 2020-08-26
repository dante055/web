import React from 'react';

function ToDo(props) {
  return (
    <tr>
      <td>
        <label>{props.index}</label>
      </td>
      <td>
        <label>{props.id}</label>
      </td>
      <td>
        <input />
      </td>
    </tr>
  );
}

export default ToDo;
