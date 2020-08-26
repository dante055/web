import React, { Component } from 'react';

class Messsage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Welcome visitor!!',
    };
    this.changeMessage = this.changeMessage.bind(this);
    console.log(this.props); // will be uindefined wnless we pass props in the super
    console.log(props); // will be undefined unless we pass it in constructor as argument, ie construtor(props)

    // outside the counstructor this.props will work fine even if we dont pass it in the constructor
  }

  // changeMessage = this.changeMessage.bind(this); // if you dont want to bind it inside the constructor

  changeMessage1 = () => {
    this.setState({
      message: 'You have unsubsribe!!',
    });
  };
  changeMessage() {
    this.setState({
      message: 'You have unsubsribe!!',
    });
  }

  render() {
    console.log(this.props);
    const { test, name } = { ...this.props }; // we can even limit the no of keys we want to limit
    console.log(test, name);
    return (
      <div>
        <h1>{this.state.message}</h1>
        <button
          type="button"
          onClick={() => this.setState({ message: 'Thanks for subscribing!!' })}
        >
          Subscribe
        </button>
        <br />
        <br />
        {/* wont work as we havent bind the this function yet */}
        <button type="button" onClick={this.changeMessage}>
          {/* solutions */}
          {/* bind in the constructor */}
          {/* <button type="button" onClick={this.changeMessage1}> */}
          {/* <button type="button" onClick={this.changeMessage.bind(this)}> */}
          {/* <button type="button" onClick={() => this.changeMessage()}>  */}
          Unsubscribe
        </button>
      </div>
    );
  }
}

export default Messsage;
