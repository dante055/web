import React, { Component } from 'react';
import FrFunctionInput from './FrFunctionInput';

class FrParent extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  handleClick = () => {
    console.log(this.inputRef);
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <h1>Parent Component</h1>
        <button onClick={this.handleClick}>Focus child input</button>
        <hr />
        <FrFunctionInput ref={this.inputRef} />
      </div>
    );
  }
}

export default FrParent;
