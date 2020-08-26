import React, { Component } from 'react';

class ClassClick extends Component {
  constructor() {
    super();
    this.state = {
      message: 'hello again!',
    };
    this.clickHandeler = this.clickHandeler.bind(this);
  }
  clickHandeler() {
    alert('class button click');
    alert(this.state.message); // note that we cant read the this.state.message without binding or using arrow function
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandeler}>Class click</button>
      </div>
    );
  }
}

export default ClassClick;
