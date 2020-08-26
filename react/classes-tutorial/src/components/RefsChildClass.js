import React, { Component } from 'react';

class RefsChildClass extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Hello from child!!',
    };
    this.inputRef = React.createRef();
  }

  handleInputChange = (event) => {
    this.setState({ message: event.target.value });
  };

  focusInputRef = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <h2>Child Class Ref</h2>
        <label htmlFor="changeMessage">Change Message</label>
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleInputChange}
          ref={this.inputRef}
        />
      </div>
    );
  }
}

export default RefsChildClass;
