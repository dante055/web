import React, { Component } from 'react';

class ClickIncr2 extends Component {
  render() {
    const { count, incrementCounter } = this.props;
    console.log(this.props);
    return (
      <div>
        <button onClick={incrementCounter}>Click {count} times</button>
      </div>
    );
  }
}

export default ClickIncr2;
