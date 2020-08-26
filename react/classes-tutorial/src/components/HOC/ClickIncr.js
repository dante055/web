import React, { Component } from 'react';
import withCounter from './withCounter';

class ClickIncr extends Component {
  render() {
    const { count, incrementCounter } = this.props;
    return (
      <div>
        <button onClick={incrementCounter}>Click {count} times</button>
      </div>
    );
  }
}

export default withCounter(ClickIncr, 10);
