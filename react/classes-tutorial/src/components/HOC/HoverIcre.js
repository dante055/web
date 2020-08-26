import React, { Component } from 'react';
import withCounter from './withCounter';

class HoverIcre extends Component {
  render() {
    const { count, incrementCounter } = this.props;
    return (
      <div>
        <h1 onMouseEnter={incrementCounter}>HoverMe {count}</h1>
      </div>
    );
  }
}

export default withCounter(HoverIcre, 5);
// export default withCounter(HoverIcre);
