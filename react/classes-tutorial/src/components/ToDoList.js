import React, { Component } from 'react';
import ToDo from './ToDo';
import styles from './myStyles.module.css'; // locally scoped

class ToDoList extends Component {
  constructor(props) {
    super(props);
    const todoCounter = 1;
    this.state = {
      todoCounter: todoCounter,
      list: [
        {
          id: todoCounter,
        },
      ],
    };
    this.addToStart = this.addToStart.bind(this);
    this.addToEnd = this.addToEnd.bind(this);
  }

  addToEnd() {
    const nextId = this.state.todoCounter + 1;
    const newList = [...this.state.list, { id: nextId }];
    this.setState({
      list: newList,
      todoCounter: nextId,
    });
  }

  addToStart() {
    const nextId = this.state.todoCounter + 1;
    const newList = [{ id: nextId }, ...this.state.list];
    this.setState({
      list: newList,
      todoCounter: nextId,
    });
  }

  render() {
    const toDo = this.state.list.map((item, index) => (
      // when key is given as index then while rerendering it will always add acording to the index
      // <ToDo key={index} index={index} id={item.id} />
      <ToDo key={item.id} index={index} id={item.id} />
    ));
    return (
      <div>
        <button onClick={this.addToStart.bind(this)}>Add New to Start</button>
        <button onClick={this.addToEnd.bind(this)}>Add New to End</button>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>{toDo}</tbody>
        </table>
      </div>
    );
  }
}

export default ToDoList;
