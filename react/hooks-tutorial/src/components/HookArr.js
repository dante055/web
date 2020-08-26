import React, { useState } from 'react';

function HookArr() {
  const [inputName, setInputName] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { id: items.length, itemName: inputName }]);
    setInputName('');
  };

  const editItem = () => {
    let newItemsArr = [...items];
    newItemsArr[editId].itemName = editName;
    setItems(newItemsArr);
    setEditId('');
    setEditName('');
  };

  const populateTable = () => {
    return items.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.itemName}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <input
        type='text'
        value={inputName}
        onChange={e => setInputName(e.target.value)}
      />
      <button onClick={addItem}>Add</button>
      <br />
      <input
        type='number'
        value={editId}
        onChange={e => setEditId(e.target.value)}
      />
      <input
        type='text'
        value={editName}
        onChange={e => setEditName(e.target.value)}
      />
      <button onClick={editItem}>Edit</button>
      <br />
      {items.length ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>itemName</th>
            </tr>
          </thead>
          <tbody>{populateTable()}</tbody>
        </table>
      ) : (
        'No items in table'
      )}
    </div>
  );
}

export default HookArr;
