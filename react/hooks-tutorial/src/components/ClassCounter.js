import React, { Component } from 'react';

class ClassCounter extends Component {
  state = {
    counter: 0,
  };

  handleClick = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
    // this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    const { counter } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Count {counter}</button>
      </div>
    );
  }
}

export default ClassCounter;
