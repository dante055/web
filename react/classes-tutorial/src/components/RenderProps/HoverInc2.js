import React, { Component } from 'react';

class HoverIcre2 extends Component {
  render() {
    const { count, incrementCounter } = this.props;
    return (
      <div>
        <h1 onMouseEnter={incrementCounter}>HoverMe {count}</h1>
      </div>
    );
  }
}

export default HoverIcre2;
