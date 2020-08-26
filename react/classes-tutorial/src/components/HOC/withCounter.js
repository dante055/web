import React, { Component } from 'react';

const withCounter = (WrappedCmponent, increment) => {
  class WithCounter extends Component {
    constructor(props) {
      super(props);

      this.state = {
        count: 0,
      };
    }

    incrementCounter = () => {
      //   this.setState((prevState) => {
      //     return { count: prevState.count + increment };
      //   });
      this.setState((prevState) => ({
        count: prevState.count + increment,
      }));
      //   this.setState((prevState) => ({
      //     count: prevState.count + this.props.inc,
      //   }));
    };

    render() {
      return (
        <div>
          <WrappedCmponent
            count={this.state.count}
            incrementCounter={this.incrementCounter}
            {...this.props}
          />
        </div>
      );
    }
  }
  return WithCounter;
};

export default withCounter;
