import React, { Component } from 'react';
import UserContext from './userContext';

class ComponentD extends Component {
  // if contex provider has a value at the parent level then that value will be used
  // else the defaul value will be used
  static contextType = UserContext;
  render() {
    return (
      <div>
        {/* <h1>Hello {this.context}</h1> */}
        <h1>
          Hello {this.context[0]} the {this.context[1]}
        </h1>
      </div>
    );
  }
}

// ComponentD.contextType = UserContext;

export default ComponentD;
