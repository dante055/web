import React, { Component } from 'react';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.incrementByFive = this.incrementByFive.bind(this);
    this.incrementCounterBasedOnPrevState = this.incrementCounterBasedOnPrevState.bind(
      this
    );
  }
  /* async incrementCounter() {
    // this.setState({ count: this.state.count++ }); // this wont work
    await this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  } */
  /* incrementCounter() {
    this.setState({ count: this.state.count + 1 }, () => {
      console.log('Calback value: ', this.state.count);
    });
    console.log(this.state.count);
  } */
  /* incrementNotByFive() {
    this.incrementCounter();
    this.incrementCounter();
    this.incrementCounter();
    this.incrementCounter();
    this.incrementCounter();

    // will only increment by 1 as react group multiple setState call into a single update call for better performance
    // so all the 5 calls will be done in a single go and the update value is not carried forward
  } */

  incrementCounterBasedOnPrevState() {
    this.setState((prevState, props) => ({
      count: prevState.count + 1,
    }));
    // this.setState((prevState) => {
    //   console.log(prevState, this.state.count);
    //   return { count: prevState.count + 1 };
    // });
    // console.log(this.state.count);
  }

  incrementByFive() {
    this.incrementCounterBasedOnPrevState();
    this.incrementCounterBasedOnPrevState();
    this.incrementCounterBasedOnPrevState();
    this.incrementCounterBasedOnPrevState();
    this.incrementCounterBasedOnPrevState();
  }

  render() {
    return (
      <div>
        <h1>Count - {this.state.count}</h1>
        {/* <button onClick={() => this.incrementCounter()}>Increment</button> */}
        {/* <button onClick={() => this.incrementNotByFive()}>Increment</button> */}
        <button onClick={this.incrementByFive}>Increment</button>
      </div>
    );
  }
}

export default Counter;
