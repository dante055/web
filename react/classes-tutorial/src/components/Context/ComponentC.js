import React, { Component } from 'react';
import { UserConsumer } from './userContext';
import ComponentD from './ComponentD';

class ComponentC extends Component {
  render() {
    return (
      //   <UserConsumer>{(userName) => <h1>Hello {userName}</h1>}</UserConsumer>
      <React.Fragment>
        <UserConsumer>
          {(arr) => (
            <h1>
              Hello {arr[0]} the {arr[1]}
            </h1>
          )}
        </UserConsumer>
        <ComponentD />
      </React.Fragment>
    );
    // return (
    //   <div>
    //     <h1>Component C</h1>
    //     <UserConsumer>{(userName) => <h1>Hello {userName}</h1>}</UserConsumer>
    //   </div>
    // );
  }
}

export default ComponentC;
