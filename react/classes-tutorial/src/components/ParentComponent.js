import React, { Component } from 'react';
import ChildComponent from './ChildComponent';

class ParentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'parent',
    };
    this.greetParent = this.greetParent.bind(this);
  }

  greetParent(child) {
    alert(`Hello ${this.state.message} from ${child}!`);
  }

  render() {
    return (
      <div>
        <ChildComponent greetHandeler={this.greetParent} />
      </div>
    );
  }
}

export default ParentComponent;
