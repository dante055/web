import React, { Component } from 'react';
import ComponentC from './ComponentC';
import UserContext2 from './UserContext2';

class ComponentB extends Component {
  render() {
    return (
      <UserContext2.Consumer>
        {(val) => (
          <React.Fragment>
            <h1>
              hello {val[0].name} the {val[0].title}
            </h1>
            <ComponentC />
          </React.Fragment>
        )}
      </UserContext2.Consumer>
    );
  }
}

export default ComponentB;
