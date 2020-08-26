import React, { Component } from 'react';
import RefsChildClass from './RefsChildClass';
import RefChildFunc from './RefChildFunc';

class RefsDemo extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.childClassRef = React.createRef();
    // this.childFunctionRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.inputRef);
    this.inputRef.current.focus();
  }

  handleClick = () => {
    console.log(this.inputRef);
    this.inputRef.current.focus();

    console.log(this.childClassRef);
    this.inputRef.current.value = this.childClassRef.current.state.message;
  };

  hadleChildfocus = () => {
    this.childClassRef.current.focusInputRef();
  };

  render() {
    console.log(this.inputRef);
    return (
      <div>
        <h1>Refs Demo</h1>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleClick}>Click to get child message</button>
        <button onClick={this.hadleChildfocus}>
          {/* <button onClick={() => this.childClassRef.current.focusInputRef()}> */}
          Click To Focus Child input
        </button>
        <hr />
        <RefsChildClass ref={this.childClassRef} />
        <hr />
        {/* ref object receives the mounted instance of the component as its current */}
        {/* but the functional component font have instance so we can get it in the parent */}
        {/* but we can use the refs inside the functional components */}
        {/* <RefChildFunc ref={this.childFunctionRef} /> */}
        <RefChildFunc />
        <hr />
      </div>
    );
  }
}

export default RefsDemo;
